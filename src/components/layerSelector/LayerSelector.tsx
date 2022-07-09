import React, { useContext } from "react";
import Styles from "./LayerSelector.module.scss";
import { ReactSortable } from "react-sortablejs";
import layerUtil from "@/libraries/layerUtil";
import icons from "@/components/layerSelector/icons";
import { layerContext } from "@/components/LayerContext";

const LayerSelector = () => {
  const { layerData, setLayerData } = useContext(layerContext);
  if (!layerData || !setLayerData) return <></>;
  const togglePos = (key: number) => {
      const layer = layerData;
      layer[key]!.pos = layerUtil.togglePos(layer[key]!.pos);
      setLayerData([...layer]);
    },
    toggleFont = (key: number) => {
      const layer = layerData;
      layer[key]!.font = layerUtil.toggleFont(layer[key]!.font);
      setLayerData([...layer]);
    },
    toggleVisible = (key: number) => {
      const layer = layerData;
      layer[key]!.visible = !layer[key]!.visible;
      setLayerData([...layer]);
    },
    toggleSelected = (e: React.MouseEvent<HTMLDivElement>, key: number) => {
      const layer = layerData;
      if (e.ctrlKey || e.metaKey) {
        layer[key]!.selected = !layer[key]!.selected;
      } else {
        for (let item of layer) {
          item.selected = false;
        }
        layer[key]!.selected = !layer[key]!.selected;
      }
      for (let item of layer) {
        if (item.selected) {
          setLayerData([...layer]);
          return;
        }
      }
    },
    remove = (key: number) => {
      if (!confirm(`削除してよろしいですか？`)) return;
      let layer = layerData;
      layer.splice(key, 1);
      setLayerData([...layer]);
    };
  return (
    <div className={Styles.wrapper}>
      <table className={Styles.table}>
        <ReactSortable tag={"tbody"} list={layerData} setList={setLayerData}>
          {layerData.map((item, key) => (
            <tr
              className={`${Styles.tr} ${
                (item.nakaOnly && item.pos !== "naka") ||
                (item.critical && item.pos === "naka")
                  ? Styles.invalid
                  : ""
              } ${item.selected ? Styles.selected : ""}`}
              key={`${item.text}${key}`}
            >
              <td className={Styles.visible} onClick={() => toggleVisible(key)}>
                {item.visible ? icons.eye : icons.eyeClosed}
              </td>
              <th
                className={Styles.name}
                onClick={(e) => toggleSelected(e, key)}
              >
                {item.text}
              </th>
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
