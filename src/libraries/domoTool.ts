import { TLayer, TLayerComment, TLayerTemplate } from "@/@types/layer";
import { uuid } from "./uuidUtil";
import { Templates } from "@/headers/Trace.templates";
import NiconiComments from "@xpadev-net/niconicomments";

const mode2type = {
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
} as const satisfies { [key: string]: string | undefined };

const getTemplateByDomoMode = (
  mode: string
):
  | { template: TLayerTemplate; type: TValueOf<typeof mode2type> }
  | undefined => {
  if (
    !((i: string): i is keyof typeof mode2type =>
      Object.hasOwnProperty.call(mode2type, i))(mode)
  )
    return;
  const templateType = mode2type[mode];
  if (!templateType) return;
  const template = Templates[templateType];
  if (!template) return;
  return { template: template, type: templateType };
};

const domoColor2code = (color: Element): string => {
  const red = color.getElementsByTagName("R")[0]?.textContent;
  const green = color.getElementsByTagName("G")[0]?.textContent;
  const blue = color.getElementsByTagName("B")[0]?.textContent;
  const r = Math.round(Number(red) || 0)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(Number(green) || 0)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(Number(blue) || 0)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
};

const domoLines2content = (
  lines: Element[],
  width: number,
  template: TLayerTemplate
): string[] => {
  if (lines.length === 0) {
    return Array(template.height).fill("") as string[];
  }
  const paddingStr = (() => {
    const spacerWidth = Math.floor(template.width - width);
    if (spacerWidth < 1) {
      return "";
    }
    let paddingStr = "x".repeat(spacerWidth + 2);
    paddingStr = paddingStr.replace(/xx/g, " ");
    paddingStr = paddingStr.replace(/x/g, " ");
    return paddingStr;
  })();
  return lines.map((line) => {
    if (line.textContent) {
      if (line.textContent.trim() !== "") {
        console.log(`${paddingStr}${line.textContent}`);
        return `${paddingStr}${line.textContent}`;
      }
    }
    return "";
  });
};

/**
 * どーもさんツールのXMLからダンスクJSONに変換する
 * @pram xml どーもさんツールのXML(string)
 */
const domo2dansa = (xml: string): TLayer[] => {
  const parser = new DOMParser();
  const xmlData = parser.parseFromString(xml, "application/xml");
  const comments = Array.from(xmlData.getElementsByTagName("DataCommentItem"));
  const layers: TLayer[] = [];
  for (const comment of comments) {
    const result = getTemplateByDomoMode(
      comment.getElementsByTagName("Mode")[0]?.textContent ?? ""
    );
    if (!result) continue;
    const { template, type } = result;
    const templateCommentSize = template.size[0];
    const lines = Array.from(
      comment
        .getElementsByTagName("Lines")[0]
        ?.getElementsByTagName("string") ?? []
    );
    const width =
      Number(comment.getElementsByTagName("Width")[0]?.textContent) ||
      undefined;
    const color = comment.getElementsByTagName("Color")[0];
    const pos = comment.getElementsByTagName("Pos")[0]?.textContent;
    if (
      !templateCommentSize ||
      !color ||
      !NiconiComments.typeGuard.comment.loc(pos) ||
      !width
    )
      continue;
    const content: TLayerComment = {
      font: templateCommentSize.font,
      line: templateCommentSize.line,
      lineCount: templateCommentSize.lineCount,
      content: domoLines2content(lines, width, template),
    };
    const _layer: TLayer = {
      ...template,
      type: type,
      font: "gothic",
      visible: true,
      selected: false,
      color: domoColor2code(color),
      content: [content],
      layerId: uuid(),
      pos: pos,
    };
    layers.push(_layer);
  }
  return layers;
};

export { domo2dansa };
