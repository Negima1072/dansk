import { useAtom } from "jotai";
import { type ChangeEvent, useCallback } from "react";

import { Button } from "@/components/common/button/Button";
import { Slider } from "@/components/common/slider/Slider";
import { layerAtom } from "@/libraries/atoms";
import { typeGuard } from "@/libraries/typeGuard";

import { ColorPicker } from "../layerSelector/ColorPicker/ColorPicker";
import Styles from "./LayerEditor.module.scss";

/**
 * layerの一括編集
 * @constructor
 */
export const LayerEditor = () => {
  const [layerData, setLayerData] = useAtom(layerAtom);

  const color = layerData.reduce((pv, layer) => {
    if (layer.selected) {
      if (pv === "" || pv === layer.color) {
        return layer.color;
      }
      return "#000000";
    }
    return pv;
  }, "");
  const opacity =
    layerData.find((layer) => layer.selected && layer.opacity !== undefined)
      ?.opacity ?? 100;
  const changePos = useCallback((target: string) => {
    if (!typeGuard.trace.commentPos(target)) return;
    setLayerData((pv) =>
      pv.map((value) => {
        if (value.selected && value.posList.includes(target)) {
          value.pos = target;
        }
        return value;
      }),
    );
  }, []);
  const changeFont = useCallback((target: string) => {
    if (!typeGuard.trace.commentFont(target)) return;
    setLayerData((pv) =>
      pv.map((value) => {
        if (value.selected) {
          value.font = target;
        }
        return value;
      }),
    );
  }, []);
  const changeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLayerData((pv) =>
      pv.map((value) => {
        if (value.selected) {
          value.color = e.target.value;
        }
        return value;
      }),
    );
  }, []);
  const move = useCallback(
    (target: string) => {
      if (!target.match(/up|down/)) return;
      if (target === "up") {
        layerData.forEach((value, i) => {
          const lastValue = layerData[i - 1];
          if (value?.selected === true && lastValue)
            layerData.splice(i - 1, 2, value, lastValue);
        });
      } else {
        layerData.reverse().forEach((value, i) => {
          const lastValue = layerData[i - 1];
          if (value?.selected === true && lastValue)
            layerData.splice(i - 1, 2, value, lastValue);
        });
        layerData.reverse();
      }
      setLayerData([...layerData]);
    },
    [layerData],
  );
  const changeOpacity = useCallback((t: number) => {
    setLayerData((pv) =>
      pv.map((value) => {
        if (value.selected) {
          value.opacity = t;
        }
        return value;
      }),
    );
  }, []);
  return (
    <div className={Styles.table}>
      <div className={Styles.row}>
        <div className={Styles.block}>
          <Button click={changePos} text={"ue"} value={"ue"} />
          <Button click={changePos} text={"naka"} value={"naka"} />
          <Button click={changePos} text={"shita"} value={"shita"} />
        </div>
        <div className={Styles.block}>
          <Button click={changeFont} text={"mincho"} value={"mincho"} />
          <Button click={changeFont} text={"gothic"} value={"gothic"} />
        </div>
        <div className={Styles.block}>
          <div className={Styles.colorInputWrapper}>
            <ColorPicker
              color={color}
              onChange={changeColor}
              disabled={color === ""}
            />
          </div>
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.block}>
          <Button click={move} text={"上へ"} value={"up"} />
          <Button click={move} text={"下へ"} value={"down"} />
        </div>
        <div className={Styles.block}>
          <Slider change={changeOpacity} value={opacity} max={100} min={0} />
        </div>
      </div>
    </div>
  );
};
