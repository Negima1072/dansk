/**
 * そのまま
 * @param time {number} ms
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
