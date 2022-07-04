import { commentFont, commentPos, layer } from "@/@types/types";
import { Templates } from "@/headers/Trace.templates";

const layerUtil = {
  toString: (layer: layer[]): string => {
    console.log(layer);
    return "test";
  },
  parse: (input: string): layer[] | undefined => {
    console.log(input);
    return [];
  },
  getIdByValue: (value: string): string => {
    for (const i in Templates) {
      if (Templates[i]?.value === value) {
        return i;
      }
    }
    return "be9";
  },
  togglePos: (value: commentPos): commentPos => {
    switch (value) {
      case "ue":
        return "naka";
      case "naka":
        return "shita";
      case "shita":
        return "ue";
    }
  },
  toggleFont: (value: commentFont): commentFont => {
    return value === "mincho" ? "gothic" : "mincho";
  },
};
export default layerUtil;
