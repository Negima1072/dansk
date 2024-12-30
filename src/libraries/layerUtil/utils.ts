export const rebuildSpaceWithCompat = (input: string) => {
  return rebuildSpace(input.replace(/[\u2001\u3000]/g, "\u2003"));
};

export const rebuildSpace = (input: string) => {
  return (
    input
      // biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
      .replace(/\u0009/g, "\u200A".repeat(24))
      .replace(/\u2003/g, "\u200A".repeat(12))
      .replace(/\u2002/g, "\u200A".repeat(6))
      .replace(/\u2004/g, "\u200A".repeat(4))
      .replace(/\u2005/g, "\u200A".repeat(3))
      .replace(/\u2006/g, "\u200A".repeat(2))

      .replace(/\u200A{12}/g, "\u2003")
      /**
       * u2004*2がu2002+u2006に変換されるのでそれを抑制
       */
      .replace(/\u200A{8}/g, "\u2004\u2004")
      .replace(/\u200A{6}/g, "\u2002")
      .replace(/\u200A{4}/g, "\u2004")
      .replace(/\u200A{3}/g, "\u2005")
      .replace(/\u200A{2}/g, "\u2006")
      .replace(/\u2003\u200A/g, "\u2002\u2004\u2005")
      .replace(/\u2002\u200A/g, "\u2004\u2005")
      .replace(/\u2004\u200A/g, "\u2005\u2006")
  );
};
