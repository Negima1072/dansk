import { CharList } from "@/libraries/layerUtil/layerUtil.charList";
import {
  rebuildSpace,
  rebuildSpaceWithCompat,
} from "@/libraries/layerUtil/utils";
import { typeGuard } from "@/libraries/typeGuard";
import type {
  TLayer,
  TLayerComment,
  TLayerExportOptions,
  TMeasuredLayer,
  TMeasuredLayerComment,
  TMeasuredLayerLine,
} from "@/types/layer";
import type { TCommentFont, TMonoChar } from "@/types/types";

export const preProcess = (
  layers: TLayer[],
  options: TLayerExportOptions,
): TMeasuredLayer[] => {
  const formattedLayer = formatLayerData(layers);
  if (options.disableSpaceOptimization) {
    return measureLayers(formattedLayer);
  }
  const layersWithSpace = preProcessSpace(formattedLayer);
  const measuredLayers = measureLayers(layersWithSpace);
  if (options.monospaced) {
    return adjustSpace(measuredLayers);
  }
  return adjustEachSpace(measuredLayers);
};

const formatLayerData = (layers: TLayer[]) => {
  return layers.map((layer) => {
    return {
      ...layer,
      content: layer.content.map((value) => {
        const content = [...value.content];
        while (content.length < value.lineCount) {
          content.push("");
        }
        while (content.length > value.lineCount) {
          content[value.lineCount - 1] += content
            .splice(value.lineCount)
            .join("");
        }
        return { ...value, content };
      }),
    };
  });
};

const adjustEachSpace = (layers: TMeasuredLayer[]) => {
  const spacedLayers = layers.map((layer) => ({
    ...layer,
    content: layer.content.map((comment) => {
      const removableWidths: number[] = [];
      for (const line of comment.content) {
        removableWidths.push(
          line.leftSpaceWidth,
          layer.templateWidth - line.width,
        );
      }
      const removeSpace = Math.min(...removableWidths);
      if (layer.critical || !Number.isFinite(removeSpace)) {
        return {
          ...comment,
          content: comment.content.map((line) => line.content),
        };
      }
      return {
        ...comment,
        content: comment.content.map((line) =>
          removeLeadingSpace(line.content, removeSpace),
        ),
      };
    }),
  }));
  return measureLayers(spacedLayers);
};

const adjustSpace = (layers: TMeasuredLayer[]) => {
  const targetWidth = Math.max(
    ...layers.map((layer) => {
      if (layer.critical) return 0;
      return Math.max(
        ...layer.content.flatMap((comment) =>
          comment.content.map((line) => {
            if (line.leftSpaceWidth === line.width) return 0;
            return (
              ((line.width -
                line.leftSpaceWidth +
                Math.abs(
                  line.leftSpaceWidth - (layer.width * 12 - line.width),
                )) /
                12) *
              comment.font *
              layer.scale.x
            );
          }),
        ),
      );
    }),
  );
  const spacedLayers = layers.map((layer) => ({
    ...layer,
    content: layer.content.map((layerComment) => {
      const removeSpace =
        (layer.templateWidth -
          (targetWidth * 12) / (layerComment.font * layer.scale.x)) /
        2;
      if (layer.critical || !Number.isFinite(removeSpace)) {
        return {
          ...layerComment,
          content: layerComment.content.map((line) => line.content),
        };
      }
      return {
        ...layerComment,
        targetWidth: layer.templateWidth - removeSpace * 2,
        content: layerComment.content.map((line) =>
          removeLeadingSpace(line.content, removeSpace),
        ),
      };
    }),
  }));
  return measureLayers(spacedLayers);
};

/**
 * 先頭の空白の長さ調節
 * @param input
 * @param width
 */
const removeLeadingSpace = (input: string, width: number) => {
  let _input = input;
  for (let i = 0; i < width; i++) {
    switch (_input.slice(0, 1)) {
      case "\u2003":
        //12-11
        //input = Array(12).join('\uA003') + input.slice(1);
        _input = `\u2002\u2005\u2006${_input.slice(1)}`;
        break;
      case "\u2002":
        //6-5
        //input = Array(6).join('\uA003') + input.slice(1);
        _input = `\u2005\u2006${_input.slice(1)}`;
        break;
      case "\u2004":
        //4-3
        //input = Array(4).join('\uA003') + input.slice(1);
        _input = `\u2005${_input.slice(1)}`;
        break;
      case "\u2005":
        //3-2
        //input = Array(3).join('\uA003') + input.slice(1);
        _input = `\u2006${_input.slice(1)}`;
        break;
      case "\u2006":
        //2-1
        _input = `\u200A${_input.slice(1)}`;
        break;
      case "\u200A":
        _input = _input.slice(1);
        break;
      default:
        break;
    }
  }
  return rebuildSpace(_input);
};

