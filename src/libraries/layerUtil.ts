import {
  commentFont,
  commentPos,
  layer,
  layerLine,
  layerTemplate,
} from "@/@types/types";
import { Templates } from "@/headers/Trace.templates";

/**
 * layer関係の処理をする関数集
 */
const layerUtil = {
  /**
   * layerTemplateからlayerLine[]を生成する
   * @param layer
   */
  generateLineFromTemplate: (layer: layerTemplate): layerLine[] => {
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
          lineCount: size.lineCount,
          content: line,
        });
      }
    }
    return lines;
  },
  /**
   * layer識別用
   * valueからidを取得
   * @param value
   */
  getIdByValue: (value: string): string => {
    for (const i in Templates) {
      if (Templates[i]?.value === value) {
        return i;
      }
    }
    return "be9";
  },
  /**
   * layer同士の比較
   * @param a
   * @param b
   */
  isEqual: (a: layer, b: layer): boolean => {
    const aStr: string[] = [],
      bStr: string[] = [];
    for (const group of a.content) {
      for (const item of group.content) {
        aStr.push(item);
      }
    }
    for (const group of b.content) {
      for (const item of group.content) {
        bStr.push(item);
      }
    }
    return aStr.join("") === bStr.join("");
  },
  parse: (input: string): layer[] | undefined => {
    console.log(input);
    return [];
  },
  /**
   * フォント切り替え
   * @param value {commentFont} 現在のフォント
   */
  toggleFont: (value: commentFont): commentFont => {
    return value === "mincho" ? "gothic" : "mincho";
  },
  /**
   * コメント位置切り替え
   * layerのposListを参照して切替可能な位置に切り替える
   * posListを参照するためlayerごと受け取る
   * @param layer {layer}
   */
  togglePos: (layer: layer): commentPos => {
    const index = layer.posList.indexOf(layer.pos);
    if (layer.posList.length > index + 1) {
      return layer.posList[index + 1] || "ue";
    } else {
      return layer.posList[0] || "ue";
    }
  },
  /**
   * layerをだんすく形式の文字列に変換
   * @param layer
   * @param monospaced
   * @param replaceTab
   */
  toString: (
    layer: layer,
    monospaced = false,
    replaceTab = false
  ): { command: string; content: string[] } | undefined => {
    const layerContent: string[] = [];
    for (const line of layer.content) {
      const string = comment2str(line, layer, monospaced, replaceTab);
      if (!string) {
        return;
      }
      layerContent.push(...string);
    }
    return {
      command: `[ca ${[
        ...layer.commands,
        layer.color,
        layer.pos,
        layer.font,
      ].join(" ")}]`,
      content: layerContent,
    };
  },
};

const replaceSpace = (input: string, mode = 0) => {
  if (mode > 1) {
    input = input
      .replace(/[\u2001\u3000]/g, "\u2003")
      .replace(/\u2000/g, "\u2002");
  }
  if (mode > 0) {
    input = input
      .replace(/\u2003/g, Array(12 + 1).join("\u200A"))
      .replace(/\u2002/g, Array(6 + 1).join("\u200A"))
      .replace(/\u2004/g, Array(4 + 1).join("\u200A"))
      .replace(/\u2005/g, Array(3 + 1).join("\u200A"))
      .replace(/\u2006/g, Array(2 + 1).join("\u200A"));
  }
  return input
    .replace(/\u200A{12}/g, "\u2003")
    .replace(/\u200A{6}/g, "\u2002")
    .replace(/\u200A{4}/g, "\u2004")
    .replace(/\u200A{3}/g, "\u2005")
    .replace(/\u200A{2}/g, "\u2006")
    .replace(/\u2003\u200A/g, "\u2002\u2004\u2005")
    .replace(/\u2002\u200A/g, "\u2004\u2005")
    .replace(/\u2004\u200A/g, "\u2005\u2006");
};
const space2tab = (input: string): string => {
  input = input.replace(/\u2003{2}/g, "\u0009");
  if (input.match(/\u0009$/)) {
    input += "\u200B";
  }
  return input;
};

