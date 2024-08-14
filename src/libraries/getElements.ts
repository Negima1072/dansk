import type { TElement } from "@/@types/element";
import { sleep } from "@/libraries/sleep";

/**
 * reactマウント用の親要素を取得する
 * @param count {number} リトライ回数
 */
const getElements = async (count = 0): Promise<TElement> => {
  const videoElement = getVideoElement(),
    commentCommandInput = getCommentCommandInput(),
    commentInputTextarea = getCommentInputTextarea(),
    commentCanvas = getCommentCanvas(),
    HeaderElement = getHeaderElement(),
    MainElement = getMainElement(),
    FooterElement = getFooterElement(),
    MemoElement = getMemoElement();
  let BackgroundImageElement = getBackgroundImageElement();
  let LayerElement = getLayerElement();
  if (
    !BackgroundImageElement ||
    !document.body.contains(BackgroundImageElement)
  ) {
    const videoContentContainer = getVideoContentContainer();
    BackgroundImageElement ??= createBackgroundImageElement();
    videoContentContainer.appendChild(BackgroundImageElement);
  }
  if (
    !(
      videoElement &&
      commentCommandInput &&
      commentCanvas &&
      BackgroundImageElement
    )
  ) {
    //1分超えたらfail
    if (count > 120) {
      throw new Error("fail to get mount point");
    }
    await sleep(500);
    return await getElements(count + 1);
  }
  if (!LayerElement || !document.body.contains(LayerElement)) {
    const videoCommentContiner = getVideoCommentContainer();
    LayerElement ??= createLayerElement();
    videoCommentContiner.appendChild(LayerElement);
  }
  return {
    videoElement,
    commentCommandInput,
    commentInputTextarea,
    commentCanvas,
    HeaderElement,
    MainElement,
    BackgroundImageElement,
    FooterElement,
    LayerElement,
    MemoElement,
  };
};
export { getElements };

export const getBaseElements = async () => {
  let count = 0;
  while (count < 300) {
    const mainContainer = getMainContainer();
    const commentViewerContainer = getCommentViewerContainer();
    const videoContentContainer = getVideoContentContainer();
    const videoCommentContainer = getVideoCommentContainer();
    const videoElement = getVideoElement();
    count++;
    if (
      mainContainer === undefined ||
      commentViewerContainer === undefined ||
      videoContentContainer === undefined ||
      videoCommentContainer === undefined ||
      videoElement === undefined
    ) {
      await sleep(100);
      continue;
    }

    return {
      mainContainer,
      commentViewerContainer,
      videoContentContainer,
      videoCommentContainer,
      videoElement,
    };
  }
  throw new Error("fail to get required element");
};

export const getMainContainer = () => {
  return document.querySelectorAll(
    "div.grid-area_\\[player\\]",
  )[0] as HTMLDivElement;
};

export const getVideoElement = () => {
  return document.querySelectorAll(
    "div[data-name=content] > video",
  )[0] as HTMLVideoElement;
};

export const getCommentViewerContainer = () => {
  return document.querySelectorAll(
    "div.grid-area_\\[sidebar\\] > div > div",
  )[0] as HTMLDivElement;
};

export const getVideoContainer = () => {
  return document.querySelectorAll("div[data-name=stage]")[0] as HTMLDivElement;
};

export const getVideoContentContainer = () => {
  return document.querySelectorAll(
    "div[data-name=content]",
  )[0] as HTMLDivElement;
};

export const getVideoCommentContainer = () => {
  return document.querySelectorAll(
    "div[data-name=comment]",
  )[0] as HTMLDivElement;
};

export const getCommentCommandInput = () => {
  return document.querySelectorAll(
    "input[placeholder='コマンド']",
  )[0] as HTMLInputElement;
};

export const getCommentInputTextarea = () => {
  return document.querySelectorAll(
    "textarea[placeholder='コメントを入力']",
  )[0] as HTMLTextAreaElement;
};

export const getCommentCanvas = () => {
  return document.querySelectorAll(
    "div[data-name=comment] > canvas",
  )[0] as HTMLCanvasElement;
};

export const getHeaderElement = () => {
  return document.getElementById("dansk:HeaderElement") as HTMLDivElement;
};

export const getMainElement = () => {
  return document.getElementById("dansk:MainElement") as HTMLDivElement;
};

export const getFooterElement = () => {
  return document.getElementById("dansk:FooterElement") as HTMLDivElement;
};

export const getMemoElement = () => {
  return document.getElementById("dansk:MemoElement") as HTMLDivElement;
};

export const getBackgroundImageElement = () => {
  return document.getElementById(
    "dansk:BackgroundImageElement",
  ) as HTMLDivElement;
};

export const getLayerElement = () => {
  return document.getElementById("dansk:LayerElement") as HTMLDivElement;
};

export const createLayerElement = () => {
  const LayerElement = document.createElement("div");
  LayerElement.id = "dansk:LayerElement";
  LayerElement.onclick = (e) => e.stopImmediatePropagation();
  LayerElement.oncontextmenu = (e) => e.stopImmediatePropagation();
  return LayerElement;
};

export const createBackgroundImageElement = () => {
  const BackgroundImageElement = document.createElement("div");
  BackgroundImageElement.id = "dansk:BackgroundImageElement";
  return BackgroundImageElement;
};

export const createHeaderElement = () => {
  const HeaderElement = document.createElement("div");
  HeaderElement.id = "dansk:HeaderElement";
  return HeaderElement;
};

export const createFooterElement = () => {
  const FooterElement = document.createElement("div");
  FooterElement.id = "dansk:FooterElement";
  return FooterElement;
};

export const createMemoElement = () => {
  const MemoElement = document.createElement("div");
  MemoElement.id = "dansk:MemoElement";
  return MemoElement;
};

export const createMainElement = () => {
  const MainElement = document.createElement("div");
  MainElement.id = "dansk:MainElement";
  return MainElement;
};
