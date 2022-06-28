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
};
const typeVerify = (item: unknown, keys: string[]): boolean => {
  if (typeof item !== "object" || item === null) return false;
  for (const key of keys) {
    if ((item as { [key: string]: string })[key] === undefined) return false;
  }
  return true;
};
export default typeGuard;
