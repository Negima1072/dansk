import type { TElement } from "@/@types/element";
import { sleep } from "@/libraries/sleep";

/**
 * reactマウント用の親要素を取得する
 * @param count {number} リトライ回数
 */
const getElements = async (count = 0): Promise<TElement> => {
  const videoElement = document.querySelectorAll(
      "div[data-name=content] > video",
    )[0] as HTMLVideoElement,
    commentCommandInput = document.querySelectorAll(
      "input[placeholder='コマンド']",
    )[0] as HTMLInputElement,
    commentInputTextarea = document.querySelectorAll(
      "textarea[placeholder='コメントを入力']",
    )[0] as HTMLTextAreaElement,
    commentCanvas = document.querySelectorAll(
      "div[data-name=comment] > canvas",
    )[0] as HTMLCanvasElement,
    HeaderElement = document.getElementById(
      "dansk:HeaderElement",
    ) as HTMLDivElement,
    MainElement = document.getElementById(
      "dansk:MainElement",
    ) as HTMLDivElement,
    FooterElement = document.getElementById(
      "dansk:FooterElement",
    ) as HTMLDivElement,
    MemoElement = document.getElementById(
      "dansk:MemoElement",
    ) as HTMLDivElement;
  let BackgroundImageElement = document.getElementById(
    "dansk:BackgroundImageElement",
  ) as HTMLDivElement;
  let LayerElement = document.getElementById(
    "dansk:LayerElement",
  ) as HTMLDivElement;
  if (
    !BackgroundImageElement ||
    !document.body.contains(BackgroundImageElement)
  ) {
    const videoContentContainer = document.querySelectorAll(
      "div[data-name=content]",
    )[0] as HTMLDivElement;
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
    const videoCommentContiner = document.querySelectorAll(
      "div[data-name=comment]",
    )[0] as HTMLDivElement;
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
