import type { TLayer, TLayerTemplate } from "@/@types/layer";
import type {
  TAutoSave,
  TCommentFont,
  TCommentPos,
  TContextType,
  TLocalStorageKeys,
  TMonoChar,
  TOwnerComment,
  TProChar,
} from "@/@types/types";

/**
 * typeGuard
 * TSで型を安全に確定させるための関数
 * これはbool関数としてビルド後も残る
 */
const typeGuard = {
  owner: {
    comment: (i: unknown): i is TOwnerComment =>
      typeVerify(i, ["time", "command", "comment"]),
    comments: (i: unknown): i is TOwnerComment[] => {
      if (!Array.isArray(i)) return false;
      for (const item of i) {
        if (!typeGuard.owner.comment(item)) return false;
      }
      return true;
    },
  },
  context: {
    props: (i: unknown): i is TContextType =>
      !!(
        i !== null &&
        typeGuard.context.videoElement((i as TContextType).videoElement) &&
        typeGuard.context.commentCommandInput(
          (i as TContextType).commentCommandInput,
        )
      ),
    videoElement: (i: unknown): i is HTMLVideoElement =>
      typeof i === "object" &&
      i !== null &&
      (i as HTMLVideoElement).nodeName === "VIDEO",
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
    template: (i: unknown): i is TLayerTemplate =>
      typeVerify(i, [
        "id",
        "commands",
        "pos",
        "posList",
        "text",
        "value",
        "width",
        "height",
        "critical",
        "top",
        "left",
        "scale",
        "size",
      ]),
    commentPos: (i: unknown): i is TCommentPos =>
      typeof i === "string" && !!i.match(/^ue|naka|shita$/),
    commentFont: (i: unknown): i is TCommentFont =>
      typeof i === "string" && !!i.match(/^mincho|gothic$/),
  },
  layer: {
    isMonoChar: (i: unknown): i is TMonoChar =>
      typeVerify(i, ["width", "isSpace"]) &&
      typeof (i as TMonoChar | TProChar).width === "number",
    isProChar: (i: unknown): i is TProChar =>
      typeVerify(i, ["width", "isSpace"]) &&
      typeVerify((i as TMonoChar | TProChar).width, ["mincho", "gothic"]),
    isLayers: (i: unknown): i is TLayer[] => {
      if (!Array.isArray(i)) return false;
      for (const item of i) {
        if (!typeGuard.layer.isLayer(item)) return false;
      }
      return true;
    },
    isLayer: (i: unknown): i is TLayer =>
      typeVerify(i, [
        "id",
        "commands",
        "pos",
        "posList",
        "text",
        "value",
        "areaWidth",
        "width",
        "height",
        "critical",
        "top",
        "left",
        "scale",
        "size",
      ]),
  },
  dom: {
    isDivElement: (i: unknown): i is HTMLDivElement =>
      i instanceof Element && i.nodeName === "DIV",
  },
  localStorage: {
    isKey: (i: unknown): i is TLocalStorageKeys =>
      typeof i === "string" &&
      !!i.match(
        /options_(?:commandOrder|useCA|usePat|useOriginal|useOriginal_text|timespan_main|timespan_owner|useMs|lineMode)|memo|ppConvert(?:Before|BeforeType|After|AfterType)|display_(?:trace|memo|time|main|box)/,
      ),
    isAutoSave: (i: unknown): i is TAutoSave[] => {
      if (!Array.isArray(i)) return false;
      for (const item of i) {
        if (
          !typeVerify(item, ["data", "timestamp"]) ||
          !typeGuard.layer.isLayers((item as TAutoSave)?.data)
        )
          return false;
      }
      return true;
    },
  },
};
const typeVerify = (item: unknown, keys: string[]): boolean => {
  if (typeof item !== "object" || item === null) return false;
  for (const key of keys) {
    if ((item as { [key: string]: string })[key] === undefined) return false;
  }
  return true;
};
export { typeGuard };
