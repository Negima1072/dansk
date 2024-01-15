import { TLayer, TLayerTemplate } from "@/@types/layer";

/** 投稿者コメント */
export type TOwnerComment = {
  /** 時間: mm:ss.ss */
  time: string;
  /** コマンド(スペース区切り) */
  command: string;
  /** コメントデータ */
  comment: string;
};

export type TConvertFormat = "domo" | "tokome" | "dansk";
export type TContextType = {
  videoElement: HTMLVideoElement;
  commentCommandInput: HTMLInputElement;
  commentInputTextarea: HTMLTextAreaElement;
  HeaderElement: HTMLDivElement;
  MainElement: HTMLDivElement;
  BackgroundImageElement: HTMLDivElement;
  FooterElement: HTMLDivElement;
  LayerElement: HTMLDivElement;
  MemoElement: HTMLDivElement;
  exportLayer: TLayer[];
  setExportLayer: (layer: TLayer[]) => void;
};

export type TCommentPos = "ue" | "naka" | "shita";
export type TCommentFont = "mincho" | "gothic";

type TCommand = {
  text: string;
  value: string;
  group: string;
};
export type TCommandList = TCommand[][][];

export type TMonoChar = {
  width: number;
  isSpace: boolean;
};
export type TProChar = {
  width: {
    mincho: number;
    gothic: number;
  };
  isSpace: boolean;
};
export type TCharList = {
  [key: string]: TMonoChar | TProChar;
  default: TMonoChar | TProChar;
};

export type TLayerTemplates = {
  [key: string]: TLayerTemplate;
};

export type TAutoSave = {
  timestamp: number;
  data: TLayer[];
};

export type TLocalStorageKeys =
  | "options_autoSave_span"
  | "options_autoSave_max"
  | "options_commandOrder"
  | "options_useCA"
  | "options_usePat"
  | "options_useOriginal"
  | "options_useOriginal_text"
  | "options_exportLayerName"
  | "options_timespan_main"
  | "options_timespan_owner"
  | "options_useMs"
  | "options_lineMode"
  | "options_exportHiddenLayer"
  | "options_showSelectedLayerOnTop"
  | "options_addDatetimeToFilename"
  | "options_disable184"
  | "options_enableColorCode"
  | "display_trace"
  | "display_memo"
  | "display_time"
  | "display_main"
  | "display_box"
  | "autoSave"
  | "memo"
  | "ppConvertBefore"
  | "ppConvertBeforeType"
  | "ppConvertAfter"
  | "ppConvertAfterType";
type TLocalStorageItem = {
  defaultValue: string;
};
export type TLocalStorageOptionItem = TLocalStorageItem & {
  description: string;
  dangerous: boolean;
  type: "string" | "boolean" | "number";
  required?: TLocalStorageKeys;
};
export type TLocalStorageDefaultValues = {
  [key in TLocalStorageKeys]: TLocalStorageItem | TLocalStorageOptionItem;
};

export type TCommentPublishData = {
  body: string;
  commands: string[];
  postKey: string;
  videoId: string;
  vposMs: number;
};

export {};
