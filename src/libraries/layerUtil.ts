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
    /** 出力用配列 */
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
   * @param layerData {layer[]} 変換対象のレイヤー
   * @param monospaced {boolean} 等幅
   * @param replaceTab {boolean} TabMode
   * @param ownerMode {boolean} 投稿者コメント
   */
  toString: (
    layerData: layer[],
    monospaced = false,
    replaceTab = false,
    ownerMode = false
  ): { command: string; content: string[] }[] | undefined => {
    /** 出力用文字列 */
    const result = [];
    layerData = layerData.map((layer) => {
      layer.content = layer.content.map((item) => {
        item.content = item.content.map((data) => replaceSpace(data, 2));
        return item;
      });
      return layer;
    });
    /** 等幅用横幅(px)変数 等幅ではないならundefinedのまま */
    let width = undefined;
    if (monospaced) {
      width = Math.max(
        ...layerData.reduce(
          (pv, layer) =>
            pv.concat(
              layer.critical
                ? [0]
                : layer.content.reduce(
                    (pv, layerLine) =>
                      pv.concat(
                        layerLine.content.map((value) => {
                          const { width, leftSpaceWidth } =
                            getCommentWidth(value);
                          if (width === leftSpaceWidth) return 0;
                          return (
                            ((width -
                              leftSpaceWidth +
                              Math.abs(
                                leftSpaceWidth - (layer.width * 12 - width)
                              )) /
                              12) *
                            layerLine.font *
                            layer.scale.x
                          );
                        })
                      ),
                    [] as number[]
                  )
            ),
          [] as number[]
        )
      );
    }
    for (const layer of layerData) {
      /** コメント本体 */
      const string = comment2str(
        layer,
        monospaced,
        replaceTab,
        ownerMode,
        width
      );
      if (!string) return;
      if (layer.pos === "shita") string.reverse();
      result.push({
        command: `[${[
          ...layer.commands,
          layer.color,
          layer.pos,
          layer.font,
          "ca",
        ].join(" ")}]`,
        content: string,
      });
    }
    return result;
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
 * @param input {string} 調査対象の文字列
 */
const getCommentWidth = (
  input: string
): { width: number; leftSpaceWidth: number } => {
  /** 左の空白幅 */
  let leftSpaceWidth = 0,
    /** コメント幅 */
    width = 0,
    /** 空白ではない文字を見つけたらfalse */
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
        input = "\u2002\u2005\u2006" + input.slice(1);
        break;
      case "\u2002":
        //6-5
        //input = Array(6).join('\uA003') + input.slice(1);
        input = "\u2005\u2006" + input.slice(1);
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
        input = "\u200A" + input.slice(1);
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
    maxValue = Math.max(...widthArr);
  return { index: widthArr.indexOf(maxValue), value: maxValue };
};

const getLayerWidth = (layer: layer) => {
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
  return layerWidth;
};

/**
 *
 * @param layer {layer} 変換対象のレイヤー
 * @param monospaced {boolean} 等幅
 * @param replaceTab {boolean} TabMode
 * @param isOwnerMode {boolean} 投稿者コメント
 * @param monoWidth {number|undefined} 等幅時の横幅(px)
 */
const comment2str = (
  layer: layer,
  monospaced: boolean,
  replaceTab: boolean,
  isOwnerMode: boolean,
  monoWidth: number | undefined
): string[] | undefined => {
  /** コメント文字数上限 */
  const commentMaxLength = isOwnerMode ? 1024 : 75;
  /** 結果出力用配列 */
  const result: string[] = [];
  /** レイヤー幅(px) */
  const layerWidth = getLayerWidth(layer);
  /** 削除可能な空白(px) */
  let removableSpace = 0;
  /** 各コメントの横幅(px) */
  const commentsWidth = layer.content.map((item) => {
    const group: { width: number; leftSpaceWidth: number; index: number }[] =
      [];
    item.content.forEach((data, index) => {
      const { width, leftSpaceWidth } = getCommentWidth(data);
      if (width === leftSpaceWidth) return;
      group.push({ width, leftSpaceWidth, index });
    });
    return group;
  });
  //等幅なら全行で一番狭い隙間を取得する
  if (!monospaced) {
    removableSpace = Math.min(
      ...commentsWidth.reduce(
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
  //コメントごとに出力していく
  layer.content.forEach((group, index) => {
    /** このグループの各行の横幅 */
    let commentWidth = commentsWidth[index];
    if (!commentWidth) return;
    if (monospaced && monoWidth !== undefined) {
      removableSpace =
        (layerWidth - (monoWidth * 12) / (group.font * layer.scale.x)) / 2;
    } else if (!monospaced && layer.pos !== "naka") {
      removableSpace = Math.min(
        ...commentWidth.map((line) =>
          Math.min(line.leftSpaceWidth, layerWidth - line.width)
        )
      );
    }
    if (layer.critical || !isFinite(removableSpace)) removableSpace = 0;
    /** コメントの横幅(px) */
    const width = layerWidth - removableSpace * 2;
    /** 左の空白を消した文字列 */
    let comment = group.content.map((value) =>
      removeLeadingSpace(value, removableSpace)
    );
    //空白を消したので更新
    commentWidth = [];
    comment.forEach((data, index) => {
      const { width, leftSpaceWidth } = getCommentWidth(data);
      if (width === leftSpaceWidth || !commentWidth) return;
      commentWidth.push({ width, leftSpaceWidth, index });
    });
    /** グループ内で一番幅が広い行 */
    const maxWidth = getMaxWidthIndex(commentWidth);
    if (maxWidth.value > layerWidth)
      return alert(
        `テンプレート幅を超えています\nレイヤー名：${
          layer.text
        }\nコメント番号：${
          index + 1
        }\nテンプレート幅：${layerWidth}\nコメント幅：${
          maxWidth.value
        }\nコメント行：${maxWidth.index + 1}`
      );
    //幅大きい順にソート
    commentWidth.sort((a, b) =>
      a.width > b.width ? -1 : a.width < b.width ? 1 : 0
    );
    if (replaceTab) comment = space2tab(comment);
    /** 出力用配列 */
    const output: { content: string[]; width: number }[] = [];
    for (const value of commentWidth) {
      /** 行の文字列 */
      let commentLine = comment[value.index] || "",
        /** 行を追加したか */
        isAdded = false;
      //各行をコメントに足せるか確認していく
      for (const item of output) {
        //最終行の場合、\uA001が要らなくなるので
        if (
          item.width +
            commentLine.length -
            (value.index === comment.length - 1 ? 1 : 0) <=
          commentMaxLength
        ) {
          item.content[value.index] = commentLine;
          item.width = item.content.join("\n").length;
          isAdded = true;
          break;
        }
      }
      if (isAdded) continue;
      //どのコメントにも足せなかった場合
      commentLine = addTrailingSpace(
        commentLine,
        width - getCommentWidth(commentLine).width
      );
      const template: string[] = comment.map((_, index, array) =>
        index === array.length - 1 ? "\uA001" : ""
      );
      template[value.index] = commentLine;
      if (template.join("\n").length > commentMaxLength)
        return alert(
          `文字数が上限を突破しました\nレイヤー名：${
            layer.text
          }\nコメント番号：${index + 1}\n突破した行：${
            value.index + 1
          }\n文字数：${commentLine.length}\nコメントモード：${
            isOwnerMode ? "投稿者コメント" : "一般コメント"
          }\nコメント上限：${commentMaxLength}文字\n使用可能な文字数：${
            commentMaxLength - comment.length
          }文字`
        );
      output.push({ content: template, width: template.join("\n").length });
    }
    result.push(
      ...output.map((value) =>
        value.content
          .join("<br>")
          .replace(/\uA001/g, "[03]")
          .replace(/\u0009/g, "[tb]")
      )
    );
  });
  return result;
};
export default layerUtil;
