import NiconiComments, { type FontItem } from "@xpadev-net/niconicomments";

NiconiComments.internal.definition.initConfig.initConfig();
const FONTS =
  NiconiComments.internal.definition.config.defaultConfig.fonts.html5;

export const getFont = (font: keyof typeof FONTS): FontItem => {
  return FONTS[font];
};
