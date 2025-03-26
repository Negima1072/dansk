import { type ChangeEvent, useState } from "react";

import { Spoiler } from "@/components/common/spoiler/Spoiler";
import { getFont } from "@/libraries/font";
import { Storage } from "@/libraries/localStorage";

import Styles from "./Memo.module.scss";

/**
 * メモブロック(プレイヤー内)
 * @constructor
 */
export const Memo = () => {
  const [value, setValue] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(13);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    Storage.set("memo", value);
  };
  useEffect(() => {
    setValue(Storage.get("memo"));
    setFontSize(Number.parseInt(Storage.get("options_memoFontSize")) || 13);
  }, []);
  return (
    <Spoiler text={"Memo"}>
      <textarea
        cols={30}
        rows={5}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        className={Styles.textarea}
        spellCheck={false}
        style={{
          fontFamily: getFont("gothic").font,
          fontSize: `${fontSize}px`,
        }}
      />
    </Spoiler>
  );
};
