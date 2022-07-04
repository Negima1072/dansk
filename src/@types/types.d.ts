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
  text: string;
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
  seekToHeadButton?: HTMLButtonElement;
  commentOnOffButton?: HTMLButtonElement;
  commentCommandInput?: HTMLInputElement;
  commentInputTextarea?: HTMLTextAreaElement;
  HeaderElement?: HTMLDivElement;
  MainElement?: HTMLDivElement;
  FooterElement?: HTMLDivElement;
  exportLayer?: layer[];
  setExportLayer?: (layer: layer[]) => void;
};
type contextType = {
  videoElement: HTMLVideoElement;
  seekToHeadButton: HTMLButtonElement;
  commentOnOffButton: HTMLButtonElement;
  commentCommandInput: HTMLInputElement;
  commentInputTextarea: HTMLTextAreaElement;
  HeaderElement: HTMLDivElement;
  MainElement: HTMLDivElement;
  FooterElement: HTMLDivElement;
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
