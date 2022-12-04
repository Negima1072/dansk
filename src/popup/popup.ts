import localStorage from "@/libraries/localStorage";
import { convertText } from "@/libraries/convert";
import { convertFormat } from "@/@types/types";

window.addEventListener("load", () => {
  const beforeTextArea = document.getElementById("before") as HTMLInputElement,
    beforeOptions = document.getElementById(
      "before_select"
    ) as HTMLSelectElement,
    afterTextArea = document.getElementById("after") as HTMLInputElement,
    afterOptions = document.getElementById("after_select") as HTMLSelectElement,
    copyButton = document.getElementById("copyButton") as HTMLInputElement,
    clearButton = document.getElementById("clear") as HTMLInputElement,
    replaceButton = document.getElementById("replace") as HTMLInputElement,
    repairButton = document.getElementById("repair") as HTMLInputElement;

  /**
   * localstorageにデータを保管する
   * -> cookieから移行
   */
  const save = () => {
    localStorage.set("ppConvertBefore", beforeTextArea.value);
    localStorage.set("ppConvertBeforeType", beforeOptions.value);
    localStorage.set("ppConvertAfter", afterTextArea.value);
    localStorage.set("ppConvertAfterType", afterOptions.value);
  };

  beforeTextArea.value =
    getCookie("dnsk_pp_before") || localStorage.get("ppConvertBefore") || "";
  beforeOptions.value =
    getCookie("dnsk_pp_before_type") ||
    localStorage.get("ppConvertBeforeType") ||
    "domo";
  afterTextArea.value =
    getCookie("dnsk_pp_after") || localStorage.get("ppConvertAfter") || "";
  afterOptions.value =
    getCookie("dnsk_pp_after_type") ||
    localStorage.get("ppConvertAfterType") ||
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
      beforeOptions.value as convertFormat,
      afterOptions.value as convertFormat,
      beforeTextArea.value
    );
    save();
  };

  repairButton.onclick = () => {
    beforeTextArea.value = convertText(
      afterOptions.value as convertFormat,
      beforeOptions.value as convertFormat,
      afterTextArea.value
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
  Array.from(document.cookie.split("; ")).forEach((v) => {
    if (name == v.split("=")[0])
      value = v.split("=")[1]?.replace(/\{break}/g, "\n");
  });
  document.cookie = `${name}=; max-age=0`;
  return value;
};
