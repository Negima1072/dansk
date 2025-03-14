import { useSetAtom } from "jotai";
import { useState } from "react";

import { Button } from "@/components/common/button/Button";
import { Popup } from "@/components/common/popup/Popup";
import { backgroundAtom, layerAtom } from "@/libraries/atoms";
import { Storage } from "@/libraries/localStorage";
import { typeGuard } from "@/libraries/typeGuard";
import { uuid } from "@/libraries/uuidUtil";
import type { TSaveData } from "@/types/types";

import Styles from "./Backup.module.scss";

type propType = {
  close: () => void;
};
/**
 * スポイラー
 * text: ブロックのタイトル
 * message: タイトルの右に表示されるテキスト
 * @param props
 * @constructor
 */
export const Backup = (props: propType) => {
  const [saveData, setSaveData] = useState<TSaveData[]>(() => {
    const data: unknown = JSON.parse(Storage.get("autoSave"));
    if (!typeGuard.localStorage.isSaveDataArray(data)) return [];
    return data;
  });
  const setLayerData = useSetAtom(layerAtom);
  const setBackground = useSetAtom(backgroundAtom);
  const load = (key: string) => {
    const value = saveData[Number(key)];
    if (
      !value ||
      !confirm("現在作業中のデータが消えてしまいますがよろしいですか？")
    )
      return;
    setLayerData(
      value.data.map((layer) => {
        layer.overwrite = true;
        if (!layer.layerId) {
          layer.layerId = uuid();
        }
        return layer;
      }),
    );
    //if (value.background) {
    //  setBackground({
    //    selected: 0,
    //    images: [value.background.image],
    //    mode: value.background.mode,
    //    visible: true,
    //    open: false,
    //    opacity: 100,
    //  });
    //}
    props.close();
  };
  const remove = (key: string) => {
    saveData.splice(Number(key), 1);
    setSaveData([...saveData]);
    Storage.set("autoSave", saveData);
  };
  return (
    <Popup title={"自動保存"} close={props.close}>
      <div className={Styles.wrapper}>
        {saveData.length === 0 ? (
          <p>バックアップがありません。</p>
        ) : (
          Object.keys(saveData)
            .reverse()
            .map((key) => {
              const value = saveData[Number(key)];
              if (!value) return <span key={key} />;
              return (
                <div className={Styles.block} key={key}>
                  <h3>
                    {new Date(value.timestamp).toLocaleString()}のバックアップ
                  </h3>
                  <p>レイヤー数：{value.data.length}</p>
                  <div>
                    <Button click={() => load(key)} text={"復元"} />
                    <Button click={() => remove(key)} text={"削除"} />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </Popup>
  );
};
