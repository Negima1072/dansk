import { layer } from "@/@types/types";
import Styles from "./layerManager.module.scss";

/**
 * レイヤーとイベントハンドラの管理
 * @param data
 * @param onChange
 * @param targetElement
 */
const layerManager = (
  data: layer,
  onChange: (layer: layer) => void,
  targetElement: HTMLDivElement
) => {
  /**
   * 変更の際に勝手に生えたdivを消したり消えたdivを生やしたり
   * 変更があった際はコールバック(onChange)を呼ぶ
   * @param _ {Event} onInputEvent
   */
  const update = (_?: Event): void => {
    const strings = getInnerText(targetElement, data.height);
    adjustChildren(targetElement, data.height);
    const groupElements = Array.from(
      targetElement.children
    ) as HTMLDivElement[];
    let isChanged = false,
      index = 0;
    data.content.forEach((group) => {
      group.content.forEach((item, itemIndex) => {
        const itemElement = groupElements[index];
        if (!itemElement) return;
        itemElement.classList.add(Styles.danskLayerItem || "_");
        itemElement.style.lineHeight = `${group.line}px`;
        itemElement.style.height = `${group.line}px`;
        itemElement.style.fontSize = `${group.font}px`;

        if (group.lineCount - 1 === itemIndex && group.height) {
          itemElement.style.marginBottom = `${
            group.height - group.line * group.lineCount
          }px`;
        } else {
          itemElement.style.margin = "0";
        }
        if (itemElement.innerHTML === "") {
          itemElement.innerHTML = "<br>";
        }
        if (itemElement.innerText !== `${strings[index]}\n`) {
          itemElement.innerText = `${strings[index]}\n`;
        }
        if (item !== strings[index]) {
          group.content[itemIndex] = strings[index] as string;
          isChanged = true;
        }
        index++;
      });
    });
    if (isChanged) {
      onChange(data);
    }
    return;
  };
  update(undefined);
  targetElement.oninput = update;
};

/**
 * content editable用に行単位でdivを生やす
 * 多かったら減らす
 * @param targetElement {HTMLDivElement} 親要素
 * @param length {number} 子要素の数
 */
const adjustChildren = (targetElement: HTMLDivElement, length: number) => {
  for (const element of Array.from(targetElement.childNodes)) {
    if (element.nodeName !== "DIV") {
      element.remove();
    }
  }
  while (targetElement.children.length < length) {
    targetElement.appendChild(document.createElement("div"));
  }
  while (targetElement.children.length > length) {
    targetElement.lastElementChild?.remove();
  }
};

/**
 * Element.innerTextのラッパー的なもの
 * 行数の調整もする
 * @param targetElement {HTMLDivElement} 親要素
 * @param length {number} 子要素の数
 */
const getInnerText = (
  targetElement: HTMLDivElement,
  length: number
): string[] => {
  const strings: string[] = [];
  for (const itemElement of Array.from(
    targetElement.children
  ) as HTMLDivElement[]) {
    strings.push(
      ...itemElement.innerText.replace(/\n$/, "").split(/\r\n|\r|\n/)
    );
  }
  while (strings.length < length) {
    strings.push("");
  }
  if (strings.length > length) {
    strings[length - 1] = strings.slice(length - 1).join("");
    strings.splice(length);
  }
  return strings;
};
export default layerManager;
