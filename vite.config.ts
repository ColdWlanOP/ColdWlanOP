import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { normalizePath } from "vite";
import { fileURLToPath } from "node:url";


function fromRoot(relativePath: string) {
  return normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: "development",
  base: "/ColdWlanOP/",
  plugins: [
    vue(),
    Components({
      dts: "./src/unimport-com.d.ts",
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
    AutoImport({
      dts: "./src/unimport-api.d.ts",
      imports: [
        "vue-router",
        "vue",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@assets": fromRoot("./src/assets"),
      "@global": fromRoot("./src/global"),
      "@util": fromRoot("./src/util"),
      "@com": fromRoot("./src/components"),
    },
  },
  test: {
        globals: true,
        include: ["./__test__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        environment: "happy-dom",
      },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@global/inject.scss";`,
      },
    },
  }
});
