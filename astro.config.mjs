// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [tailwindcss()],
  },
});