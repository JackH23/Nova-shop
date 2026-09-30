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
    handlerPromise ??= createHandler(env);
    const handler = await handlerPromise;
    return handler.fetch(request, env, ctx);
  },
};
