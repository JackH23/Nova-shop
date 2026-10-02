import { httpServerHandler } from "cloudflare:node";

import runtime from "./src/config/runtime.js";

const port = 5000;
let handlerPromise;

async function createHandler(env) {
  runtime.setWorkerEnv(env);

  if (!env.HYPERDRIVE?.connectionString) {
    throw new Error("HYPERDRIVE binding is required");
  }

  process.env.DATABASE_URL = env.HYPERDRIVE.connectionString;

  const { default: app } = await import("./src/app.js");
  app.listen(port);

  return httpServerHandler({ port });
}

export default {
  async fetch(request, env, ctx) {
    // Profile images are public assets; keep the R2 bucket itself private.
    const url = new URL(request.url);
    const image = /^\/uploads\/profiles\/([a-zA-Z0-9-]+\.(?:jpg|png|webp))$/.exec(url.pathname);
    if (image && (request.method === "GET" || request.method === "HEAD")) {
      if (!env.UPLOADS) return new Response("Storage unavailable", { status: 503 });
      const object = await env.UPLOADS.get("profiles/" + image[1]);
      if (!object) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("ETag", object.httpEtag);
      headers.set("Cache-Control", "public, max-age=86400");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(request.method === "HEAD" ? null : object.body, { headers });
    }
    handlerPromise ??= createHandler(env);
    const handler = await handlerPromise;
    return handler.fetch(request, env, ctx);
  },
};
