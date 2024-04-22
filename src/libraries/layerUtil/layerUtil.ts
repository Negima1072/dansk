import type { TLayer, TLayerComment, TLayerTemplate } from "@/@types/layer";
import type { TCommentFont, TCommentPos } from "@/@types/types";
import { Templates } from "@/headers/Trace.templates";
import { layers2string } from "@/libraries/layerUtil/main";
import { OverflowError } from "@/libraries/layerUtil/OverflowError";
import { Storage } from "@/libraries/localStorage";

/**
 * layer関係の処理をする関数集
 */
const layerUtil = {
  /**
   * layerTemplateからlayerComment[]を生成する
   * @param layer
   */
  generateLineFromTemplate: (layer: TLayerTemplate): TLayerComment[] => {
    /** 出力用配列 */
    const lines: TLayerComment[] = [];
    for (const size of layer.size) {
      for (let i = 0; i < (size.count || 1); i++) {
        lines.push({
          font: size.font,
          line: size.line,
          height: size.height,
          lineCount: size.lineCount,
          content: [],
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
  isEqual: (a: TLayer, b: TLayer): boolean => {
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
  parse: (): TLayer[] | undefined => {
    //todo:parse用意？
    return [];
  },
  /**
   * フォント切り替え
   * @param value {TCommentFont} 現在のフォント
   */
  toggleFont: (value: TCommentFont): TCommentFont => {
    return value === "mincho" ? "gothic" : "mincho";
  },
  /**
   * コメント位置切り替え
   * layerのposListを参照して切替可能な位置に切り替える
   * posListを参照するためlayerごと受け取る
   * @param layer {TLayer}
   */
  togglePos: (layer: TLayer): TCommentPos => {
    const index = layer.posList.indexOf(layer.pos);
    if (layer.posList.length > index + 1) {
      return layer.posList[index + 1] || "ue";
    } else {
      return layer.posList[0] || "ue";
    }
  },
  /**
   * layerをだんすく形式の文字列に変換
   * @param layerData {TLayer[]} 変換対象のレイヤー
   * @param monospaced {boolean} 等幅
   * @param replaceTab {boolean} TabMode
   * @param ownerMode {boolean} 投稿者コメント
   */
  toString: (
    layerData: TLayer[],
    monospaced: boolean = false,
    replaceTab: boolean = false,
    ownerMode: boolean = false,
  ): { content: string[]; command: string }[] | undefined => {
    try {
      return layers2string(layerData, {
        monospaced,
        useTab: replaceTab,
        owner: ownerMode,
        disableSpaceOptimization:
          Storage.get("options_disableSpaceOptimization") === "true",
      });
    } catch (e) {
      if (e instanceof OverflowError) {
        alert(
          `コメントの書き出しに失敗しました\nコメントの長さが${e.limit}文字を超えています\n${e.count}文字\nレイヤー名: ${e.layer.id}`,
        );
      }
      alert("コメントの書き出しに失敗しました");
      return undefined;
    }
  },
  formatAsString: (
    data: { content: string[]; command: string }[],
  ): string[] => {
    const result: string[] = [];
    for (const comment of data) {
      for (const line of comment.content) {
        if (comment.command) {
          result.push(comment.command + line);
          comment.command = "";
        } else {
          result.push(line);
        }
      }
    }
    return result;
  },
};

export { layerUtil };
