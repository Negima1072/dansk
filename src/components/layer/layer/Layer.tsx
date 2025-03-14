import { useAtom } from "jotai";
import { type ChangeEvent, useRef } from "react";

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

/**
 * レイヤー
 * id: layerDataのインデックス
 * data: レイヤーデータ
 * @param props
 * @constructor
 */
export const Layer = (props: LayerProps) => {
  const [layerData, setLayerData] = useAtom(layerAtom);
  const [optionData] = useAtom(optionAtom);
  const layerElement = useRef<HTMLDivElement>(null);
  const currentLayer = useRef<TLayer>(undefined);
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
      <div
        className={`${Styles.layer} ${
          props.data.selected ? Styles.active : ""
        } ${props.data.visible ? "" : Styles.invisible} ${
          optionData?.grid && grids[props.data.value] ? Styles.grid : ""
        } ${
          props.data.selected &&
          Storage.get("options_showSelectedLayerOnTop") === "true" &&
          Styles.showOnTop
        }`}
        style={{
          top: `${props.data.top[props.data.pos]}px`,
          left: `${props.data.left}px`,
          color: props.data.color,
          width: `${props.data.areaWidth}px`,
          transform: `scale(${props.data.scale.x}, ${props.data.scale.y})`,
          opacity: props.data.visible
            ? ((props.data.live ? 0.5 : 1) * (props.data.transparency ?? 100)) /
              100
            : 0,
        }}
        ref={layerElement}
        spellCheck={"false"}
      >
        {props.data.content.map((value, index) => {
          return (
            <textarea
              style={{
                height: `${value.height || value.line * value.lineCount}px`,
                lineHeight: `${value.line}px`,
                fontWeight: getFont(props.data.font).weight,
                fontFamily: getFont(props.data.font).font,
                fontSize: `${value.font}px`,
              }}
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
      </div>
      {props.data.selected && props.data.visible && (
        <div
          className={Styles.outline}
          style={{
            top: `${props.data.top[props.data.pos]}px`,
            left: `${props.data.left}px`,
            color: props.data.color,
            width: `${props.data.areaWidth}px`,
            transform: `scale(${props.data.scale.x}, ${props.data.scale.y})`,
          }}
        >
          {props.data.content.map((value, index) => {
            return (
              <div
                style={{
                  height: `${value.height || value.line * value.lineCount}px`,
                }}
                key={`layerOutline${props.data.layerId}-group${index}`}
              >
                {[...(Array(value.lineCount) as undefined[])].map(
                  (_, index_) => {
                    return (
                      <div
                        style={{
                          height: `${value.line}px`,
                        }}
                        key={`layerOutline${props.data.layerId}-group${index}-line${index_}`}
                      />
                    );
                  },
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
