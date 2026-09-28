import { httpServerHandler } from "cloudflare:node";

let handler;

export default {
  async fetch(request, env, ctx) {
    if (!handler) {
      process.env.DATABASE_URL = env.HYPERDRIVE.connectionString;

      const { default: app } = await import("./app.js");

      app.listen(3000);

      handler = httpServerHandler({
        port: 3000,
      });
    }

    return handler.fetch(request, env, ctx);
  },
};