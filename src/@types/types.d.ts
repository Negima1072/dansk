import { ReactNode } from "react";

type ownerComment = {
  time: string;
  command: string;
  comment: string;
};
type messageColorClickEvent = {
  type: "color_click";
};
type messageTimeSeekEvent = {
  type: "time_seek";
  time: number;
  relative: boolean;
};
type messageTimeSeekIntEvent = {
  type: "time_seek_int";
  int: number;
};
type messageTimeSeekPlEvent = {
  type: "time_seek_pl";
  pl: string[];
};
type contextTypeNullable = {
  videoElement?: HTMLVideoElement;
  commentCommandInput?: HTMLInputElement;
  commentInputTextarea?: HTMLTextAreaElement;
  HeaderElement?: HTMLDivElement;
  MainElement?: HTMLDivElement;
  FooterElement?: HTMLDivElement;
  LayerElement?: HTMLDivElement;
  exportLayer?: string[];
  setExportLayer?: (layerString: string[]) => void;
};
type contextType = {
  videoElement: HTMLVideoElement;
  commentCommandInput: HTMLInputElement;
  commentInputTextarea: HTMLTextAreaElement;
  HeaderElement: HTMLDivElement;
  MainElement: HTMLDivElement;
  FooterElement: HTMLDivElement;
  LayerElement: HTMLDivElement;
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
  commands: string[];
  pos: commentPos;
  posList: commentPos[];
  text: string;
  value: string;
  id: string;
  areaWidth: number;
  width: number;
  height: number;
  critical: boolean;
  top: { ue: number; naka: number; shita: number };
  left: number;
  scale: { x: number; y: number };
  size: layerSizeData[];
};
type layer = layerTemplate & {
  type: string;
  font: commentFont;
  visible: boolean;
  selected: boolean;
  color: string;
  content: layerLine[];
};
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
declare global {
  interface Window {
    __videoplayer: nvPlayerApi;
  }
}
