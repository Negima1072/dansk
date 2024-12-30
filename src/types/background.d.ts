export type TObjectFitArgs =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";

export type TBackground = {
  selected: number;
  images: TBackgroundImage[];
  open: boolean;
  mode: TObjectFitArgs;
  visible: boolean;
  transparency: number;
};

export type TBackgroundImage = {
  id: string;
  url: string;
  crop?: {
    original: string;
    range: TCropRange;
  };
};

export type TCropRange = {
  [key in TCropKey]: number;
};

export type TCropKey = "_pos1X" | "_pos2X" | "_pos1Y" | "_pos2Y";
