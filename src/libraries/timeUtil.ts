const str2time = (date: string): number | undefined => {
  const match = date.match(/^([+-])?(?:(\d+):)?(\d+)(?:\.(\d+))?$/);
  if (match) {
    let time = 0;
    if (match[2] !== undefined) time += Number(match[2]) * 60;
    if (match[3] !== undefined) time += Number(match[3]);
    if (match[4] !== undefined)
      time += Number(match[4]) / Math.pow(10, match[4].length);
    if (match[1] === "-") time *= -1;
    return time;
  } else {
    return undefined;
  }
};
const time2str = (time: number): string => {
  return `${("0" + String(Math.floor((time % 3600) / 60))).slice(-2)}:${(
    "0" + String((time % 60).toFixed(2))
  ).slice(-5)}`;
};
export { str2time, time2str };
