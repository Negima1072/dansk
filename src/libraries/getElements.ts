import sleep from "@/libraries/sleep";
import { contextTypeNullable } from "@/@types/types";

const getElements = async (count = 0): Promise<contextTypeNullable> => {
  const videoElement = (
      document.getElementById("MainVideoPlayer") as HTMLDivElement
    )?.getElementsByTagName("video")[0] as HTMLVideoElement,
    commentCommandInput = document.getElementsByClassName(
      "CommentCommandInput"
    )[0] as HTMLInputElement,
    commentInputTextarea = document.getElementsByClassName(
      "CommentInput-textarea"
    )[0] as HTMLTextAreaElement,
    HeaderElement = document.getElementById(
      "dansk:HeaderElement"
    ) as HTMLDivElement,
    MainElement = document.getElementById(
      "dansk:MainElement"
    ) as HTMLDivElement,
    FooterElement = document.getElementById(
      "dansk:FooterElement"
    ) as HTMLDivElement,
    LayerElement = document.getElementById(
      "dansk:LayerElement"
    ) as HTMLDivElement;
  if (!(videoElement && commentCommandInput)) {
    if (count > 30) {
      throw new Error("fail to get mount point");
    }
    await sleep(100);
    return await getElements(count + 1);
  }
  return {
    videoElement,
    commentCommandInput,
    commentInputTextarea,
    HeaderElement,
    MainElement,
    FooterElement,
    LayerElement,
  };
};
export default getElements;
