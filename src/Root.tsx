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
  createLayerElement,
  getElements,
} from "@/libraries/getElements";
//import { Storage } from "@/libraries/localStorage";
import { sleep } from "@/libraries/sleep";

/**
 * Reactのルート要素
 * @constructor
 */
const Root: FC = () => {
  const [elements, setElements] = useAtom(elementAtom);
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      console.log("init");
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
      console.log("reinit");
      setElements(await getElements());
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
  let mainContainer,
    commentViewerContainer,
    videoContentContainer,
    videoCommentContiner,
    videoElement: HTMLVideoElement | undefined,
    count = 0;
  while (count < 300) {
    mainContainer = document.querySelectorAll(
      "div.grid-area_\\[player\\]",
    )[0] as HTMLDivElement;
    commentViewerContainer = document.querySelectorAll(
      "div.grid-area_\\[sidebar\\] > div > div",
    )[0] as HTMLDivElement;
    videoContentContainer = document.querySelectorAll(
      "div[data-name=content]",
    )[0] as HTMLDivElement;
    videoCommentContiner = document.querySelectorAll(
      "div[data-name=comment]",
    )[0] as HTMLDivElement;
    videoElement = document.querySelectorAll(
      "div[data-name=content] > video",
    )[0] as HTMLVideoElement;
    count++;
    if (
      mainContainer === undefined ||
      commentViewerContainer === undefined ||
      videoContentContainer === undefined ||
      videoCommentContiner === undefined ||
      videoElement === undefined
    ) {
      await sleep(100);
    } else {
      break;
    }
  }
  if (
    mainContainer === undefined ||
    commentViewerContainer === undefined ||
    videoContentContainer === undefined ||
    videoCommentContiner === undefined ||
    videoElement === undefined
  ) {
    throw new Error("fail to get required element");
  }
  const reactFiberProp = Object.keys(mainContainer).find((k) =>
    k.startsWith("__reactFiber"),
  ) as keyof HTMLDivElement;
  const playerOperation = (
    mainContainer[reactFiberProp] as unknown as ReactFiber
  )?.child?.child?.memoizedProps?.playerOperation as PlayerOperation;
  // for tmp make nvapi
  window.__videoplayer = {
    autoplay: () => videoElement.autoplay,
    buffered: () => videoElement.buffered,
    canPlayType: () => videoElement.canPlayType(""),
    clear: () => {},
    crossOrigin: (crossOrigin) => {
      if (crossOrigin) {
        videoElement.crossOrigin = crossOrigin;
      }
      return videoElement.crossOrigin as crossOriginType;
    },
    currentSrc: () => videoElement.currentSrc,
    currentTime: (currentTime) => {
      if (currentTime) {
        playerOperation.currentTime.set(currentTime);
      }
      return playerOperation.currentTime.get();
    },
    defaultPlaybackRate: () => videoElement.defaultPlaybackRate,
    duration: () => playerOperation.duration,
    element: () => videoElement,
    enableCurrentTimeSmoothing: false,
    ended: () => videoElement.ended,
    load: () => videoElement.load(),
    mirror: () => false,
    muted: (isMuted) => {
      if (isMuted !== undefined) {
        playerOperation.mute.set(isMuted);
      }
      return playerOperation.mute.isMuted;
    },
    originalCurrentTime: () => videoElement.currentTime,
    pause: () => playerOperation.playback.pause(),
    paused: () => !playerOperation.playback.isPlaying,
    play: () => playerOperation.playback.play(),
    playbackRate: (rate) => {
      if (rate) {
        videoElement.playbackRate = rate;
      }
      return videoElement.playbackRate;
    },
    playbackStalled: () => false,
    seeking: () => playerOperation.seek.isSeeking,
    src: () => videoElement.src,
    volume: (volume) => {
      if (volume) {
        playerOperation.volume.set(volume);
      }
      return playerOperation.volume.get();
    },
  };
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
  const videoContainer = document.querySelectorAll(
    "div[data-name=stage]",
  )[0] as HTMLDivElement;
  videoContainer.addEventListener(
    "scroll",
    (e) => {
      (e.target as HTMLDivElement).scroll(0, 0);
    },
    { passive: false },
  );
  const HeaderElement = document.createElement("div");
  mainContainer.before(HeaderElement);
  const FooterElement = document.createElement("div");
  mainContainer.after(FooterElement);
  const BackgroundImageElement = createBackgroundImageElement();
  videoContentContainer.appendChild(BackgroundImageElement);
  const LayerElement = createLayerElement();
  videoCommentContiner.appendChild(LayerElement);
  const MemoElement = document.createElement("div");
  commentViewerContainer.before(MemoElement);
  const MainElement = document.createElement("div");
  commentViewerContainer.before(MainElement);
  HeaderElement.id = "dansk:HeaderElement";
  MainElement.id = "dansk:MainElement";
  FooterElement.id = "dansk:FooterElement";
  MemoElement.id = "dansk:MemoElement";
  const ReactRootElement = document.createElement("div");
  document.body.append(ReactRootElement);
  const ReactRoot = createRoot(ReactRootElement);
  ReactRoot.render(<Root />);
  inject();
};
void init();
