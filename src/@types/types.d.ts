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
};
type contextProps = {
  children: ReactNode;
  value?: contextTypeNullable;
};
