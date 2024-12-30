import { OverflowError } from "@/libraries/layerUtil/OverflowError";
import { command2str } from "@/libraries/layerUtil/command";
import { rebuildSpace } from "@/libraries/layerUtil/utils";
import type {
  TLayer,
  TLayerExportOptions,
  TLayerExportResultItem,
  TMeasuredLayer,
  TMeasuredLayerComment,
  TMeasuredLayerLine,
} from "@/types/layer";

import { preProcess } from "./preProcess";

export const layers2string = (
  _layers: TLayer[],
  options: TLayerExportOptions,
) => {
  const layers = preProcess(_layers, options);
  return layers.reduce<{ content: string[]; command: string }[]>(
    (pv, layer) => pv.concat(layer2string(layer, options)),
    [],
  );
};

const layer2string = (layer: TMeasuredLayer, options: TLayerExportOptions) => {
  const content = [...layer.content];
  if (layer.pos === "shita") {
    content.reverse();
  }
  return {
    content: content.reduce<string[]>((pv, comment) => {
      return pv.concat(layerComment2string(layer, comment, options));
    }, []),
    command: command2str(layer),
  };
};

const layerComment2string = (
  layer: TMeasuredLayer,
  comment: TMeasuredLayerComment,
  options: TLayerExportOptions,
) => {
  if (comment.width > layer.templateWidth) {
    throw new Error("comment width is larger than template width");
  }
  const lines = comment.content.sort((a, b) =>
    a.width > b.width ? -1 : a.width < b.width ? 1 : 0,
  );
  const output: TLayerExportResultItem[] = [];
  for (const line of lines) {
    if (options.useTab) {
      line.content = space2tab(line.content);
    }
    appendLine(output, layer, comment, line, options);
  }
  if (output.length === 0) {
    const isMultiCommentLayer =
      layer.size.reduce((pv, val) => pv + (val.count ?? 0), 0) > 1;
    if (isMultiCommentLayer) {
      output.push({
        content: ["\uA001"],
        count: lines.length,
      });
    }
  }
  return result2string(output, options);
};

const result2string = (
  result: TLayerExportResultItem[],
  options: TLayerExportOptions,
): string[] => {
  return result.map((item) => {
    if (options.useTab) {
      item.content = item.content.map((line) => space2tab(rebuildSpace(line)));
    }
    return (
      item.content
        .join("<br>")
        .replace(/\uA001/g, "[03]")
        // biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
        .replace(/\u0009/g, "[tb]")
    );
  });
};

const space2tab = (input: string): string => {
  return input.replace(/\u2003{2}/g, "\u0009");
};

const appendLine = (
  output: TLayerExportResultItem[],
  layer: TMeasuredLayer,
  comment: TMeasuredLayerComment,
  line: TMeasuredLayerLine,
  options: TLayerExportOptions,
) => {
  if (isLastLine(comment, line) && line.content.length === 0) {
    return;
  }
  const commentMaxLength = options.owner ? 1024 : 75;
  for (const item of output) {
    if (
      item.count + line.content.length - (isLastLine(comment, line) ? 1 : 0) <=
      commentMaxLength
    ) {
      item.content[line.index] = line.content;
      item.count = item.content.join("\n").length;
      return;
    }
  }
  let content = options.disableSpaceOptimization
    ? line.content
    : addTrailingSpace(line.content, comment.targetWidth - line.width);
  if (layer.drWidth) content = addDRSpace(content, layer.drWidth);
  if (options.useTab) content = space2tab(rebuildSpace(content));
  const template: string[] = comment.content.map((_, index) =>
    index === comment.content.length - 1 ? "\uA001" : "",
  );
  template[line.index] = content;
  if (template[template.length - 1] === "")
    template[template.length - 1] = "\uA001";
  const currentLength = template.join("\n").length;
  if (currentLength > commentMaxLength) {
    throw new OverflowError(commentMaxLength, currentLength, layer);
  }
  if (template.join("\n") === "") {
    template[0] = "\uA001";
  }
  output.push({
    content: template,
    count: template.join("\n").length,
  });
};

const isLastLine = (
  comment: TMeasuredLayerComment,
  line: TMeasuredLayerLine,
) => {
  return line.index === comment.lineCount - 1;
};

/**
 * 左右位置調整のための空白を末尾に追加
 * @param input
 * @param width
 */
const addTrailingSpace = (input: string, width: number) => {
  if (width < 0) {
    alert(
      "不明なエラーが発生しました\n設定から空白の最適化を無効にし、自身で空白を調整して再度試してください\n改善のため、コメントデータを開発者に送ってください",
    );
    return input;
  }
  let _input = input + "\u200A".repeat(width);
  _input = rebuildSpace(_input);
  return _input;
};

const addDRSpace = (input: string, width: number) => {
  if (width < 0) {
    alert(
      "不明なエラーが発生しました\n改善のため、コメントデータを開発者に送ってください",
    );
    return input;
  }
  let _input = `${"\u200A".repeat(width)}${input}${"\u200A".repeat(width)}`;
  _input = rebuildSpace(input);
  return _input;
};
