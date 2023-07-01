import { DomoColor, DomoCommentItem, DomoXML } from "@/@types/domo";
import { layer, layerComment, layerTemplate } from "@/@types/layer";
import { xml2js } from "xml-js";
import { uuid } from "./uuidUtil";
import { Templates } from "@/headers/Trace.templates";

const mode2type: { [key: string]: string | undefined } = {
  Big9: "be9",
  Big10: "be10_1",
  Medium14: "me14",
  Medium15: "me15",
  Big16: "b16",
  Big17: "b17",
  Small21: "s21",
  Small22: "s22",
  Medium26: "tm26",
  Medium27: "tm27",
  Small38: "ts38",
  Small39: "ts39",
  ozto52: undefined,
  ozto70: undefined,
  ozto75: undefined,
  ozto100: undefined,
};

const domoColor2code = (color: DomoColor): string => {
  const { B, G, R } = color;
  const r = Math.round(R._text).toString(16).padStart(2, "0");
  const g = Math.round(G._text).toString(16).padStart(2, "0");
  const b = Math.round(B._text).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

const domoLines2content = (
  item: DomoCommentItem,
  template: layerTemplate
): string[] => {
  if (item.Lines.string === undefined) {
    return Array(template.height).fill("") as string[];
  }
  if (template.width - item.Width._text >= 0) {
    let paddingStr = "x".repeat(template.width - item.Width._text + 2);
    paddingStr = paddingStr.replace(/xx/g, " ");
    paddingStr = paddingStr.replace(/x/g, " ");
    return item.Lines.string.map((line) => {
      if (line._text) {
        if (line._text.trim() !== "") {
          return paddingStr + line._text;
        }
      }
      return "";
    });
  } else {
    return item.Lines.string.map((line) => {
      if (line._text) {
        if (line._text.trim() !== "") {
          return line._text;
        }
      }
      return "";
    });
  }
};

/**
 * どーもさんツールのXMLからダンスクJSONに変換する
 * @pram xml どーもさんツールのXML(string)
 */
const domo2dansa = (xml: string): layer[] => {
  const xmlData = xml2js(xml, { compact: true, nativeType: true }) as DomoXML;
  const layers: layer[] = [];
  xmlData.DataCommentSet.CommentList.DataCommentItem.forEach((item) => {
    const template_type = mode2type[item.Mode._text];
    if (template_type) {
      const _layerTemplate = Templates[template_type];
      if (_layerTemplate) {
        const layerCommentSize = _layerTemplate.size[0];
        if (layerCommentSize) {
          const comment: layerComment = {
            font: layerCommentSize.font,
            line: layerCommentSize.line,
            lineCount: layerCommentSize.lineCount,
            content: domoLines2content(item, _layerTemplate),
          };
          const _layer: layer = {
            ..._layerTemplate,
            type: template_type,
            font: "gothic",
            visible: true,
            selected: false,
            color: domoColor2code(item.Color),
            content: [comment],
            layerId: uuid(),
            pos: item.Pos._text,
          };
          layers.push(_layer);
        }
      }
    }
  });
  return layers;
};

export { domo2dansa };
