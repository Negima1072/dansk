import {
  commentFont,
  commentPos,
  layer,
  layerLine,
  layerTemplate,
} from "@/@types/types";
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
        return "shita";
      case "naka":
        return "ue";
      case "shita":
        return "naka";
    }
  },
  toggleFont: (value: commentFont): commentFont => {
    return value === "mincho" ? "gothic" : "mincho";
  },
  generateLineFromTempate: (layer: layerTemplate): layerLine[] => {
    const lines: layerLine[] = [];
    for (const size of layer.size) {
      for (let i = 0; i < (size.count || 1); i++) {
        const line = [];
        for (let j = 0; j < size.lineCount; j++) {
          line.push("");
        }
        lines.push({
          font: size.font,
          line: size.line,
          height: size.height,
          content: line,
        });
      }
    }
    return lines;
  },
};
export default layerUtil;
