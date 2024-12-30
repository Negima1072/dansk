import { convertText } from "@/libraries/convert";
import { Storage } from "@/libraries/localStorage";
import type { TConvertFormat } from "@/types/types";

window.addEventListener("load", () => {
  const beforeTextArea = document.getElementById("before") as HTMLInputElement;
  const beforeOptions = document.getElementById(
    "before_select",
  ) as HTMLSelectElement;
  const afterTextArea = document.getElementById("after") as HTMLInputElement;
  const afterOptions = document.getElementById(
    "after_select",
  ) as HTMLSelectElement;
  const copyButton = document.getElementById("copyButton") as HTMLInputElement;
  const clearButton = document.getElementById("clear") as HTMLInputElement;
  const replaceButton = document.getElementById("replace") as HTMLInputElement;
  const repairButton = document.getElementById("repair") as HTMLInputElement;

  /**
   * localstorageにデータを保管する
   * -> cookieから移行
   */
  const save = () => {
    Storage.set("ppConvertBefore", beforeTextArea.value);
    Storage.set("ppConvertBeforeType", beforeOptions.value);
    Storage.set("ppConvertAfter", afterTextArea.value);
    Storage.set("ppConvertAfterType", afterOptions.value);
  };

  beforeTextArea.value =
    getCookie("dnsk_pp_before") || Storage.get("ppConvertBefore") || "";
  beforeOptions.value =
    getCookie("dnsk_pp_before_type") ||
    Storage.get("ppConvertBeforeType") ||
    "domo";
  afterTextArea.value =
    getCookie("dnsk_pp_after") || Storage.get("ppConvertAfter") || "";
  afterOptions.value =
    getCookie("dnsk_pp_after_type") ||
    Storage.get("ppConvertAfterType") ||
    "dansk";
  save();

  copyButton.onclick = () => {
    navigator.clipboard
      .writeText(afterTextArea.value)
      .then(() => {
        alert("コピーしました。");
      })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  };

  clearButton.onclick = () => {
    beforeTextArea.value = "";
    afterTextArea.value = "";
    save();
  };

  replaceButton.onclick = () => {
    afterTextArea.value = convertText(
      beforeOptions.value as TConvertFormat,
      afterOptions.value as TConvertFormat,
      beforeTextArea.value,
    );
    save();
  };

  repairButton.onclick = () => {
    beforeTextArea.value = convertText(
      afterOptions.value as TConvertFormat,
      beforeOptions.value as TConvertFormat,
      afterTextArea.value,
    );
    save();
  };
});

/**
 * localStorage移行用
 * 値を読み取って該当cookieを削除
 * @param name
 */
const getCookie = (name: string): null | string => {
  let value = null;
  for (const v of Array.from(document.cookie.split("; "))) {
    if (name === v.split("=")[0]) {
      value = v.split("=")[1]?.replace(/\{break}/g, "\n");
    }
  }
  document.cookie = `${name}=; max-age=0`;
  return value;
};
