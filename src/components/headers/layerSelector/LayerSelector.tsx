import { useAtom } from "jotai";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { ColorPicker } from "@/components/headers/layerSelector/ColorPicker/ColorPicker";
import { CssEditor } from "@/components/headers/layerSelector/CssEditor";
import { layerAtom } from "@/libraries/atoms";
import { icons } from "@/libraries/icons";
import { layerUtil } from "@/libraries/layerUtil/layerUtil";
import type { TLayer } from "@/types/layer";

import Styles from "./LayerSelector.module.scss";

/**
 * レイヤー選択・並べ替え・色変更他
 * @constructor
 */
export const LayerSelector = () => {
  const [layerData, setLayerData] = useAtom(layerAtom);
  const [editingLayer, setEditingLayer] = useState<number>(-1);
  const [editingLayerName, setEditingLayerName] = useState<string>("");
  const [isSetting, setSetting] = useState<number>(-1);
  if (!layerData || !setLayerData) return <></>;
  const onColorChange = (event: ChangeEvent<HTMLInputElement>, key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    layer.color = event.target.value;
    setLayerData([...layerData]);
  };
  const onLayerNameChange = (key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    layer.text = editingLayerName;
    setLayerData([...layerData]);
    setEditingLayer(-1);
  };
  const togglePos = (key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    layer.pos = layerUtil.togglePos(layer);
    setLayerData([...layerData]);
  };
  const toggleFont = (key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    layer.font = layerUtil.toggleFont(layer.font);
    setLayerData([...layerData]);
  };
  const toggleVisible = (key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    layer.visible = !layer.visible;
    setLayerData([...layerData]);
  };
  const toggleSelected = (e: React.MouseEvent<HTMLDivElement>, key: number) => {
    const layer = layerData[key];
    if (!layer) return;
    if (e.ctrlKey || e.metaKey) {
      layer.selected = !layer.selected;
      if (
        layerData.reduce((count, item) => count + Number(item.selected), 0) ===
        0
      )
        layer.selected = true;
    } else {
      for (const item of layerData) {
        item.selected = false;
      }

      layer.selected = true;
    }
    setLayerData([...layerData]);
  };
  const closeCssEditor = useCallback(
    (data: TLayer) => {
      layerData[isSetting] = data;
      setLayerData([...layerData]);
      setSetting(-1);
    },
    [isSetting, layerData],
  );
  const remove = (key: number) => {
    if (!confirm("削除してよろしいですか？")) return;
    const layer = layerData;
    const deletedLayer = layer.splice(key, 1);
    const beforeLayer = layer[key - 1];
    if (
      layer.length > 0 &&
      deletedLayer[0]?.selected === true &&
      layer.reduce((count, item) => count + Number(item.selected), 0) === 0
    ) {
      if (beforeLayer) {
        beforeLayer.selected = true;
      } else {
        if (layer[0]) layer[0].selected = true;
      }
    }
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
          handle={".handle"}
        >
          {layerData.map((item, key) => (
            <tr
              className={`${Styles.tr} ${
                item.posList.includes(item.pos) ? "" : Styles.invalid
              } ${item.selected ? Styles.selected : ""}`}
              key={`${item.layerId}`}
            >
              <td className={`handle ${Styles.id}`}>{key + 1}</td>
              <td
                className={`handle ${Styles.icon}`}
                onClick={() => toggleVisible(key)}
              >
                {item.visible ? icons.eye : icons.eyeClosed}
              </td>
              <td className={Styles.color}>
                <ColorPicker
                  color={item.color}
                  onChange={(e) => onColorChange(e, key)}
                />
              </td>
              <th
                className={`handle ${Styles.name}`}
                onClick={(e) => toggleSelected(e, key)}
                onDoubleClick={() => {
                  setEditingLayer(key);
                  setEditingLayerName(item.text);
                }}
              >
                {editingLayer === key ? (
                  <input
                    className={Styles.input}
                    value={editingLayerName}
                    onChange={(e) => setEditingLayerName(e.target.value)}
                    onBlur={() => onLayerNameChange(key)}
                  />
                ) : (
                  item.text
                )}
              </th>
              <td
                className={`handle ${Styles.pos}`}
                onClick={() => togglePos(key)}
              >
                {item.pos}
              </td>
              <td
                className={`handle ${Styles.font}`}
                onClick={() => toggleFont(key)}
              >
                {item.font}
              </td>
              <td
                className={`handle ${Styles.icon}`}
                onClick={() => setSetting(key)}
              >
                {icons.gear}
              </td>
              <td
                className={`handle ${Styles.icon}`}
                onClick={() => remove(key)}
              >
                {icons.delete}
              </td>
            </tr>
          ))}
        </ReactSortable>
      </table>
      {layerData[isSetting] && (
        <CssEditor close={closeCssEditor} data={layerData[isSetting]} />
      )}
    </div>
  );
};
