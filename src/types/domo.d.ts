import type { TCommentPos } from "./types";

type XMLText<T = string> = {
  _text: T;
};

type XMLTextNullable<T = string> = {
  _text?: T;
};

export type DomoColor = {
  A: XMLText<number>;
  B: XMLText<number>;
  G: XMLText<number>;
  R: XMLText<number>;
  ScA: XMLText<number>;
  ScB: XMLText<number>;
  ScG: XMLText<number>;
  ScR: XMLText<number>;
};

export type DomoCommentItem = {
  Color: DomoColor;
  Lines: {
    string?: XMLTextNullable<string>[];
  };
  Mode: XMLText<string>;
  Pos: XMLText<TCommentPos>;
  Size: XMLText<string>;
  Width: XMLText<number>;
  index: XMLText<number>;
};

export type DomoXML = {
  DataCommentSet: {
    CommentList: {
      DataCommentItem: DomoCommentItem[];
    };
    CommentWidth: XMLText<number>;
    SelectedPos: XMLText<TCommentPos>;
    SelectedSize: XMLText<string>;
  };
};
