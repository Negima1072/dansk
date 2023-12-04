import { Storage } from "@/libraries/localStorage";
import { commentPublishData } from "@/@types/types";

const injectFetch = () => {
  const originalFetch = window.fetch;
  window.fetch = (
    input: URL | RequestInfo,
    init?: RequestInit | undefined,
  ): Promise<Response> => {
    try {
      const url = input instanceof Request ? input.url : input.toString();
      const urlPattern184 =
        /^https:\/\/nv-comment\.nicovideo\.jp\/v1\/threads\/\d+\/comments$/;
      if (
        urlPattern184.test(url) &&
        init?.method === "POST" &&
        typeof init.body === "string" &&
        Storage.get("options_disable184") === "true"
      ) {
        const body = JSON.parse(init.body) as commentPublishData;
        if (body.commands && Array.isArray(body.commands)) {
          if (body.commands.includes("184")) {
            body.commands = body.commands.filter(
              (command: string) => command !== "184",
            );
            init.body = JSON.stringify(body);
          }
        }
        return originalFetch(input, init);
      }
    } catch (error) {
      console.error(error);
    }
    return originalFetch(input, init);
  };
};

export { injectFetch };
