import { sleep } from "@/libraries/sleep";
import type { TElement } from "@/types/element";

/**
 * reactマウント用の親要素を取得する
 * @param count {number} リトライ回数
 */
export const getElements = async (count = 0): Promise<TElement> => {
  const videoElement = getVideoElement();
  const commentCommandInput = getCommentCommandInput();
  const commentInputTextarea = getCommentInputTextarea();
  const commentCanvas = getCommentCanvas();
  const HeaderElement = getHeaderElement();
  const MainElement = getMainElement();
  const FooterElement = getFooterElement();
  const MemoElement = getMemoElement();
  let BackgroundImageElement = getBackgroundImageElement();
  let LayerElement = getLayerElement();
  if (
    !BackgroundImageElement ||
    !document.body.contains(BackgroundImageElement)
  ) {
    const videoContentContainer = getVideoContentContainer();
    BackgroundImageElement ??= createBackgroundImageElement();
    videoContentContainer?.appendChild(BackgroundImageElement);
  }
  if (
    !(
      videoElement &&
      commentCommandInput &&
      commentCanvas &&
      BackgroundImageElement &&
      commentInputTextarea
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
    const videoCommentContainer = getVideoCommentContainer();
    LayerElement ??= createLayerElement();
    videoCommentContainer?.appendChild(LayerElement);
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

export const getBaseElements = async () => {
  let count = 0;
  while (count < 300) {
    const mainContainer = getMainContainer();
    const commentViewerContainer = getCommentViewerContainer();
    const videoContentContainer = getVideoContentContainer();
    const videoCommentContainer = getVideoCommentContainer();
    const videoElement = getVideoElement();
    const videoContainer = getVideoContainer();
    count++;
    if (
      !(
        mainContainer &&
        commentViewerContainer &&
        videoContentContainer &&
        videoCommentContainer &&
        videoElement &&
        videoContainer
      )
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
      videoContainer,
    };
  }
  throw new Error("fail to get required element");
};

export const getMainContainer = (): HTMLDivElement | null => {
  return (
    document.querySelector("div.grid-area_\\[player\\]") || //通常画面
    document.querySelector("div.grid-area_player") //投コメ編集画面
  );
};

export const getVideoElement = (): HTMLVideoElement | null => {
  return document.querySelector("div[data-name=content] > video");
};

export const getCommentViewerContainer = (): HTMLElement | null => {
  return (
    document.querySelector(
      // 通常画面
      "div.grid-area_\\[sidebar\\] > div > div > section", // コメント増量と衝突するのでsectionまで指定
    )?.parentElement ||
    document.querySelector("div.grid-area_sidebar > section") // 投コメ編集画面
  );
};

export const getVideoContainer = (): HTMLDivElement | null => {
  return document.querySelector("div[data-name=stage]");
};

export const getVideoContentContainer = (): HTMLDivElement | null => {
  return document.querySelector("div[data-name=content]");
};

export const getVideoCommentContainer = (): HTMLDivElement | null => {
  return document.querySelector("div[data-name=comment]");
};

export const getCommentCommandInput = (): HTMLInputElement | null => {
  return document.querySelector(
    "input[placeholder='コマンド'][tabindex='-1']", // 投コメ対応のためtabindexを指定
  );
};

export const getCommentInputTextarea = (): HTMLTextAreaElement | null => {
  return (
    document.querySelector("textarea[placeholder='コメントを入力']") || // 通常画面
    document.querySelector("textarea[placeholder='投稿者コメントを入力']") // 投コメ編集画面
  );
};

export const getCommentCanvas = (): HTMLCanvasElement | null => {
  return document.querySelector("div[data-name=comment] > canvas");
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