const preProcessSpace = (layers: TLayer[]): TLayer[] => {
  return layers.map((layer) => ({
    ...layer,
    content: layer.content.map((comment) => ({
      ...comment,
      content: comment.content.map((line) =>
        rebuildSpaceWithCompat(line).replace(/\s*$/g, ""),
      ),
    })),
  }));
};

const measureLayers = (
  layers: (TLayer | TMeasuredLayer)[],
): TMeasuredLayer[] => {
  return layers.map((layer) => {
    const layerTemplateWidth = getLayerTemplateWidth(layer);
    const commentWidths = layer.content.map<TMeasuredLayerComment>(
      (comment) => {
        const lineWidths = comment.content.map<TMeasuredLayerLine>(
          (line, index) => {
            const content = typeof line === "string" ? line : line.content;
            const measured = measureTextWidth(content, layer.font);
            if (measured.width === measured.leftSpaceWidth) {
              return {
                width: 0,
                leftSpaceWidth: layerTemplateWidth / 2,
                index,
                content,
              };
            }
            return {
              ...measured,
              index,
              content,
            };
          },
        );
        const hasTargetWidth = (
          comment: TMeasuredLayerComment | TLayerComment,
        ): comment is TMeasuredLayerComment =>
          Object.hasOwnProperty.call(comment, "targetWidth");
        return {
          ...comment,
          content: lineWidths,
          width: Math.max(...lineWidths.map((line) => line.width)),
          targetWidth: hasTargetWidth(comment)
            ? comment.targetWidth
            : Math.max(
                ...lineWidths.map((line) => {
                  return (
                    layerTemplateWidth -
                    Math.min(
                      layerTemplateWidth - line.width,
                      line.leftSpaceWidth,
                    ) *
                      2
                  );
                }),
              ),
        };
      },
    );
    return {
      ...layer,
      templateWidth: layerTemplateWidth,
      content: commentWidths,
      measuredWidth: Math.max(...commentWidths.map((comment) => comment.width)),
    };
  });
};

/**
 * コメントの横幅取得
 * 全角前提なので半角文字が入ると崩れる
 * @param input {string} 調査対象の文字列
 * @param font
 */
const measureTextWidth = (
  input: string,
  font: TCommentFont,
): { width: number; leftSpaceWidth: number } => {
  /** 左の空白幅 */
  let leftSpaceWidth = 0;
  /** コメント幅 */
  let width = 0;
  /** 空白ではない文字を見つけたらfalse */
  let isLeftSpace = true;
  /** 文字幅リスト */
  for (const char of Array.from(input)) {
    const value = getCharWidth(char, font);
    width += value.width;
    if (isLeftSpace) {
      if (value.isSpace) {
        leftSpaceWidth += value.width;
      } else {
        isLeftSpace = false;
      }
    }
  }
  return { leftSpaceWidth, width };
};

const getCharWidth = (char: string, font: TCommentFont): TMonoChar => {
  const charItem = CharList[char];
  if (charItem) {
    if (typeGuard.layer.isMonoChar(charItem)) return charItem;
    return { ...charItem, width: charItem.width[font] };
  }
  for (const regex in CharList) {
    const charItem = CharList[regex];
    if (regex.length > 1 && charItem && char.match(new RegExp(regex, "i"))) {
      if (typeGuard.layer.isMonoChar(charItem)) return charItem;
      return { ...charItem, width: charItem.width[font] };
    }
  }
  if (typeGuard.layer.isMonoChar(CharList.default)) return CharList.default;
  return { ...CharList.default, width: CharList.default.width[font] };
};

const getLayerTemplateWidth = (layer: TLayer | TMeasuredLayer) => {
  let layerTemplateWidth = layer.width * 12;
  if (layer.critical) {
    switch (layerTemplateWidth) {
      case 216:
        layerTemplateWidth += 4;
        break;
      case 240:
        layerTemplateWidth += 8;
        break;
      case 264:
        layerTemplateWidth += 8;
        break;
      case 408:
        layerTemplateWidth += 8;
        break;
    }
  }
  return layerTemplateWidth;
};
