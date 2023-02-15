import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

import { resolve } from "path";

// import * as process from "process";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

console.log(pathResolve("src"));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: pathResolve("src"),
      },
    ],
  },
  server: {
    host: "localhost",
    port: 8000,
  },
});
