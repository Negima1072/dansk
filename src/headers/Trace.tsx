import React, { useCallback, useContext, useState } from "react";
import Spoiler from "@/components/spoiler/Spoiler";
import Styles from "./Trace.module.scss";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import { Templates } from "@/headers/Trace.templates";
import { context } from "@/components/Context";
import { layer } from "@/@types/types";
import LayerSelector from "@/components/layerSelector/LayerSelector";
import layerUtil from "@/libraries/layerUtil";
import typeGuard from "@/libraries/typeGuard";

const Trace = () => {
  const [tabMode, setTabMode] = useState<boolean>(false),
    [lineMode, setLineMode] = useState<boolean>(false),
    [layerDropdownValue, setLayerDropdownValue] = useState<string>(
      "big_ue_ender_full_gothic_W17_L9"
    ),
    [layerData, setLayerData] = useState<layer[]>([]),
    { exportLayer, setExportLayer } = useContext(context);
  if (exportLayer === undefined || setExportLayer === undefined) return <></>;
  const exportHandler = useCallback(
      (value: string) => {
        //todo:Box作ったらContextにstate追加してこっちから書き込めるようにする
        console.log(value);
        switch (value) {
          case "all":
            setExportLayer([...exportLayer, ...layerData]);
            break;
        }
      },
      [exportLayer, layerData]
    ),
    toggleTabMode = useCallback(() => {
      setTabMode(!tabMode);
    }, [tabMode]),
    toggleLineMode = useCallback(() => {
      setLineMode(!lineMode);
    }, [lineMode]),
    layerDropdownOnChange = useCallback((value: string) => {
      setLayerDropdownValue(value);
    }, []),
    addLayer = useCallback(() => {
      const id = layerUtil.getIdByValue(layerDropdownValue);
      const template = Templates[id];
      if (!typeGuard.trace.template(template)) return;
      setLayerData([
        ...layerData,
        { ...template, type: id, font: "mincho", visible: true },
      ]);
    }, [layerData, layerDropdownValue]),
    toggleVisible = useCallback(
      (value: string) => {
        const tmpLayer = layerData.map((layer) => {
          layer.visible = value === "visible";
          return layer;
        });
        setLayerData([...tmpLayer]);
      },
      [layerData]
    );
  return (
    <Spoiler text={"Trace"}>
      <div className={Styles.table}>
        <div className={Styles.row}>
          <Button click={exportHandler} text={"全出力"} value={"all"} />
          <Button
            click={exportHandler}
            text={"等幅全出力"}
            value={"monospacedAll"}
          />
          <Button
            click={exportHandler}
            text={"投コメ全出力"}
            value={"ownerAll"}
          />
          <Button
            click={exportHandler}
            text={"投コメ等幅全出力"}
            value={"ownerMonospacedAll"}
          />
          <Button
            click={exportHandler}
            text={"選択出力"}
            value={"selectedAll"}
          />
          <Button
            click={exportHandler}
            text={"等幅選択出力"}
            value={"selectedMonospacedAll"}
          />
          <Button
            click={exportHandler}
            text={"投コメ選択出力"}
            value={"selectedOwnerAll"}
          />
          <Button
            click={toggleTabMode}
            text={"TabM"}
            value={"convertSpaceToTab"}
            active={tabMode}
          />
          <Button
            click={toggleLineMode}
            text={"線画M"}
            value={"convertColorToBlack"}
            active={lineMode}
          />
          <Button //todo:置換モードの実装
            click={toggleLineMode}
            text={"置換M"}
            value={"convertColorToBlack"}
            active={lineMode}
          />
        </div>
        <div className={Styles.row}>
          <div className={Styles.block}>
            <Dropdown
              change={layerDropdownOnChange}
              selected={layerDropdownValue}
              value={Object.values(Templates)}
            />
            <Button click={addLayer} text={"追加"} value={"add"} />
          </div>
          <div className={Styles.block}>
            <Button click={toggleVisible} text={"一括表示"} value={"visible"} />
            <Button
              click={toggleVisible}
              text={"一括非表示"}
              value={"invisible"}
            />
          </div>
          <div className={Styles.block}>
            <Button click={toggleVisible} text={"背景"} value={""} />
          </div>
        </div>
        <div className={`${Styles.row} ${Styles.layer}`}>
          <LayerSelector layer={layerData} setLayer={setLayerData} />
        </div>
      </div>
    </Spoiler>
  );
};
export default Trace;
