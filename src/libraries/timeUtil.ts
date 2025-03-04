/**
 * 文字列を秒数に変換
 * 厳密な数値のチェックは行っていないため、2分90秒とかの指定もできる
 * 変更したければmatch関数内のregex
 * @param date {string}
 */
export const str2time = (date: string): number | undefined => {
  const match = date.match(/^([+-])?(?:(\d+):)?(\d+)(?:\.(\d+))?$/);
  if (match) {
    let time = 0;
    if (match[2] !== undefined) time += Number(match[2]) * 60;
    if (match[3] !== undefined) time += Number(match[3]);
    if (match[4] !== undefined)
      time += Number(match[4]) / 10 ** match[4].length;
    if (match[1] === "-") time *= -1;
    return time;
  }
  return undefined;
};

/**
 * 秒数を文字列に
 * フォーマット：分：秒.小数点以下2桁
 * @param time
 */
export const time2str = (time: number): string => {
  return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    (time % 60).toFixed(2).padStart(5, "0"),
  )}`;
};
