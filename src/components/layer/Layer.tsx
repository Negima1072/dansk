import styled from "styled-components";
import React, { useContext, useEffect, useRef } from "react";
import { layer } from "@/@types/types";
import Styles from "./Layer.module.scss";
import { layerContext } from "@/components/LayerContext";
import layerManager from "@/libraries/layerManager";
import layerUtil from "@/libraries/layerUtil";

type LayerProps = {
  id: number;
  data: layer;
};
type LayerBoxProps = { top: number; left: number; textColor: string };
const LayerBox = styled.div<LayerBoxProps>`
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  color: ${(props) => props.textColor};
`;

/**
 * レイヤー
 * @param props
 * @constructor
 */
const Layer = (props: LayerProps): JSX.Element => {
  const { layerData, setLayerData } = useContext(layerContext),
    layerElement = useRef<HTMLDivElement>(null),
    currentLayer = useRef<layer>();
  const onchange = (layer: layer) => {
    if (!layerData || !setLayerData) return;
    layerData[props.id] = layer;
    currentLayer.current = layer;
    console.log(layer.content);
    setLayerData([...layerData]);
  };
  useEffect(() => {
    if (
      !layerElement.current ||
      (currentLayer.current !== undefined &&
        layerUtil.isEqual(currentLayer.current, props.data))
    )
      return;
    console.log(props.data.content);
    layerManager(props.data, onchange, layerElement.current);
  }, [layerElement, props.data]);
  /*const onLayerChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event)
    if (!layerData || !setLayerData) return;
    const groupKey = caret.getFocusedElement()?.parentElement?.classList[0]?.match(/^group:(\d+)$/);
    let currentValue = (event.target as HTMLDivElement).innerText.split(/\r\n|\r|\n/);
    console.log(groupKey,caret.getFocusedElement())
    if (!groupKey||!groupKey[1])return;
    const currentGroup = layerData[props.id]?.content[Number(groupKey[1])];
    console.log(currentGroup)
    if (!currentGroup)return;
    console.log(event.currentTarget.innerText,JSON.stringify(currentValue));
    if (currentValue.length > currentGroup.lineCount) {
      currentValue[currentGroup.lineCount - 1] = currentValue
        .slice(currentGroup.lineCount - 1)
        .join(" ");
      currentValue.splice(currentGroup.lineCount);
    }
    currentGroup.content = currentValue;
    console.log(currentValue,currentGroup);
    setLayerData([...layerData]);
    /*const [layerKey, groupKey]: string[] = (
      event.currentTarget.classList[0] || "0-0"
    ).split("-");
    const layer = layerData[props.id];
    if (!layer) return;
    const group = layer.content[Number(layerKey)];
    if (!group) return;
    group.content[Number(groupKey)] = event.target.value;
    setLayerData([...layerData]);
  };
  const onLayerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    return;
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(caret.get(event.target as HTMLElement));
      (
        ((event.target as HTMLDivElement).nextElementSibling ||
          (event.target as HTMLDivElement).parentElement?.nextElementSibling
            ?.firstElementChild) as HTMLDivElement
      )?.focus();
    } else if (
      event.key === "Backspace" &&
      (event.target as HTMLDivElement).innerText === ""
    ) {
      event.preventDefault();
      const previousElement = ((event.target as HTMLDivElement)
        .previousElementSibling ||
        (event.target as HTMLDivElement).parentElement?.previousElementSibling
          ?.lastElementChild) as HTMLDivElement;
      if (!previousElement) return;
      previousElement.focus();
      caret.set(previousElement, previousElement.innerText.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const previousElement = ((event.target as HTMLDivElement)
        .previousElementSibling ||
        (event.target as HTMLDivElement).parentElement?.previousElementSibling
          ?.lastElementChild) as HTMLDivElement;
      if (!previousElement) return;
      const pos = caret.get(event.target as HTMLElement);
      previousElement.focus();
      caret.set(previousElement, pos);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextElement = ((event.target as HTMLDivElement)
        .nextElementSibling ||
        (event.target as HTMLDivElement).parentElement?.nextElementSibling
          ?.firstElementChild) as HTMLDivElement;
      if (!nextElement) return;
      const pos = caret.get(event.target as HTMLElement);
      nextElement.focus();
      caret.set(nextElement, pos);
    } else {
    }
  };
  const onLayerPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!layerData || !setLayerData) return;
    let layerString = layerUtil.getLayerString(props.data);
    const pastedString = event.clipboardData.getData("text"),
      pastedStringArray = pastedString.split(/\r\n|\r|\n/),
      pastedStringLine = pastedStringArray.length,
      pastedStringLastLine = pastedStringArray[pastedStringLine - 1]!,
      [layerId, groupId]: string[] = (
        event.currentTarget.classList[0] || "0-0"
      ).split("-");
    if (!layerId || !groupId) return;
    let lineIndex = layerUtil.getLineNumber(props.data, layerId, groupId);
    const pos = caret.get(event.target as HTMLElement),
      content = layerString[lineIndex];
    if (content === undefined) return;
    layerString[lineIndex] = `${content.slice(
      0,
      pos
    )}${pastedString}${content.slice(pos)}`;
    console.log(pos, layerString[lineIndex]);
    layerString = layerString.join("\n").split("\n");
    lineIndex += pastedStringLine - 1;
    if (lineIndex >= props.data.height) lineIndex = props.data.height - 1;
    if (layerString.length > props.data.height) {
      layerString[props.data.height - 1] = layerString
        .slice(props.data.height - 1)
        .join(" ");
      layerString.splice(props.data.height);
    }
    let count = 0;
    for (const group of layerData[props.id]!.content) {
      group.content = group.content.map(() => {
        return layerString[count++]!.replace(/\r\n|\n|\r/, "");
      });
    }
    setLayerData([...layerData]);
    if (!layerRef.current) return;
    let focusElement = layerRef.current.firstElementChild!
      .firstElementChild as HTMLDivElement;
    for (let i = 0; i < lineIndex; i++) {
      focusElement = (focusElement.nextElementSibling ||
        focusElement.parentElement?.nextElementSibling
          ?.firstElementChild) as HTMLDivElement;
    }
    focusElement.focus();
    if (pastedStringLine === 1) {
      caret.set(focusElement, pos + pastedString.length);
    } else {
      caret.set(focusElement, pastedStringLastLine.length);
    }
  };*/
  return (
    <LayerBox
      className={`${Styles.layer} ${Styles[props.data.font]} ${
        props.data.selected ? Styles.active : ""
      } ${props.data.visible ? "" : Styles.invisible}`}
      top={props.data.top[props.data.pos]}
      left={props.data.left}
      textColor={props.data.color}
      contentEditable={props.data.selected ? "true" : "false"}
      ref={layerElement}
      /*onKeyDown={onLayerKeyDown}
      onPaste={onLayerPaste}*/
      spellCheck={"false"}
    />
  );
};
export default Layer;