const comment2str = (
  item: layerLine,
  layer: layer,
  monospaced: boolean,
  replaceTab: boolean
): string[] | undefined => {
  let comment = item.content;
  const stringArr = [],
    result: string[] = [];
  comment = comment.map((data) => replaceSpace(data));
  let count = 0;
  for (const line of comment) {
    let width = 0,
      leftWidth = 0,
      isLeftSide = true;
    for (const char of Array.from(line)) {
      switch (char) {
        case "\u2003":
          width += 12;
          if (isLeftSide) leftWidth += 12;
          break;
        case "\u2002":
          width += 6;
          if (isLeftSide) leftWidth += 6;
          break;
        case "\u2004":
          width += 4;
          if (isLeftSide) leftWidth += 4;
          break;
        case "\u2005":
          width += 3;
          if (isLeftSide) leftWidth += 3;
          break;
        case "\u2006":
          width += 2;
          if (isLeftSide) leftWidth += 2;
          break;
        case "\u200A":
          width += 1;
          if (isLeftSide) leftWidth += 1;
          break;
        default:
          switch (char) {
            case "\u005F":
            case "\uFF70":
            case "\u00AF":
            case "\u2216":
            case "\uFFE8":
              width += 6;
              break;
            case "\u2580":
            case "\u2590":
              width += 8.5;
              break;
            case "\u2043":
              width += 3.692307;
              break;
            case "\u01C0":
              width += 3.111111;
              break;
            case "\u207B":
            case "\u208B":
              width += 3.466666;
              break;
            case "\u002F":
              width += 5.647058;
              break;
            default:
              width += 12;
          }
          isLeftSide = false;
      }
    }
    if (!isLeftSide) {
      if (width > layer.width) {
        alert("テンプレート幅を超えています");
        return;
      }
      stringArr.push({ width, leftWidth, content: line, id: count });
    }
    count++;
  }
  stringArr.sort((a, b) => {
    if (a.width > b.width) return -1;
    if (a.width < b.width) return 1;
    return 0;
  });
  let mono = false;
  while (stringArr.length > 0) {
    const templateArr = [];
    for (let i = 0; i < comment.length; i++) {
      if (i === comment.length - 1) {
        templateArr.push("\uA001");
      } else {
        templateArr.push("");
      }
    }
    stringArr.sort((a, b) => {
      if (a.leftWidth < b.leftWidth) return -1;
      if (a.leftWidth > b.leftWidth) return 1;
      return 0;
    });
    let leftSpace = Math.min(...stringArr.map((i) => i.leftWidth));
    const rightSpace = Math.min(...stringArr.map((i) => layer.width - i.width));
    if (leftSpace > rightSpace) {
      leftSpace = rightSpace;
    } else {
      stringArr.sort((a, b) => {
        if (a.leftWidth < b.leftWidth) return -1;
        if (a.leftWidth > b.leftWidth) return 1;
        return 0;
      });
    }
    if (mono || layer.critical) leftSpace = 0;
    if (leftSpace > 0) {
      layer.width -= leftSpace * 2;
      for (const string of stringArr) {
        string.width -= leftSpace;
        string.leftWidth -= leftSpace;
        for (let i = 0; i < leftSpace; i++) {
          switch (string.content.slice(0, 1)) {
            case "\u2003":
              string.content = string.content.replace(
                /^\u2003/,
                "\u2002\u2005\u2006"
              );
              break;
            case "\u2002":
              string.content = string.content.replace(
                /^\u2002/,
                "\u2005\u2006"
              );
              break;
            case "\u2004":
              string.content = string.content.replace(/^\u2004/, "\u2005");
              break;
            case "\u2005":
              string.content = string.content.replace(/^\u2005/, "\u2006");
              break;
            case "\u2006":
              string.content = string.content.replace(/^\u2006/, "\u200A");
              break;
            case "\u200A":
              string.content = string.content.replace(/^\u200A/, "");
              break;
          }
        }
        string.content = replaceSpace(string.content, 2);
      }
    }
    if (monospaced) mono = true;
    const value = stringArr[0];
    if (!value) return;
    console.log(value);
    leftSpace = layer.width - (value.width || 0);
    if (leftSpace > 0) {
      value.width += leftSpace;
      value.content = replaceSpace(
        value.content + Array(leftSpace + 1).join("\u200A"),
        1
      );
    }
    console.log(value.content);
    if (replaceTab) value.content = space2tab(value.content);
    templateArr[value.id] = value.content;
    stringArr.splice(0, 1);
    let length = templateArr.join("\n").length;
    if (length > 75) {
      alert(`コメント長が75を超えています\n長さ：${length}`);
      return;
    }
    while (stringArr[0] !== undefined) {
      stringArr.sort((a, b) => {
        if (a.width < b.width) return -1;
        if (a.width > b.width) return 1;
        if (a.leftWidth < b.leftWidth) return -1;
        if (a.leftWidth > b.leftWidth) return 1;
        return 0;
      });
      if (replaceTab) stringArr[0].content = space2tab(stringArr[0].content);
      if (length + stringArr[0].content.length > 75) {
        if (replaceTab)
          stringArr[0].content = stringArr[0].content.replace(
            /\u0009/g,
            "\u2003\u2003"
          );
        break;
      } else {
        templateArr[stringArr[0].id] = stringArr[0].content;
        stringArr.splice(0, 1);
        length = templateArr.join("\n").length;
      }
    }
    result.push(
      templateArr
        .join("<br>")
        .replace(/\uA001/g, "[03]")
        .replace(/\uA009/g, "[tb]")
    );
  }
  return result;
};
export default layerUtil;
