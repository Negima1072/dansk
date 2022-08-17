import React, { useState } from "react";
import Styles from "./Spoiler.module.scss";
import SpoilerButton from "@/components/spoiler/SpoilerButton";
import localStorage from "@/libraries/localStorage"

type propType = {
  text: string;
  message?: string;
  children: React.ReactNode;
};
/**
 * スポイラー
 * text: ブロックのタイトル
 * message: タイトルの右に表示されるテキスト
 * @param props
 * @constructor
 */
const Spoiler: React.FC<propType> = (props) => {
  const [spoilerOpen, setSpoilerOpen] = useState<boolean>(true);
  setSpoilerOpen(
    (localStorage.get("display_"+props.text.toLowerCase()) == "true")
  );
  const changeSpoilerVisiblity = (visiblity: boolean) => {
    setSpoilerOpen(visiblity);
    localStorage.set("display_"+props.text.toLowerCase(), visiblity ? "true" : "false")
  }
  return (
    <div className={Styles.wrapper}>
      <SpoilerButton
        open={spoilerOpen}
        text={props.text}
        message={props.message}
        click={() => setSpoilerOpen(!spoilerOpen)}
      />
      {spoilerOpen ? <div>{props.children}</div> : ""}
    </div>
  );
};
export default Spoiler;
