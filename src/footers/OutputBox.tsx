import { useContext, useEffect, useState } from "react";
import { context } from "@/components/Context";
import React from "react";
import Spoiler from "@/components/spoiler/Spoiler";
import Styles from "./OutputBox.module.scss";

/**
 * 入出力用のテキストエリア
 * @constructor
 */
const OutputBox = (): JSX.Element => {
  const { exportLayer } = useContext(context),
    [textareaValue, setTextareaValue] = useState<string>("");
  useEffect(() => {
    if (exportLayer === undefined) return;
    setTextareaValue(exportLayer.join("\n"));
  }, [exportLayer]);
  if (exportLayer === undefined) return <></>;
  return (
    <Spoiler text={"Box"}>
      <div className={Styles.table}>
        <div className={Styles.row}>
          <textarea
            className={Styles.textarea}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          ></textarea>
        </div>
        <div className={Styles.row}></div>
      </div>
    </Spoiler>
  );
};
export default OutputBox;
