import { ReactNode } from "react";

/** 投稿者コメント */
type ownerComment = {
  /** 時間: mm:ss.ss */
  time: string;
  /** コマンド(スペース区切り) */
  command: string;
  /** コメントデータ */
  comment: string;
};

type convertFormat = "domo" | "tokome" | "dansk";
type contextTypeNullable = {
  videoElement?: HTMLVideoElement;
  commentCommandInput?: HTMLInputElement;
  commentInputTextarea?: HTMLTextAreaElement;
  videoSymbolContainerCanvas?: HTMLCanvasElement;
  HeaderElement?: HTMLDivElement;
  MainElement?: HTMLDivElement;
  BackgroundImageElement?: HTMLDivElement;
  FooterElement?: HTMLDivElement;
  LayerElement?: HTMLDivElement;
  MemoElement?: HTMLDivElement;
  exportLayer?: string[];
  setExportLayer?: (layerString: string[]) => void;
};
type contextType = {
  videoElement: HTMLVideoElement;
  commentCommandInput: HTMLInputElement;
  commentInputTextarea: HTMLTextAreaElement;
  HeaderElement: HTMLDivElement;
  MainElement: HTMLDivElement;
  BackgroundImageElement: HTMLDivElement;
  FooterElement: HTMLDivElement;
  LayerElement: HTMLDivElement;
  MemoElement: HTMLDivElement;
  exportLayer: layer[];
  setExportLayer: (layer: layer[]) => void;
};
type contextProps = {
  children: ReactNode;
  value?: contextTypeNullable;
};

type commentPos = "ue" | "naka" | "shita";
type commentFont = "mincho" | "gothic";

type command = {
  text: string;
  value: string;
  group: string;
};
type commandList = command[][][];

type MonoChar = {
  width: number;
  isSpace: boolean;
};
type ProChar = {
  width: {
    mincho: number;
    gothic: number;
  };
  isSpace: boolean;
};
type CharList = {
  [key: string]: MonoChar | ProChar;
  default: MonoChar | ProChar;
};

type layerTemplates = {
  [key: string]: layerTemplate;
};
type layerSizeData = {
  font: number;
  line: number;
  lineCount: number;
  count?: number;
  height?: number;
  margin?: number;
};
type layerLine = {
  font: number;
  line: number;
  height?: number;
  lineCount: number;
  content: string[];
};
type layerTemplate = {
  /** 適用するコマンド */
  commands: string[];
  /** 初期位置 */
  pos: commentPos;
  /** テンプレが対応している位置 */
  posList: commentPos[];
  /** テンプレート名 */
  text: string;
  /** 旧だんすくの識別名 */
  value: string;
  /** 配列のキー */
  id: string;
  /** textareaの横幅(px) */
  areaWidth: number;
  /** 横幅 */
  width: number;
  /** 行数 */
  height: number;
  /** 臨海幅 or DRの場合にtrue */
  critical: boolean;
  /** DRの画面外幅(片側)・DRでない場合は指定不要 */
  drWidth?: number;
  /** 各テンプレごとのtop位置(px) */
  top: { ue: number; naka: number; shita: number };
  /** left位置(px) */
  left: number;
  /** x/yそれぞれのtransform scaleの値 */
  scale: { x: number; y: number };
  /** {
  font: font-size(px)
  line: line-height(px)
  lineCount: 行数
  height: height(px)
  count: 何回繰り返すか
} */
  size: layerSizeData[];
};
type layer = layerTemplate & {
  type: string;
  font: commentFont;
  visible: boolean;
  selected: boolean;
  color: string;
  content: layerLine[];
  overwrite?: boolean;
  layerId: string;
};

type autoSave = {
  timestamp: number;
  data: layer[];
};

type optionDataType = {
  bgActive: number;
  bgImages: string[];
  bgEditing: boolean;
  bgMode: objectFitArgs;
  bgVisible: boolean;
  bgTransparency: number;
  grid: boolean;
  replace: boolean;
  preview: "disable" | "previewOnly" | "enable";
};

type localStorageKeys =
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
type localStorageItem = {
  defaultValue: string;
};
type localStorageOptionItem = localStorageItem & {
  description: string;
  dangerous: boolean;
  type: "string" | "boolean" | "number";
  required?: localStorageKeys;
};
type localStorageDefaultValues = {
  [key in localStorageKeys]: localStorageItem | localStorageOptionItem;
};

type objectFitArgs = "contain" | "cover" | "fill" | "none" | "scale-down";

declare global {
  interface Window {
    __videoplayer: nvPlayerApi;
  }

  interface Event {
    isComposing: boolean;
  }
}
type crossOriginType = "anonymous" | "use-credentials";

type nvPlayerApi = {
  autoplay: () => boolean;
  buffered: () => TimeRanges;
  canPlayType: () => string;
  clear: () => undefined;
  crossOrigin: (crossOrigin?: crossOriginType) => crossOriginType;
  currentSrc: () => string;
  currentTime: (currentTime?: number) => number;
  defaultPlaybackRate: () => number;
  duration: () => number;
  element: () => HTMLVideoElement;
  enableCurrentTimeSmoothing: boolean;
  ended: () => boolean;
  load: () => unknown;
  mirror: (isMirror: boolean) => boolean | unknown;
  muted: (isMuted?: boolean) => boolean | unknown;
  originalCurrentTime: () => number;
  pause: () => unknown;
  paused: () => boolean;
  play: () => unknown;
  playbackRate: (rate?: number) => number;
  playbackStalled: () => boolean;
  seeking: () => boolean;
  src: () => string;
  volume: (volume?: number) => number;
};
