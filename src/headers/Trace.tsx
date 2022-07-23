import React, { useCallback, useContext, useState } from "react";
import Spoiler from "@/components/spoiler/Spoiler";
import Styles from "./Trace.module.scss";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Templates from "@/headers/Trace.templates";
import { context } from "@/components/Context";
import { backgroundDataType, layer } from "@/@types/types";
import LayerSelector from "@/components/layerSelector/LayerSelector";
import layerUtil from "@/libraries/layerUtil";
import typeGuard from "@/libraries/typeGuard";
import LayerPortal from "@/components/LayerPortal";
import LayerContext from "@/components/LayerContext";
import BackgroundPicker from "@/components/backgroundPicker/BackgroundPicker";

/**
 * Traceブロック
 * @constructor
 */
const Trace = () => {
  const [tabMode, setTabMode] = useState<boolean>(false),
    [replaceMode, setReplaceMode] = useState<boolean>(false),
    [layerDropdownValue, setLayerDropdownValue] = useState<string>(
      "big_ue_ender_full_gothic_W17_L9"
    ),
    [layerData, setLayerData] = useState<layer[]>([]),
    [backgroundData, setBackgroundData] = useState<backgroundDataType>({
      active: -1,
      images: [],
      editing: false,
      mode: "fill",
    }),
    { exportLayer, setExportLayer } = useContext(context);
  if (exportLayer === undefined || setExportLayer === undefined) return <></>;
  const exportHandler = useCallback(
      (value: string) => {
        const layerString: string[] = [],
          isMonospaced = !!value.match(/Monospaced/),
          isOwner = !!value.match(/Owner/),
          isSelectedOnly = !!value.match(/Selected/);
        const targetData: layer[] = [];
        for (const layer of layerData) {
          if (isSelectedOnly && !layer.selected) continue;
          targetData.push(layer);
        }
        const strings = layerUtil.toString(
          targetData,
          isMonospaced,
          tabMode,
          isOwner
        );
        if (!strings) return;
        for (const string of strings) {
          for (const line of string.content) {
            if (string.command) {
              layerString.push(string.command + line);
              string.command = "";
            } else {
              layerString.push(line);
            }
          }
        }
        setExportLayer([...exportLayer, ...layerString]);
      },
      [exportLayer, layerData]
    ),
    toggleTabMode = useCallback(() => {
      setTabMode(!tabMode);
    }, [tabMode]),
    toggleReplaceMode = useCallback(() => {
      setReplaceMode(!replaceMode);
    }, [replaceMode]),
    layerDropdownOnChange = useCallback((value: string) => {
      setLayerDropdownValue(value);
    }, []),
    openBackgroundMenu = useCallback(() => {
      setBackgroundData({ ...backgroundData, editing: true });
    }, [backgroundData]),
    addLayer = useCallback(() => {
      const id = layerUtil.getIdByValue(layerDropdownValue);
      const template = Templates[id];
      if (!typeGuard.trace.template(template)) return;
      const _layerData = layerData.map((value) => {
        value.selected = false;
        return value;
      });
      setLayerData([
        ..._layerData,
        {
          ...template,
          type: id,
          font: "gothic",
          visible: true,
          content: layerUtil.generateLineFromTemplate(template),
          selected: true,
          color: "#000000",
        },
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
    <LayerContext
      value={{ layerData, setLayerData, backgroundData, setBackgroundData }}
    >
      <Spoiler text={"Trace"}>
        <div className={Styles.table}>
          <div className={Styles.row}>
            <Button click={exportHandler} text={"全出力"} value={"all"} />
            <Button
              click={exportHandler}
              text={"等幅全出力"}
              value={"MonospacedAll"}
            />
            <Button
              click={exportHandler}
              text={"投コメ全出力"}
              value={"OwnerAll"}
            />
            <Button
              click={exportHandler}
              text={"投コメ等幅全出力"}
              value={"OwnerMonospacedAll"}
            />
            <Button
              click={exportHandler}
              text={"選択出力"}
              value={"SelectedAll"}
            />
            <Button
              click={exportHandler}
              text={"等幅選択出力"}
              value={"SelectedMonospacedAll"}
            />
            <Button
              click={exportHandler}
              text={"投コメ選択出力"}
              value={"SelectedOwnerAll"}
            />
            <Button
              click={toggleTabMode}
              text={"TabM"}
              value={"convertSpaceToTab"}
              active={tabMode}
            />
            <Button //todo:置換モードの実装
              click={toggleReplaceMode}
              text={"置換M"}
              value={"convertColorToBlack"}
              active={replaceMode}
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
              <Button
                click={toggleVisible}
                text={"一括表示"}
                value={"visible"}
              />
              <Button
                click={toggleVisible}
                text={"一括非表示"}
                value={"invisible"}
              />
            </div>
            <div className={Styles.block}>
              <Button click={openBackgroundMenu} text={"背景"} value={""} />
            </div>
          </div>
          <div className={`${Styles.row} ${Styles.layer}`}>
            <LayerSelector />
          </div>
        </div>
        <LayerPortal />
      </Spoiler>
      {backgroundData.editing && <BackgroundPicker />}
    </LayerContext>
  );
};
export default Trace;
