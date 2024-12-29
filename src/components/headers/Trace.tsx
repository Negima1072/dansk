import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

import { LayerPortal } from "@/components/LayerPortal";
import { Button } from "@/components/button/Button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { Templates } from "@/components/headers/Trace.templates";
import { BackgroundPicker } from "@/components/headers/backgroundPicker/BackgroundPicker";
import { Backup } from "@/components/headers/backup/Backup";
import { LayerEditor } from "@/components/headers/layerEditor/LayerEditor";
import { LayerSelector } from "@/components/headers/layerSelector/LayerSelector";
import { Options } from "@/components/options/Options";
import { Popup } from "@/components/popup/Popup";
import { Slider } from "@/components/slider/Slider";
import { Spoiler } from "@/components/spoiler/Spoiler";
import {
  backgroundAtom,
  elementAtom,
  exportLayerAtom,
  layerAtom,
  optionAtom,
} from "@/libraries/atoms";
import { domo2dansa } from "@/libraries/domoTool";
import { layerUtil } from "@/libraries/layerUtil/layerUtil";
import { Storage } from "@/libraries/localStorage";
import { typeGuard } from "@/libraries/typeGuard";
import { uuid } from "@/libraries/uuidUtil";
import type { TLayer } from "@/types/layer";

import Styles from "./Trace.module.scss";

/**
 * Traceブロック
 * @constructor
 */
