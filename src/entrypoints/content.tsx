import { Root } from "@/components/Root";
import { inject } from "@/libraries/cssInjector";
import { injectFetch } from "@/libraries/fetch";
import {
  createBackgroundImageElement,
  createFooterElement,
  createHeaderElement,
  createLayerElement,
  createMainElement,
  createMemoElement,
  getBaseElements,
  getVideoContainer,
} from "@/libraries/getElements";
import { initVideoPlayer } from "@/libraries/videoPlayerApi";
import { createRoot } from "react-dom/client";

export default defineContentScript({
  matches: ["https://www.nicovideo.jp/watch/*"],
  runAt: "document_start",
  world: "MAIN",
  main() {
    const init = async () => {
      const {
        mainContainer,
        commentViewerContainer,
        videoContentContainer,
        videoCommentContainer,
        videoElement,
      } = await getBaseElements();
      initVideoPlayer(mainContainer, videoElement);
      injectFetch();
      /*
      const postBtnElement = document.querySelector(
        ".CommentPostButton",
      ) as HTMLButtonElement;
      if (postBtnElement) {
        postBtnElement.style.backgroundColor =
          Storage.get("options_disable184") === "true" ? "#ff8300" : "#007cff";
      }
      */
      const videoContainer = getVideoContainer();
      videoContainer.addEventListener(
        "scroll",
        (e) => {
          (e.target as HTMLDivElement).scroll(0, 0);
        },
        { passive: false },
      );
      const HeaderElement = createHeaderElement();
      mainContainer.before(HeaderElement);

      const FooterElement = createFooterElement();
      mainContainer.after(FooterElement);

      const BackgroundImageElement = createBackgroundImageElement();
      videoContentContainer.appendChild(BackgroundImageElement);

      const LayerElement = createLayerElement();
      videoCommentContainer.appendChild(LayerElement);

      const MemoElement = createMemoElement();
      commentViewerContainer.before(MemoElement);

      const MainElement = createMainElement();
      commentViewerContainer.before(MainElement);

      const ReactRootElement = document.createElement("div");
      document.body.append(ReactRootElement);
      const ReactRoot = createRoot(ReactRootElement);
      ReactRoot.render(<Root />);
      inject();
    };
    void init();
  },
});
