const str2time = (date: string): number | undefined => {
  const match = date.match(/^([+-])?(?:(\d+):)?(\d+)(?:\.(\d+))?$/);
  if (match) {
    let time = 0;
    if (match[2] !== undefined) time += Number(match[2]) * 60;
    if (match[3] !== undefined) time += Number(match[3]);
    if (match[4] !== undefined)
      time += Number(match[3]) / Math.pow(10, match[4].length);
    if (match[1] === "-") time *= -1;
    return time;
  } else {
    return undefined;
  }
};
export default str2time;
