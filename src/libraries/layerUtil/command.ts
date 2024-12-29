import { Storage } from "@/libraries/localStorage";
import type { TMeasuredLayer } from "@/types/layer";

/**
 * コマンドの作成
 * @param layer
 */
export const command2str = (layer: TMeasuredLayer) => {
  const commands = [...layer.commands],
    pos = layer.pos,
    font = layer.font;
  let color = layer.color;
  if (Storage.get("options_exportLayerName") === "true")
    commands.push("layerName");
  if (Storage.get("options_useCA") === "true") commands.push("ca");
  if (Storage.get("options_usePat") === "true") commands.push("patissier");
  if (Storage.get("options_useOriginal") === "true") commands.push("original");
  commands.push("position");
  commands.push("font");
  commands.push("color");
  const commandsOrder = Storage.get("options_commandOrder").split("|");
  const getIndex = (input: string): number => {
    if (input.match(/big|small|medium/)) return commandsOrder.indexOf("size");
    const index = commandsOrder.indexOf(input);
    if (index === -1) return commandsOrder.indexOf("original");
    return index;
  };
  commands.sort((a, b) => {
    const a_ = getIndex(a),
      b_ = getIndex(b);
    if (a_ < b_) return -1;
    if (a_ > b_) return 1;
    return 0;
  });
  if (color == "#000000" && Storage.get("options_lineMode") === "true") {
    color = "#010101";
  }
  let layerName = layer.text.replace(/\s/g, "-");
  if (
    layerName.match(
      /ue|shita|gothic|mincho|big|small|defont|medium|ender|full|ca|pattisier|_live|invisible/,
    )
  ) {
    layerName += "_";
  }
  return `[${commands
    .join(" ")
    .replace(/layerName/g, layerName)
    .replace(/position/g, pos)
    .replace(/font/g, font)
    .replace(/color/g, color)
    .replace(/original/g, Storage.get("options_useOriginal_text"))}]`;
};
