import { UserManifest, defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  publicDir: "../public",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: (env) => {
    const manifest: UserManifest = {
      name: "段スク水",
      description: "ニコニコ動画のコメントアート制作を補助するブラウザ拡張機能",
    };
    if (env.browser === "firefox") {
      manifest.browser_specific_settings = {
        gecko: {
          id: "{781bb7bf-090f-df5d-4976-67b3b958c4fe}",
        },
      };
    }
    return manifest;
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
