import {
  contextType,
  layerTemplate,
  messageColorClickEvent,
  messageTimeSeekEvent,
  messageTimeSeekIntEvent,
  messageTimeSeekPlEvent,
  ownerComment,
} from "@/@types/types";

const typeGuard = {
  owner: {
    comment: (i: unknown): i is ownerComment =>
      typeVerify(i, ["time", "command", "comment"]),
    comments: (i: unknown): i is ownerComment[] => {
      if (!Array.isArray(i)) return false;
      for (const item of i) {
        if (!typeGuard.owner.comment(item)) return false;
      }
      return true;
    },
  },
  messageEvent: {
    colorClick: (i: unknown): i is messageColorClickEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageColorClickEvent).type === "color_click",
    timeSeek: (i: unknown): i is messageTimeSeekEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekEvent).type === "time_seek",
    timeSeekInt: (i: unknown): i is messageTimeSeekIntEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekIntEvent).type === "time_seek_int",
    timeSeekPl: (i: unknown): i is messageTimeSeekPlEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekPlEvent).type === "time_seek_pl",
  },
  context: {
    props: (i: unknown): i is contextType =>
      !!(
        i !== null &&
        typeGuard.context.videoElement((i as contextType).videoElement) &&
        typeGuard.context.seekToHeadButton(
          (i as contextType).seekToHeadButton
        ) &&
        typeGuard.context.commentCommandInput(
          (i as contextType).commentCommandInput
        )
      ),
    videoElement: (i: unknown): i is HTMLVideoElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLVideoElement).nodeName === "VIDEO",
    seekToHeadButton: (i: unknown): i is HTMLButtonElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLVideoElement).nodeName === "BUTTON" &&
      (i as HTMLVideoElement).classList.contains("ActionButton") &&
      (i as HTMLVideoElement).classList.contains("ControllerButton") &&
      (i as HTMLVideoElement).classList.contains("SeekToHeadButton"),
    commentOnOffButton: (i: unknown): i is HTMLButtonElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLVideoElement).nodeName === "BUTTON" &&
      (i as HTMLVideoElement).classList.contains("ActionButton") &&
      (i as HTMLVideoElement).classList.contains("ControllerButton") &&
      (i as HTMLVideoElement).classList.contains("CommentOnOffButton"),
    commentCommandInput: (i: unknown): i is HTMLInputElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLVideoElement).nodeName === "INPUT" &&
      (i as HTMLVideoElement).classList.contains("CommentCommandInput"),
    commentInputTextarea: (i: unknown): i is HTMLTextAreaElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLTextAreaElement).nodeName === "TEXTAREA" &&
      (i as HTMLTextAreaElement).classList.contains("CommentInput-textarea"),
  },
  trace: {
    template: (i: unknown): i is layerTemplate =>
      typeVerify(i, [
        "id",
        "commands",
        "pos",
        "text",
        "value",
        "width",
        "height",
        "critical",
        "nakaOnly",
      ]),
  },
};
const typeVerify = (item: unknown, keys: string[]): boolean => {
  if (typeof item !== "object" || item === null) return false;
  for (const key of keys) {
    if ((item as { [key: string]: string })[key] === undefined) return false;
  }
  return true;
};
export default typeGuard;
