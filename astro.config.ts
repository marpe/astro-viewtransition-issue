import db from "@astrojs/db";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  // base: new URL("./", import.meta.url).pathname,
  integrations: [
    db(),
  ],
  db: {},
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
