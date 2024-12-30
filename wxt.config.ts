import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  publicDir: "../public",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "段スク水",
    description: "Modified By @Negima1072, @eneko0513 and @xpadev-net",
  },
  vite: () => ({
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  }),
});
