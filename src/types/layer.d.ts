import type { TCommentFont, TCommentPos } from "@/types/types";

export type TLayerTemplate = {
  /** 適用するコマンド */
  commands: string[];
  /** 初期位置 */
  pos: TCommentPos;
  /** テンプレが対応している位置 */
  posList: TCommentPos[];
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
  size: TLayerCommentTemplate[];
};

export type TLayerCommentTemplate = {
  font: number;
  line: number;
  lineCount: number;
  count?: number;
  height?: number;
  margin?: number;
};

export type TLayer = TLayerTemplate & {
  type: string;
  font: TCommentFont;
  visible: boolean;
  selected: boolean;
  color: string;
  transparency?: number;
  content: TLayerComment[];
  overwrite?: boolean;
  layerId: string;
};
export type TLayerComment = {
  font: number;
  line: number;
  height?: number;
  lineCount: number;
  content: string[];
};

export type TMeasuredLayer = Omit<TLayer, "content"> & {
  measuredWidth: number;
  templateWidth: number;
  content: TMeasuredLayerComment[];
};

export type TMeasuredLayerComment = Omit<TLayerComment, "content"> & {
  width: number;
  targetWidth: number;
  content: TMeasuredLayerLine[];
};

export type TMeasuredLayerLine = {
  width: number;
  leftSpaceWidth: number;
  content: string;
  index: number;
};

export type TLayerExportOptions = {
  monospaced: boolean;
  useTab: boolean;
  owner: boolean;
  disableSpaceOptimization: boolean;
};

export type TLayerExportResultItem = {
  content: string[];
  count: number;
};

export type TLayerLineWidth = {
  width: number;
  leftSpaceWidth: number;
  index: number;
};
export type TLayerCommentWidth = TLayerLineWidth[];
export type TLayerWidth = TLayerCommentWidth[];

export type TGridPosBlob =
  | {
      immutable: false;
      ue: string;
      naka?: string;
      shita: string;
    }
  | {
      immutable: true;
      any: string;
    };
export type TGridData = {
  [key: string]: TGridPosBlob;
};
