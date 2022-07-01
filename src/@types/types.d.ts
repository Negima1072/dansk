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
type contextType = {
  videoElement: HTMLVideoElement;
  seekToHeadButton: HTMLButtonElement;
  CommentCommandInput: HTMLInputElement;
};
type contextProps = {
  children: ReactNode;
};
