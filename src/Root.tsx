import { useAtom } from "jotai";
import type { FC } from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import { elementAtom } from "@/atoms";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { MemoPortal } from "@/components/MemoPortal";
import { injectFetch } from "@/fetch";
import { useLocation } from "@/hooks/useLocation";
import { inject } from "@/libraries/cssInjector";
import {
  createBackgroundImageElement,
  createFooterElement,
  createHeaderElement,
  createLayerElement,
  createMainElement,
  createMemoElement,
  getBaseElements,
  getElements,
  getMainContainer,
  getVideoContainer,
  getVideoElement,
} from "@/libraries/getElements";
//import { Storage } from "@/libraries/localStorage";
import { initVideoPlayer } from "@/libraries/videoPlayerApi";

/**
 * Reactのルート要素
 * @constructor
 */
const Root: FC = () => {
  const [elements, setElements] = useAtom(elementAtom);
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      if (!elements) {
        setElements(await getElements());
        return;
      }
      await new Promise<void>((resolve) => {
        const check = () => {
          console.log(
            document.body.contains(elements.LayerElement),
            document.getElementById("dansk:LayerElement"),
          );
          if (!document.body.contains(elements.LayerElement)) {
            resolve();
            return;
          }
          setTimeout(check, 1000);
        };
        check();
      });
      setElements(await getElements());
      initVideoPlayer(getMainContainer(), getVideoElement());
    };
    void init();
  }, [location]);
  return (
    <>
      <Header />
      <Main />
      <MemoPortal />
      <Footer />
    </>
  );
};

/**
 * 初期化関数
 * ニコ動の各要素が生えたら、だんすくの初期化をする
 */
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
