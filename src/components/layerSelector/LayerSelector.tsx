import React, { ChangeEvent, useContext, useState } from "react";
import Styles from "./LayerSelector.module.scss";
import { ReactSortable } from "react-sortablejs";
import layerUtil from "@/libraries/layerUtil";
import icons from "@/components/layerSelector/icons";
import { layerContext } from "@/components/LayerContext";
import styled from "styled-components";

type colorProps = {
  bgColor: string;
};

const ColorDisplay = styled.label<colorProps>`
  background-color: ${(props) => props.bgColor};
`;

const LayerSelector = () => {
  const { layerData, setLayerData } = useContext(layerContext),
    [editingLayer, setEditingLayer] = useState<number>(-1),
    [editingLayerName, setEditingLayerName] = useState<string>("");
  if (!layerData || !setLayerData) return <></>;
  const onColorChange = (event: ChangeEvent<HTMLInputElement>, key: number) => {
      const layer = layerData;
      layer[key]!.color = event.target.value;
      setLayerData([...layer]);
    },
    onLayerNameChange = (key: number) => {
      const layer = layerData;
      layer[key]!.text = editingLayerName;
      setLayerData([...layer]);
      setEditingLayer(-1);
    },
    togglePos = (key: number) => {
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
      const layer = layerData,
        selected = layer[key]!.selected;
      if (e.ctrlKey || e.metaKey) {
        layer[key]!.selected = !layer[key]!.selected;
      } else {
        for (let item of layer) {
          item.selected = false;
        }
        if (!selected) {
          layer[key]!.selected = true;
        }
      }
      setLayerData([...layer]);
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
        <ReactSortable
          tag={"tbody"}
          list={layerData}
          setList={setLayerData}
          disabled={editingLayer !== -1}
        >
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
              <td className={Styles.id}>{key + 1}</td>
              <td className={Styles.visible} onClick={() => toggleVisible(key)}>
                {item.visible ? icons.eye : icons.eyeClosed}
              </td>
              <td className={Styles.color}>
                <ColorDisplay
                  className={Styles.colorLabel}
                  bgColor={item.color}
                  htmlFor={`${Styles.tr}-${key}`}
                />
                <input
                  className={Styles.colorInput}
                  type="color"
                  id={`${Styles.tr}-${key}`}
                  onChange={(e) => onColorChange(e, key)}
                />
              </td>
              <th
                className={Styles.name}
                onClick={(e) => toggleSelected(e, key)}
                onDoubleClick={() => {
                  setEditingLayer(key);
                  setEditingLayerName(item.text);
                }}
              >
                {editingLayer === key ? (
                  <input
                    autoFocus
                    className={Styles.input}
                    value={editingLayerName}
                    onChange={(e) => setEditingLayerName(e.target.value)}
                    onBlur={() => onLayerNameChange(key)}
                  />
                ) : (
                  item.text
                )}
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
