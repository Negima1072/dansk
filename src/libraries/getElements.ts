import sleep from "@/libraries/sleep";
import { contextTypeNullable } from "@/@types/types";

const getElements = async (): Promise<contextTypeNullable> => {
  const videoElement = (
      document.getElementById("MainVideoPlayer") as HTMLDivElement
    )?.getElementsByTagName("video")[0] as HTMLVideoElement,
    seekToHeadButton = document.getElementsByClassName(
      "SeekToHeadButton"
    )[0] as HTMLButtonElement,
    commentOnOffButton = document.getElementsByClassName(
      "CommentOnOffButton"
    )[0] as HTMLButtonElement,
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
    ) as HTMLDivElement;
  if (!(videoElement && seekToHeadButton && commentCommandInput)) {
    await sleep(100);
    return await getElements();
  }
  return {
    videoElement: videoElement,
    seekToHeadButton: seekToHeadButton,
    commentOnOffButton: commentOnOffButton,
    commentCommandInput: commentCommandInput,
    commentInputTextarea: commentInputTextarea,
    HeaderElement: HeaderElement,
    MainElement: MainElement,
    FooterElement: FooterElement,
  };
};
export default getElements;
