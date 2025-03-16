import { Storage } from "@/libraries/localStorage";
import { typeGuard } from "@/libraries/typeGuard";
import type { TConvertFormat } from "@/types/types";

import { str2time, time2str } from "./timeUtil";

/**
 * inputFormat型のinputをoutputFormat型に変換して返す
 * @param inputFormat
 * @param outputFormat
 * @param input
 */
export const convertText = (
  inputFormat: TConvertFormat,
  outputFormat: TConvertFormat,
  input: string,
) => {
  if (inputFormat === outputFormat) return input;
  let dansk = "";
  switch (inputFormat) {
    case "domo":
      dansk = convertDomoToDansk(input);
      break;
    case "tokome":
      dansk = convertTokomeToDansk(input);
      break;
    case "dansk":
      dansk = input;
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
  const _input = input
    .replace(/\r\n|\r/g, "\n")
    .replace(/\n/g, "\n<br>")
    .replace(/\t/g, "[tb]");
  const lines: string[] = _input.split("\n");
  const result: string[] = [];
  let commandCount = 0;
  for (let line of lines) {
    if (line === undefined) continue;
    if (commandCount === -1) {
      line = line.replace("<br>", "");
    }
    commandCount = (
      line.match(
        /ue|shita|gothic|mincho|big|small|defont|medium|ender|full|ca|pattisier|_live/,
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
  const _input = input
    .replace(/\[A0]/gi, "\u00A0")
    .replace(/\[SP]/gi, "\u3000")
    .replace(/\[00]/gi, "\u2000")
    .replace(/\[01]/gi, "\u2001")
    .replace(/\[02]/gi, "\u2002")
    .replace(/\[03]/gi, "\u2003")
    .replace(/\[04]/gi, "\u2004")
    .replace(/\[05]/gi, "\u2005")
    .replace(/\[06]/gi, "\u2006")
    .replace(/\[0A]/gi, "\u200A")
    .replace(/\[0B]/gi, "\u200B")
    .replace(/\[TA?B]/gi, "\u0009");
  const lines: string[] = _input.split("\n");
  const result: string[] = [];
  let lastCommand = "";
  for (const line of lines) {
    let content = "";
    let command = "";
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
  const data = JSON.parse(input) as unknown;
  if (!typeGuard.owner.comments(data)) return "";
  const result: string[] = [];
  let lastCommand = "";
  let baseTime = 0;
  for (const line of data) {
    const time = str2time(line.time);
    result.push(
      `${time && time !== baseTime ? `[tm${time2str(time)}]` : ""}${lastCommand === line.command ? "" : `[${line.command}]`}${line.comment}`
        .replace(/\n/g, "<br>")
        .replace(/\t/g, "[tb]"),
    );
    lastCommand = line.command;
    if (time) baseTime = time;
  }
  return result.join("\n");
};

/**
 * Dansk -> Tokome
 * @param input {string} dansk
 * @return {string} tokome
 */
const convertDanskToTokome = (input: string): string => {
  const _input = input
    .replace(/\[A0]/gi, "\u00A0")
    .replace(/\[SP]/gi, "\u3000")
    .replace(/\[00]/gi, "\u2000")
    .replace(/\[01]/gi, "\u2001")
    .replace(/\[02]/gi, "\u2002")
    .replace(/\[03]/gi, "\u2003")
    .replace(/\[04]/gi, "\u2004")
    .replace(/\[05]/gi, "\u2005")
    .replace(/\[06]/gi, "\u2006")
    .replace(/\[0A]/gi, "\u200A")
    .replace(/\[0B]/gi, "\u200B")
    .replace(/\[TA?B]/gi, "\u0009");
  const lines = _input.split("\n");
  const result = [];
  let lastCommand = "";
  let baseTime = 0;
  for (let line of lines) {
    let match = line.match(/\[(.*?)\]/);
    if (match !== null && match[0] !== undefined && match[1] !== undefined) {
      const seekCommand = match[1].match(/tm(?:(\d+):)?(\d+)(?:\.(\d+))?/);
      if (seekCommand) {
        if (!seekCommand[1] && !seekCommand[3]) {
          baseTime +=
            Number(seekCommand[2]) /
            (Storage.get("options_useMs") === "true" ? 1000 : 100);
        } else {
          let currentTime = 0;
          if (seekCommand[1]) currentTime += Number(seekCommand[1]) * 60;
          if (seekCommand[2]) currentTime += Number(seekCommand[2]);
          if (seekCommand[3])
            currentTime += Number(seekCommand[3]) / 10 ** seekCommand[3].length;
          baseTime = currentTime;
        }
        line = line.replace(match[0], "");
      }
    }
    if (line === "") continue;
    match = line.match(/^(?:\[([^\]]+)])?(.*)/);
    if (!match || !match[2]) continue;
    let comment = match[2];
    if (match[1]) {
      lastCommand = match[1];
    }
    comment = comment.replace(/<BR>/gi, "\n");
    result.push({ time: time2str(baseTime), command: lastCommand, comment });
  }
  return JSON.stringify(result, null, 2);
};
