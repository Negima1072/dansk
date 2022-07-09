import styled from "styled-components";
import React, { useContext } from "react";
import { layer } from "@/@types/types";
import Styles from "./Layer.module.scss";
import { layerContext } from "@/components/LayerContext";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

type LayerProps = {
  id: number;
  data: layer;
  active?: boolean;
};

type LayerBoxProps = { top: number; left: number };
const LayerBox = styled.div<LayerBoxProps>`
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

type LayerItemProps = {
  font: number;
  lineHeight: number;
  _height: number | undefined;
  scaleX: number;
  scaleY: number;
};
const LayerItem = styled.div<LayerItemProps>`
  font-size: ${(props) => props.font}px;
  line-height: ${(props) => props.lineHeight}px;
  height: ${(props) => (props._height ? props._height + "px" : "unset")};
  transform: scale(${(props) => props.scaleX}, ${(props) => props.scaleY});
`;

const Layer = (props: LayerProps): JSX.Element => {
  const { layerData, setLayerData } = useContext(layerContext);
  const onLayerChange = (event: ContentEditableEvent) => {
    if (!layerData || !setLayerData) return;
    const tmpLayerData = layerData,
      [layerKey, groupKey]: string[] = (
        event.currentTarget.classList[0] || "0-0"
      ).split("-");
    const layer = tmpLayerData[props.id];
    if (!layer) return;
    const group = layer.content[Number(layerKey)];
    if (!group) return;
    group.content[Number(groupKey)] = event.target.value;
    setLayerData([...tmpLayerData]);
  };
  const onLayerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.nativeEvent.isComposing) return;
    switch (event.key) {
      case "Enter":
      case "ArrowDown":
        event.preventDefault();
        (
          ((event.target as HTMLDivElement).nextElementSibling ||
            (event.target as HTMLDivElement).parentElement?.nextElementSibling
              ?.firstElementChild) as HTMLDivElement
        )?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        (
          ((event.target as HTMLDivElement).previousElementSibling ||
            (event.target as HTMLDivElement).parentElement
              ?.previousElementSibling?.lastElementChild) as HTMLDivElement
        )?.focus();
        break;
    }
  };
  return (
    <LayerBox
      className={`${Styles.layer} ${Styles[props.data.font]} ${
        props.data.selected ? Styles.active : ""
      } ${props.data.visible ? "" : Styles.invisible}`}
      left={props.data.left}
      top={props.data.top[props.data.pos]}
    >
      {props.data.content.map((item, key) => {
        return (
          <LayerItem
            className={Styles.item}
            key={`LayerItem${key}`}
            font={item.font}
            lineHeight={item.line}
            _height={item.height}
            scaleX={props.data.scale.x}
            scaleY={props.data.scale.y}
          >
            {item.content.map((line, lineId) => {
              return (
                <ContentEditable
                  key={`LayerItem${key}-${lineId}`}
                  html={line}
                  onChange={onLayerChange}
                  className={`${key}-${lineId}`}
                  onKeyDown={onLayerKeyDown}
                  spellCheck={"false"}
                />
              );
            })}
          </LayerItem>
        );
      })}
    </LayerBox>
  );
};
export default Layer;
