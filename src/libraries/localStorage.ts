import type { TLocalStorageKeys } from "@/@types/types";

const STORAGE_PREFIX = "DanSc";
import { defaultValue } from "@/libraries/localStorage.defaultValue";
/**
 * LocalStorage読み書き用ラッパー
 */
const Storage = {
  get: (key: TLocalStorageKeys): string => {
    const value = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
    if (value === null) return defaultValue[key].defaultValue;
    return value;
  },
  set: (key: TLocalStorageKeys, data: string | object): void => {
    if (typeof data == "object") {
      data = JSON.stringify(data);
    }
    localStorage.setItem(`${STORAGE_PREFIX}_${key}`, data);
  },
  remove: (key: TLocalStorageKeys): void => {
    localStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
  },
};
export { Storage };
