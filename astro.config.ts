import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vue from "@astrojs/vue";

export default defineConfig({
  // base: new URL("./", import.meta.url).pathname,
  integrations: [
    vue(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
