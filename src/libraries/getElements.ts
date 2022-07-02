import sleep from "@/libraries/sleep";
import { contextType } from "@/@types/types";

const getElements = async (): Promise<contextType> => {
  const videoElement = (
      document.getElementById("MainVideoPlayer") as HTMLDivElement
    ).getElementsByTagName("video")[0] as HTMLVideoElement,
    seekToHeadButton = document.getElementsByClassName(
      "SeekToHeadButton"
    )[0] as HTMLButtonElement,
    commentOnOffButton = document.getElementsByClassName(
      "CommentOnOffButton"
    )[0] as HTMLButtonElement,
    commentCommandInput = document.getElementsByClassName(
      "CommentCommandInput"
    )[0] as HTMLInputElement;
  if (!(videoElement && seekToHeadButton && commentCommandInput)) {
    await sleep(100);
    return await getElements();
  }
  return {
    videoElement: videoElement,
    seekToHeadButton: seekToHeadButton,
    commentOnOffButton: commentOnOffButton,
    commentCommandInput: commentCommandInput,
  };
};
export default getElements;
