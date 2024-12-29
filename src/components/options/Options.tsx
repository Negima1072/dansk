import { useState } from "react";

import { Storage } from "@/libraries/localStorage";
import { defaultValue } from "@/libraries/localStorage.defaultValue";
import type { TLocalStorageKeys, TLocalStorageOptionItem } from "@/types/types";

import Styles from "./Options.module.scss";

export const Options = () => {
  const [value, setValue] = useState(
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
    if (key === "options_disable184") {
      const postBtn = document.querySelector(
        ".CommentPostButton",
      ) as HTMLButtonElement;
      if (postBtn) {
        postBtn.style.backgroundColor =
          result === "true" ? "#ff8300" : "#007cff";
      }
    }
    value[key] = result;
    setValue({ ...value });
    Storage.set(key, result);
  };
  return (
    <div className={Styles.wrapper}>
      {(Object.keys(value) as TLocalStorageKeys[]).map((key) => {
        const defValue = defaultValue[key] as TLocalStorageOptionItem;
        if (defValue.required && Storage.get(defValue.required) !== "true")
          return <div key={key} />;
        switch (defValue.type) {
          case "boolean":
            return (
              <div className={Styles.bool} key={key}>
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
              <div className={Styles.string} key={key}>
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
              <div className={Styles.number} key={key}>
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
      })}
    </div>
  );
};
