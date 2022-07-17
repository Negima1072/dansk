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
   * @param ownerMode
   */
  toString: (
    layer: layer,
    monospaced = false,
    replaceTab = false,
    ownerMode = false
  ): { command: string; content: string[] } | undefined => {
    const string = comment2str(layer, monospaced, replaceTab, ownerMode);
    if (!string) return;
    if (layer.pos === "shita") string.reverse();
    return {
      command: `[${[
        ...layer.commands,
        layer.color,
        layer.pos,
        layer.font,
        "ca",
      ].join(" ")}]`,
      content: string,
    };
  },
};

/**
 * 空白を最適化するらしい
 * @param input
 * @param mode
 */
const replaceSpace = (input: string, mode = 0) => {
  if (mode > 1) {
    input = input
      .replace(/[\u2001\u3000]/g, "\u2003")
      .replace(/\u2000/g, "\u2002");
  }
  if (mode > 0) {
    input = input
      .replace(/\u2003/g, "\u200A".repeat(12))
      .replace(/\u2002/g, "\u200A".repeat(6))
      .replace(/\u2004/g, "\u200A".repeat(4))
      .replace(/\u2005/g, "\u200A".repeat(3))
      .replace(/\u2006/g, "\u200A".repeat(2));
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
/**
 * TABモード時用? 全角空白2 -> TAB
 * @param input
 */
const space2tab = (input: string[]): string[] => {
  input = input.map((value) => {
    value = value.replace(/\u2003{2}/g, "\u0009");
    if (value.match(/\u0009$/)) value += "\u200b";
    return value;
  });
  return input;
};
/**
 * コメントの横幅取得
 * 全角前提なので半角文字が入ると崩れる
 * @param input
 */
const getCommentWidth = (
  input: string
): { width: number; leftSpaceWidth: number } => {
  let leftSpaceWidth = 0,
    width = 0,
    isLeftSpace = true;
  for (const char of Array.from(input)) {
    switch (char) {
      case "\u2003":
        width += 12;
        if (isLeftSpace) {
          leftSpaceWidth += 12;
          //g += Array(12+1).join('\uA003');
        }
        break;
      case "\u2002":
        width += 6;
        if (isLeftSpace) {
          leftSpaceWidth += 6;
          //g += Array(6+1).join('\uA003');
        }
        break;
      case "\u2004":
        width += 4;
        if (isLeftSpace) {
          leftSpaceWidth += 4;
          //g += Array(4+1).join('\uA003');
        }
        break;
      case "\u2005":
        width += 3;
        if (isLeftSpace) {
          leftSpaceWidth += 3;
          //g += Array(3+1).join('\uA003');
        }
        break;
      case "\u2006":
        width += 2;
        if (isLeftSpace) {
          leftSpaceWidth += 2;
          //g += Array(2+1).join('\uA003');
        }
        break;
      case "\u200A":
        width += 1;
        if (isLeftSpace) {
          leftSpaceWidth += 1;
          //g += Array(2+1).join('\uA003');
        }
        break;
      case "\u005F":
      case "\uFF70":
      case "\u00AF":
      case "\u2216":
      case "\uFFE8":
        width += 6;
        isLeftSpace = false;
        break;
      case "\u2580":
      case "\u2590":
        width += 8.5;
        isLeftSpace = false;
        break;
      case "\u2043":
        width += 3.692307;
        isLeftSpace = false;
        break;
      case "\u01C0":
        width += 3.111111;
        isLeftSpace = false;
        break;
      case "\u207B":
      case "\u208B":
        width += 3.466666;
        isLeftSpace = false;
        break;
      case "\u002F":
        width += 5.647058;
        isLeftSpace = false;
        break;
      default:
        //未登録文字を検討、塗り用として割り切るか
        width += 12;
        isLeftSpace = false;
        break;
    }
  }
  return { leftSpaceWidth, width };
};
/**
 * 先頭の空白の長さ調節
 * @param input
 * @param width
 */
const removeLeadingSpace = (input: string, width: number) => {
  for (let i = 0; i < width; i++) {
    switch (input.slice(0, 1)) {
      case "\u2003":
        //12-11
        //input = Array(12).join('\uA003') + input.slice(1);
        input = "\u2002" + "\u2005" + "\u2006" + input.slice(1);
        break;
      case "\u2002":
        //6-5
        //input = Array(6).join('\uA003') + input.slice(1);
        input = "\u2005" + "\u2006" + input.slice(1);
        break;
      case "\u2004":
        //4-3
        //input = Array(4).join('\uA003') + input.slice(1);
        input = "\u2005" + input.slice(1);
        break;
      case "\u2005":
        //3-2
        //input = Array(3).join('\uA003') + input.slice(1);
        input = "\u2006" + input.slice(1);
        break;
      case "\u2006":
        //2-1
        input = Array(2).join("\u200A") + input.slice(1);
        break;
      case "\u200A":
        input = input.slice(1);
        break;
      default:
        break;
    }
  }
  return replaceSpace(input, 1);
};

const addTrailingSpace = (input: string, width: number) => {
  input += "\u200A".repeat(width);
  input = replaceSpace(input, 0);
  return input;
};
/**
 * 一番横幅が広い行を取得する
 * @param input
 */
const getMaxWidthIndex = (
  input: { width: number }[]
): { index: number; value: number } => {
  const widthArr = input.map((value) => value.width),
    mavValue = Math.max(...widthArr);
  return { index: widthArr.indexOf(mavValue), value: mavValue };
};

const comment2str = (
  layer: layer,
  monospaced: boolean,
  replaceTab: boolean,
  isOwnerMode: boolean
): string[] | undefined => {
  isOwnerMode;
  const result: string[] = [];
  let layerWidth = layer.width * 12;
  if (layer.critical) {
    switch (layerWidth) {
      case 216:
        layerWidth += 4;
        break;
      case 240:
        layerWidth += 8;
        break;
      case 264:
        layerWidth += 8;
        break;
      case 408:
        layerWidth += 8;
        break;
    }
  }
  let removableSpace = 0;
  layer.content = layer.content.map((item) => {
    item.content = item.content.map((data) => replaceSpace(data));
    return item;
  });
  const commentWidth = layer.content.map((item) =>
    item.content.map((data) => getCommentWidth(data))
  );
  if (monospaced) {
    removableSpace = Math.min(
      ...commentWidth.reduce(
        (pv, comment) =>
          pv.concat(
            comment.map((line) =>
              Math.min(line.leftSpaceWidth, layerWidth - line.width)
            )
          ),
        [] as number[]
      )
    );
  }
  layer.content.forEach((group, index) => {
    if (!monospaced) {
      removableSpace = Math.min(
        ...(commentWidth[index]?.map((line) =>
          Math.min(line.leftSpaceWidth, layerWidth - line.width)
        ) || [0])
      );
    }
    const width = layerWidth - removableSpace * 2;
    let comment = group.content.map((value) =>
      removeLeadingSpace(value, removableSpace)
    );
    const maxWidth = getMaxWidthIndex(commentWidth[index] || []);
    comment[maxWidth.index] = addTrailingSpace(
      comment[maxWidth.index] || "",
      width - maxWidth.value
    );
    if (replaceTab) comment = space2tab(comment);
    const length = comment.join("").length;
    if (length > 75) {
      alert(`突破しちゃいます。\n長さ：${length}`);
      return;
    }
    result.push(comment.join("<br>"));
  });
  return result;
};
export default layerUtil;
