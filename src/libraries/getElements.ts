import { sleep } from "@/libraries/sleep";
import { TElement } from "@/@types/element";

/**
 * reactマウント用の親要素を取得する
 * @param count {number} リトライ回数
 */
const getElements = async (count = 0): Promise<TElement> => {
  const videoElement = (
      document.getElementById("MainVideoPlayer") as HTMLDivElement
    )?.getElementsByTagName("video")[0] as HTMLVideoElement,
    commentCommandInput = document.getElementsByClassName(
      "CommentCommandInput"
    )[0] as HTMLInputElement,
    commentInputTextarea = document.getElementsByClassName(
      "CommentInput-textarea"
    )[0] as HTMLTextAreaElement,
    videoSymbolContainerCanvas = document.getElementsByClassName(
      "VideoSymbolContainer-canvas"
    )[0] as HTMLCanvasElement,
    HeaderElement = document.getElementById(
      "dansk:HeaderElement"
    ) as HTMLDivElement,
    MainElement = document.getElementById(
      "dansk:MainElement"
    ) as HTMLDivElement,
    BackgroundImageElement = document.getElementById(
      "dansk:BackgroundImageElement"
    ) as HTMLDivElement,
    FooterElement = document.getElementById(
      "dansk:FooterElement"
    ) as HTMLDivElement,
    LayerElement = document.getElementById(
      "dansk:LayerElement"
    ) as HTMLDivElement,
    MemoElement = document.getElementById(
      "dansk:MemoElement"
    ) as HTMLDivElement;
  if (
    !(
      videoElement &&
      commentCommandInput &&
      videoSymbolContainerCanvas &&
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
  return {
    videoElement,
    commentCommandInput,
    commentInputTextarea,
    videoSymbolContainerCanvas,
    HeaderElement,
    MainElement,
    BackgroundImageElement,
    FooterElement,
    LayerElement,
    MemoElement,
  };
};
export { getElements };
