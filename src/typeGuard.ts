const typeGuard = {
  owner: {
    comment: (i: unknown): i is ownerComment =>
      typeVerify(i, ["time", "command", "comment"]),
    comments: (i: unknown): i is ownerComment[] => {
      if (!Array.isArray(i)) return false;
      for (const item of i) {
        if (!typeGuard.owner.comment(item)) return false;
      }
      return true;
    },
  },
  messageEvent: {
    colorClick: (i: unknown): i is messageColorClickEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageColorClickEvent).type === "color_click",
    timeSeek: (i: unknown): i is messageTimeSeekEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekEvent).type === "time_seek",
    timeSeekInt: (i: unknown): i is messageTimeSeekIntEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekIntEvent).type === "time_seek_int",
    timeSeekPl: (i: unknown): i is messageTimeSeekPlEvent =>
      typeof i === "object" &&
      i !== null &&
      (i as messageTimeSeekPlEvent).type === "time_seek_pl",
  },
};
const typeVerify = (item: unknown, keys: string[]): boolean => {
  if (typeof item !== "object" || item === null) return false;
  for (const key of keys) {
    if ((item as { [key: string]: string })[key] === undefined) return false;
  }
  return true;
};
export default typeGuard;
