import React, { useCallback } from "react";
import Styles from "./LayerSelector.module.scss";
import { layer } from "@/@types/types";
import { ReactSortable } from "react-sortablejs";
import layerUtil from "@/libraries/layerUtil";
import icons from "@/components/layerSelector/icons";

type layerProps = {
  layer: layer[];
  setLayer: (layer: layer[]) => void;
};

const LayerSelector = (props: layerProps) => {
  const togglePos = useCallback(
      (key: number) => {
        let layer = props.layer;
        layer[key]!.pos = layerUtil.togglePos(layer[key]!.pos);
        props.setLayer([...layer]);
      },
      [props.layer]
    ),
    toggleFont = useCallback(
      (key: number) => {
        let layer = props.layer;
        layer[key]!.font = layerUtil.toggleFont(layer[key]!.font);
        props.setLayer([...layer]);
      },
      [props.layer]
    ),
    toggleVisible = useCallback(
      (key: number) => {
        let layer = props.layer;
        layer[key]!.visible = !layer[key]!.visible;
        props.setLayer([...layer]);
      },
      [props.layer]
    ),
    remove = useCallback(
      (key: number) => {
        if (!confirm(`削除してよろしいですか？`)) return;
        let layer = props.layer;
        layer.splice(key, 1);
        props.setLayer([...layer]);
      },
      [props.layer]
    );
  return (
    <div className={Styles.wrapper}>
      <table className={Styles.table}>
        <ReactSortable
          tag={"tbody"}
          list={props.layer}
          setList={props.setLayer}
        >
          {props.layer.map((item, key) => (
            <tr
              className={`${Styles.tr} ${
                (item.nakaOnly && item.pos !== "naka") ||
                (item.critical && item.pos === "naka")
                  ? Styles.invalid
                  : ""
              }`}
              key={`${item.text}${key}`}
            >
              <td className={Styles.visible} onClick={() => toggleVisible(key)}>
                {item.visible ? icons.eye : icons.eyeClosed}
              </td>
              <th className={Styles.name}>{item.text}</th>
              <td className={Styles.pos} onClick={() => togglePos(key)}>
                {item.pos}
              </td>
              <td className={Styles.font} onClick={() => toggleFont(key)}>
                {item.font}
              </td>
              <td className={Styles.delete} onClick={() => remove(key)}>
                {icons.delete}
              </td>
            </tr>
          ))}
        </ReactSortable>
      </table>
    </div>
  );
};
export default LayerSelector;
