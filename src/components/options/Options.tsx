import { useMemo, useState } from "react";

import { Storage } from "@/libraries/localStorage";
import { defaultValue } from "@/libraries/localStorage.defaultValue";
import type {
  TLocalStorageKeys,
  TLocalStorageOptionItem,
  TOptionsCategory,
} from "@/types/types";

import Styles from "./Options.module.scss";

export const Options = () => {
  const [activeTab, setActiveTab] = useState<TOptionsCategory>("Editor");
  const [value, setValue] = useState<Record<TLocalStorageKeys, string>>(
    (Object.keys(defaultValue) as TLocalStorageKeys[]).reduce(
      (pv, key) => {
        if (!key.match(/^options_/)) return pv;
        pv[key] = Storage.get(key);
        return pv;
      },
      {} as { [key in TLocalStorageKeys]: string },
    ),
  );
  const updateValue = (key: TLocalStorageKeys, result: string) => {
    //この処理は新機能追加による暫定的な処置です
    if (
      key === "options_exportLayerName" &&
      !value.options_commandOrder.includes("layerName") &&
      result === "true"
    ) {
      value.options_commandOrder = `layerName|${value.options_commandOrder}`;
      Storage.set("options_commandOrder", value.options_commandOrder);
    }
    //if (key === "options_disable184") {
    //  const postBtn = document.querySelector(
    //    ".CommentPostButton",
    //  ) as HTMLButtonElement;
    //  if (postBtn) {
    //    postBtn.style.backgroundColor =
    //      result === "true" ? "#ff8300" : "#007cff";
    //  }
    //}
    value[key] = result;
    setValue({ ...value });
    Storage.set(key, result);
  };
  const filteredKeys = useMemo(() => {
    return (Object.keys(defaultValue) as TLocalStorageKeys[]).filter((key) => {
      const item = defaultValue[key] as TLocalStorageOptionItem;
      return item.cat === activeTab;
    });
  }, [activeTab]);
  const renderOptionItem = (key: TLocalStorageKeys) => {
    const defValue = defaultValue[key] as TLocalStorageOptionItem;
    if (defValue.required && Storage.get(defValue.required) !== "true")
      return <div key={key} />;
    switch (defValue.type) {
      case "boolean":
        return (
          <div className={Styles.bool}>
            <label>
              <input
                type="checkbox"
                checked={value[key] === "true"}
                onChange={() =>
                  updateValue(key, value[key] === "true" ? "false" : "true")
                }
              />
              <span>{defValue.description}</span>
            </label>
          </div>
        );
      case "string":
        return (
          <div className={Styles.string}>
            <label>
              <p>{defValue.description}</p>
              <input
                type="text"
                onChange={(e) => updateValue(key, e.target.value)}
                value={value[key]}
              />
            </label>
          </div>
        );
      case "number":
        return (
          <div className={Styles.number}>
            <label>
              <p>{defValue.description}</p>
              <input
                type="number"
                onChange={(e) => updateValue(key, e.target.value)}
                value={value[key]}
              />
            </label>
          </div>
        );
    }
  };
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.tabs}>
        {(["Editor", "Post", "Output", "Other"] as TOptionsCategory[]).map(
          (category) => (
            <button
              type="button"
              key={category}
              className={activeTab === category ? Styles.active : ""}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ),
        )}
      </div>
      <div className={Styles.tabContent}>
        {filteredKeys.map((key) => (
          <div key={key}>{renderOptionItem(key)}</div>
        ))}
      </div>
      <div className={Styles.footer}>
        <span>段スク水</span>
        <div className={Styles.links}>
          <span>
            <a
              href="https://github.com/eneko0513/NicoNicoDansaScriptCustom"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </span>
          <span>|</span>
          <span>
            <a
              href="https://github.com/eneko0513/NicoNicoDansaScriptCustom/blob/main/MANUAL.md"
              target="_blank"
              rel="noreferrer"
            >
              説明書
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
