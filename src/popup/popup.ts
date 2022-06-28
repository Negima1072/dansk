import localStorage from "@/libraries/localStorage";
import typeGuard from "@/typeGuard";

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

  /**
   * inputFormat型のinputをoutputFormat型に変換して返す
   * @param inputFormat
   * @param outputFormat
   * @param input
   */
  const convertText = (
    inputFormat: string,
    outputFormat: string,
    input: string
  ) => {
    if (inputFormat == outputFormat) return input;
    let dansk = "";
    switch (inputFormat) {
      case "domo":
        dansk = convertDomoToDansk(input);
        break;
      case "tokome":
        dansk = convertTokomeToDansk(input);
    }
    switch (outputFormat) {
      case "dansk":
        return dansk;
      case "domo":
        return convertDanskToDomo(dansk);
      case "tokome":
        return convertDanskToTokome(dansk);
    }
    return "";
  };
  const convertDomoToDansk = (input: string): string => {
    input = input
      .replace(/\r\n|\r/g, "\n")
      .replace(/\n/g, "\n<br>")
      .replace(/\t/g, "[tb]");
    const lines: string[] = input.split("\n"),
      result: string[] = [];
    let commandCount = 0;
    for (let line of lines) {
      if (line === undefined) continue;
      if (commandCount == -1) {
        line = line.replace("<br>", "");
      }
      commandCount = (
        line.match(
          /ue|shita|gothic|mincho|big|small|defont|medium|ender|full|ca|pattisier/
        ) || []
      ).length;
      if (commandCount >= 2) {
        result.push(`\n[${line.replace("<br>", "")}]`);
        commandCount = -1;
      } else result.push(line);
    }
    return result.join("").slice(1);
  };

  /**
   * Dansk -> Domo
   * @param input {string} dansk
   * @return {string} domo
   */
  const convertDanskToDomo = (input: string): string => {
    input = input
      .replace(/\[tb]/g, "\t")
      .replace(/\[03]/g, "　")
      .replace(/\[0A]/g, "");
    const lines: string[] = input.split("\n"),
      result: string[] = [];
    let lastCommand = "";
    for (const line of lines) {
      let content = "",
        command = "";
      if (line === undefined || line === "") continue;
      const match = line.match(/(?:\[(.*)])?(.*)/);
      if (match === null || match[1] === undefined) {
        command = lastCommand;
        content = line;
      } else {
        if (match[1] === undefined || match[2] === undefined) continue;
        content = match[2];
        if (match[1].match(/^03|tb|0A$/)) {
          command = line;
        } else {
          lastCommand = match[1];
        }
      }
      result.push(`${command}\n${content.replace(/<br>/g, "\n")}`);
    }
    return result.join("\n");
  };

  /**
   * Tokome -> Dansk
   * @param input{string} tokome
   * @return {string} dansk
   */
  const convertTokomeToDansk = (input: string): string => {
    const data: ownerComment[] = JSON.parse(input) as ownerComment[];
    if (!typeGuard.owner.comments(data)) return "";
    const result = [];
    for (const line of data) {
      result.push(
        `[${line.command}]${line.comment}`
          .replace(/\n/g, "<br>")
          .replace(/\t/g, "[tb]")
      );
    }
    return result.join("\n");
  };

  /**
   * timestamp -> date
   * @param time{number} time
   * @return {string} date
   */
  const covertTimeIntToString = (time: number): string => {
    const a = ("0" + Math.floor(time / 6000).toString()).slice(-2);
    const b = ("0" + Math.floor((time % 6000) / 100).toString()).slice(-2);
    const d = ("0" + Math.floor((time % 6000) % 100).toString()).slice(-2);
    return a + ":" + b + "." + d;
  };

  /**
   * Dansk -> Tokome
   * @param input {string} dansk
   * @return {string} tokome
   */
  const convertDanskToTokome = (input: string): string => {
    input = input
      .replace(/\[tb]/g, "\t")
      .replace(/\[03]/g, "　")
      .replace(/\[0A]/, "");
    const lines = input.split("\n"),
      result = [];
    let lastCommand = "";
    let baseTimeMs = 0;
    for (let line of lines) {
      const match = line.match(/\[(.*)]/);
      if (match !== null && match[0] !== undefined && match[1] !== undefined) {
        const tmMatch = match[1].match(/tm(\d+)/);
        if (tmMatch !== null && tmMatch[1] !== undefined) {
          baseTimeMs += parseInt(tmMatch[1]);
          line = line.replace(match[0], "");
        }
      }
      const comment = {
        time: covertTimeIntToString(baseTimeMs / 10),
        command: "",
        comment: "",
      };
      if (line == "") continue;
      line = line.replace(/<br>/g, "\n");
      if (match === null || match[0] === undefined || match[1] === undefined) {
        comment.command = lastCommand;
        comment.comment = line;
      } else {
        if (match[1].match(/^03|tb|0A$/)) {
          comment.comment = line;
        } else {
          comment.comment = line.slice(match[0].length);
          lastCommand = match[1];
        }
        comment.command = lastCommand;
      }
      result.push(comment);
    }
    return JSON.stringify(result, null, 2);
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
      beforeOptions.value,
      afterOptions.value,
      beforeTextArea.value
    );
    save();
  };

  repairButton.onclick = () => {
    beforeTextArea.value = convertText(
      afterOptions.value,
      beforeOptions.value,
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
