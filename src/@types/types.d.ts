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
  exportLayer?: layer[];
  setExportLayer?: (layer: layer[]) => void;
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

type layerTemplates = {
  [key: string]: layerTemplate;
};
type layerTemplate = {
  commands: string[];
  pos: commentPos;
  text: string;
  value: string;
  id: string;
  width: number;
  height: number;
  critical: boolean;
  nakaOnly: boolean;
};
type layer = {
  type: string;
  value: string;
  commands: string[];
  pos: commentPos;
  text: string;
  id: string;
  width: number;
  height: number;
  critical: boolean;
  nakaOnly: boolean;
  font: commentFont;
  visible: boolean;
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
