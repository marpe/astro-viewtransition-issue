import { defineConfig, getViteConfig } from "astro/config";
import { resolve } from "node:path";
import { writeVirtualMod } from "./src/test/db-write-mod.ts";

const virtualModFilename = resolve("./virtualMod.js");
const root = new URL(".", `file:///${import.meta.dirname}/`);
await writeVirtualMod(virtualModFilename, root);

export default defineConfig({
  test: {
    env: {
      ASTRO_DATABASE_FILE: new URL("test.db", `file:///${import.meta.dirname}/`).href,
    },
    alias: {
      "astro:db": virtualModFilename,
    },
  }
})