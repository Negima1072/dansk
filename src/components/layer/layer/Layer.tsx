import { useAtom } from "jotai";
import type { ChangeEvent, FC } from "react";
import { useRef } from "react";
import styled from "styled-components";

import { layerAtom, optionAtom } from "@/libraries/atoms";
import { getFont } from "@/libraries/font";
import { grids } from "@/libraries/grids";
import { Storage } from "@/libraries/localStorage";
import type { TGridPosBlob, TLayer } from "@/types/layer";
import { replaceCharList } from "../layerManager/layerManager.replaceCharList";

import Styles from "./Layer.module.scss";

type LayerProps = {
  data: TLayer;
};
type LayerBoxProps = {
  top: number;
  left: number;
  textColor: string;
  _width: number;
  _scale: { x: number; y: number };
};
const LayerBox = styled.div<LayerBoxProps>`
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  color: ${(props) => props.textColor};
  width: ${(props) => props._width}px;
  transform: scale(${(p) => p._scale.x}, ${(p) => p._scale.y});
`;
type LayerItemProps = { _height: number | undefined };
const LayerItem = styled.div<LayerItemProps>`
  height: ${(props) => (props._height ? `${props._height}px` : "unset")};
`;
type LayerInputProps = {
  _height: number | undefined;
  _lineHeight: number;
  _fontSize: number;
  _fontFamily: "defont" | "mincho" | "gothic";
};
const LayerInput = styled.textarea<LayerInputProps>`
  height: ${(props) => (props._height ? `${props._height}px` : "unset")};
  line-height: ${(props) => props._lineHeight}px;
  font-weight: ${(props) => getFont(props._fontFamily).weight};
  font-family: ${(props) => getFont(props._fontFamily).font};
  font-size: ${(props) => props._fontSize}px;
`;

/**
 * レイヤー
 * id: layerDataのインデックス
 * data: レイヤーデータ
 * @param props
 * @constructor
 */
const Layer = (props: LayerProps) => {
  const [layerData, setLayerData] = useAtom(layerAtom);
  const [optionData] = useAtom(optionAtom);
  const layerElement = useRef<HTMLDivElement>(null);
  const currentLayer = useRef<TLayer>();
  const onchange = (layer: TLayer) => {
    if (!layerData || !setLayerData) return;
    for (let i = 0; i < layerData.length; i++) {
      if (layerData[i]?.layerId === layer.layerId) layerData[i] = layer;
    }
    currentLayer.current = layer;
    setLayerData([...layerData]);
  };
  const updateData = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const line = props.data.content[index];
    const char = replaceCharList[(e.nativeEvent as InputEvent).data || ""];
    if (char && optionData?.replace) {
      const t = e.target as HTMLTextAreaElement;
      const i = t.selectionStart;
      t.value = t.value.slice(0, i - 1) + char + t.value.slice(i);
      t.setSelectionRange(i, i);
    }
    const value = e.target.value.split("\n");
    if (!line) return;
    if (
      value.length > line.lineCount ||
      value.reduce(
        (pv, val) => pv + Number(!!val.match(/[\u00A0\u0020]|\u3033\u3035/g)),
        0,
      ) > 0
    ) {
      e.target.style.background = "rgba(255,0,0,0.3)";
    } else {
      e.target.style.background = "none";
    }
    line.content = value;
    onchange(props.data);
  };
  const gridImage = () => {
    if (optionData?.grid && props.data.selected && props.data.visible) {
      if (grids[props.data.id] !== undefined) {
        const grid = grids[props.data.id] as TGridPosBlob;
        if (grid.immutable) {
          return <img src={grid.any} alt="" />;
        }
        if (grid[props.data.pos] === undefined) {
          return <></>;
        }
        return <img src={grid[props.data.pos]} alt="" />;
      }
    }
    return <></>;
  };

  return (
    <>
      {gridImage()}
      <LayerBox
        className={`${Styles.layer} ${
          props.data.selected ? Styles.active : ""
        } ${props.data.visible ? "" : Styles.invisible} ${
          optionData?.grid && grids[props.data.value] ? Styles.grid : ""
        } ${
          props.data.selected &&
          Storage.get("options_showSelectedLayerOnTop") === "true" &&
          Styles.showOnTop
        }`}
        top={props.data.top[props.data.pos]}
        left={props.data.left}
        textColor={props.data.color}
        _width={props.data.areaWidth}
        _scale={props.data.scale}
        ref={layerElement}
        spellCheck={"false"}
      >
        {props.data.content.map((value, index) => {
          return (
            <LayerInput
              _height={value.height || value.line * value.lineCount}
              _lineHeight={value.line}
              _fontSize={value.font}
              _fontFamily={props.data.font}
              key={`layer${props.data.layerId}-group${index}`}
              className={Styles.textarea}
              value={value.content.join("\n")}
              onChange={(e) => updateData(e, index)}
              spellCheck={false}
              wrap={"off"}
              onScroll={(e) => (e.target as HTMLTextAreaElement).scroll(0, 0)}
            />
          );
        })}
      </LayerBox>
      {props.data.selected && props.data.visible && (
        <LayerBox
          className={Styles.outline}
          top={props.data.top[props.data.pos]}
          left={props.data.left}
          textColor={props.data.color}
          _width={props.data.areaWidth}
          _scale={props.data.scale}
        >
          {props.data.content.map((value, index) => {
            return (
              <LayerItem
                _height={value.height || value.line * value.lineCount}
                key={`layerOutline${props.data.layerId}-group${index}`}
              >
                {[...(Array(value.lineCount) as undefined[])].map(
                  (_, index_) => {
                    return (
                      <LayerItem
                        _height={value.line}
                        key={`layerOutline${props.data.layerId}-group${index}-line${index_}`}
                      />
                    );
                  },
                )}
              </LayerItem>
            );
          })}
        </LayerBox>
      )}
    </>
  );
};
export { Layer };
