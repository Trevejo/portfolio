import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://trevejo.github.io",
  base: "/portfolio",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