const Trace = () => {
  const [tabMode, setTabMode] = useState<boolean>(false);
  const [layerDropdownValue, setLayerDropdownValue] = useState<string>(
    "big_ue_ender_full_gothic_W17_L9",
  );
  const [optionEditing, setOptionEditing] = useState<boolean>(false);
  const [autoSaveWindow, setAutoSaveWindow] = useState<boolean>(false);
  const [exportLayer, setExportLayer] = useAtom(exportLayerAtom);
  const [layerData, setLayerData] = useAtom(layerAtom);
  const [optionData, setOptionData] = useAtom(optionAtom);
  const [background, setBackground] = useAtom(backgroundAtom);
  const [elements] = useAtom(elementAtom);
  const layerDataRef = useRef(layerData);
  const autoSaveInterval = useRef<number>(-1);
  useEffect(() => {
    layerDataRef.current = layerData;
  }, [layerData]);
  useEffect(() => {
    const span = Number(Storage.get("options_autoSave_span"));
    if (span <= 0) return;
    autoSaveInterval.current = window.setInterval(
      () => {
        const data: unknown = JSON.parse(Storage.get("autoSave"));
        if (
          !typeGuard.localStorage.isAutoSave(data) ||
          !layerDataRef.current ||
          layerDataRef.current.length < 1 ||
          JSON.stringify(layerDataRef.current) ===
            JSON.stringify(data.at(-1)?.data)
        )
          return;
        data.push({ data: layerDataRef.current, timestamp: Date.now() });
        if (data.length > Number(Storage.get("options_autoSave_max"))) {
          data.shift();
        }
        Storage.set("autoSave", data);
      },
      span * 60 * 1000,
    );
    return () => {
      window.clearInterval(autoSaveInterval.current);
      autoSaveInterval.current = -1;
    };
  }, [setTabMode]);
  const exportHandler = useCallback(
    (value: string) => {
      const isMonospaced = !!value.match(/Monospaced/);
      const isOwner = !!value.match(/Owner/);
      const isSelectedOnly = !!value.match(/Selected/);
      let targetData: TLayer[] = layerData;
      if (isSelectedOnly) {
        targetData = targetData.filter((layer) => layer.selected);
      }
      if (
        !isSelectedOnly &&
        Storage.get("options_exportHiddenLayer") === "false"
      ) {
        targetData = targetData.filter((layer) => layer.visible);
      }
      const data = layerUtil.toString(
        targetData,
        isMonospaced,
        tabMode,
        isOwner,
      );
      if (!data) return;
      setExportLayer([...exportLayer, ...layerUtil.formatAsString(data)]);
    },
    [exportLayer, layerData, tabMode],
  );
  const toggleTabMode = useCallback(() => setTabMode(!tabMode), [tabMode]);
  const toggleReplaceMode = useCallback(
    () => setOptionData({ ...optionData, replace: !optionData.replace }),
    [optionData],
  );
  const toggleGridMode = useCallback(
    () => setOptionData({ ...optionData, grid: !optionData.grid }),
    [optionData],
  );
  const layerDropdownOnChange = useCallback(
    (value: string) => setLayerDropdownValue(value),
    [],
  );
  const openBackgroundMenu = useCallback(
    () => setBackground({ ...background, open: true }),
    [background],
  );
  const downloadScreenshot = useCallback((commentOnly: boolean) => {
    if (!elements) return;
    const canvas_screenshot = document.createElement("canvas");
    canvas_screenshot.width = elements.commentCanvas.clientWidth;
    canvas_screenshot.height = elements.commentCanvas.clientHeight;
    const ctx = canvas_screenshot.getContext("2d");
    if (!ctx) return;
    if (!commentOnly) {
      ctx.drawImage(
        elements.videoElement,
        0,
        0,
        canvas_screenshot.width,
        canvas_screenshot.height,
      );
    }
    ctx.drawImage(
      elements.commentCanvas,
      0,
      0,
      canvas_screenshot.width,
      canvas_screenshot.height,
    );
    const url_screenshot = canvas_screenshot.toDataURL("image/png");
    const a_screenshot = document.createElement("a");
    a_screenshot.href = url_screenshot;
    a_screenshot.download = `screenshot${
      Storage.get("options_addDatetimeToFilename") === "true"
        ? new Date().toISOString().slice(0, -5).replace(/[-T:]/g, "")
        : ""
    }.png`;
    a_screenshot.click();
    a_screenshot.remove();
    canvas_screenshot.remove();
    window.URL.revokeObjectURL(url_screenshot);
  }, []);
  const toggleBackgroundVisible = useCallback(
    () => setBackground({ ...background, visible: !background.visible }),
    [background],
  );
  const changeBackgroundTransparency = useCallback(
    (t: number) => setBackground({ ...background, transparency: t }),
    [background],
  );
  const toggleOptionEditing = useCallback(
    () => setOptionEditing(!optionEditing),
    [optionEditing],
  );
  const togglePreview = useCallback(
    () =>
      setOptionData({
        ...optionData,
        preview:
          optionData.preview === "disable"
            ? "enable"
            : optionData.preview === "enable"
              ? "previewOnly"
              : "disable",
      }),
    [optionData],
  );
  const addLayer = useCallback(() => {
    const id = layerUtil.getIdByValue(layerDropdownValue);
    const template = Templates[id];
    if (!typeGuard.trace.template(template)) return;
    const color: string | false | undefined = layerData.reduce(
      (pv, val) => {
        if (val.selected) {
          val.selected = false;
          if (pv === undefined) {
            return val.color;
          }
          return false;
        }
        return pv;
      },
      undefined as undefined | false | string,
    );
    setLayerData([
      ...layerData,
      {
        ...template,
        type: id,
        font: "gothic",
        visible: true,
        content: layerUtil.generateLineFromTemplate(template),
        selected: true,
        color: color || "#000000",
        layerId: uuid(),
      },
    ]);
  }, [layerData, layerDropdownValue]);
  const toggleVisible = useCallback(
    (value: string) => {
      const tmpLayer = layerData.map((layer) => {
        layer.visible = value === "visible";
        return layer;
      });
      setLayerData([...tmpLayer]);
    },
    [layerData],
  );
  const saveToFile = useCallback(() => {
    const json = JSON.stringify(layerData);
    const blob = new Blob([json], { type: "application/json" });
    const fileName = window.prompt("ファイル名を入力してください", "");
    if (fileName === "" || fileName === null) {
      alert("キャンセルされました");
      return;
    }
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}${
      Storage.get("options_addDatetimeToFilename") === "true"
        ? new Date().toISOString().slice(0, -5).replace(/[-T:]/g, "")
        : ""
    }.dansk.json`;
    link.click();
  }, [layerData]);
  const loadFromAutoSave = useCallback(() => {
    setAutoSaveWindow(true);
  }, []);
  const loadFromFile = useCallback(() => {
    if (!confirm("現在作業中のデータが消えてしまいますがよろしいですか？"))
      return;
    const reader = new FileReader();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.xml,*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target?.files?.[0]) {
        reader.readAsText(target.files[0]);
      }
    };
    reader.onload = (e) => {
      if (typeof e.target?.result !== "string") return;
      let data: unknown;
      if (e.target.result.startsWith("<?xml")) {
        data = domo2dansa(e.target.result);
      } else {
        data = JSON.parse(e.target.result);
      }
      if (!typeGuard.layer.isLayers(data)) return;
      setLayerData(
        data.map((layer) => {
          layer.overwrite = true;
          if (!layer.layerId) {
            layer.layerId = uuid();
          }
          return layer;
        }),
      );
    };
    input.click();
  }, []);
  return (
    <>
      <Spoiler text={"Trace"}>
        <div className={Styles.table}>
          <div className={Styles.row}>
            <div className={Styles.block}>
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
            </div>
            <div className={Styles.block}>
              <Button
                click={toggleTabMode}
                text={"TabM"}
                value={"convertSpaceToTab"}
                active={tabMode}
              />
              <Button
                click={toggleReplaceMode}
                text={"置換M"}
                value={"convertColorToBlack"}
                active={optionData.replace}
              />
            </div>
            <div className={Styles.block}>
              <Button
                click={toggleOptionEditing}
                text={"設定"}
                active={optionEditing}
              />
              <Button
                click={togglePreview}
                text={
                  optionData.preview === "disable"
                    ? "編集"
                    : optionData.preview === "previewOnly"
                      ? "プレビュー"
                      : "編集+プレビュー"
                }
              />
            </div>
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
              <Button
                click={toggleGridMode}
                text={"グリッド"}
                value={""}
                active={optionData.grid}
              />
            </div>
            <div className={Styles.block}>
              <Button click={openBackgroundMenu} text={"背景設定"} value={""} />
              {background.selected > -1 && (
                <Button
                  click={toggleBackgroundVisible}
                  text={background.visible ? "画像非表示" : "画像表示"}
                  value={""}
                />
              )}
              {background.selected > -1 && (
                <Slider
                  change={changeBackgroundTransparency}
                  value={100}
                  max={100}
                  min={0}
                />
              )}
            </div>
            <div className={Styles.block}>
              <Button
                click={() => downloadScreenshot(false)}
                text={"スクショ"}
                value={""}
              />
              <Button
                click={() => downloadScreenshot(true)}
                text={"コメショ"}
                value={""}
              />
            </div>
          </div>
          <div className={`${Styles.row} ${Styles.layer}`}>
            <div className={`${Styles.block} ${Styles.selector}`}>
              <LayerSelector />
            </div>
            <div className={Styles.block}>
              <div className={Styles.row}>
                <LayerEditor />
              </div>
              <div className={Styles.row}>
                <Button click={saveToFile} text={"ファイルに保存"} />
                <Button click={loadFromFile} text={"ファイルから読込"} />
                <Button
                  click={loadFromAutoSave}
                  text={"バックアップから読込"}
                />
              </div>
            </div>
          </div>
        </div>
        <LayerPortal />
      </Spoiler>
      {background.open && <BackgroundPicker />}
      {optionEditing && (
        <Popup title={"設定"} close={toggleOptionEditing}>
          <Options />
        </Popup>
      )}
      {autoSaveWindow && <Backup close={() => setAutoSaveWindow(false)} />}
    </>
  );
};
export { Trace };
