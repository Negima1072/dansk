import React, { useState } from "react";
import Styles from "./Spoiler.module.scss";
import SpoilerButton from "@/components/spoiler/SpoilerButton";

type propType = {
  text: string;
  message?: string;
  children: React.ReactNode;
};
/**
 * スポイラー
 * @param props
 * @constructor
 */
const Spoiler: React.FC<propType> = (props) => {
  const [spoilerOpen, setSpoilerOpen] = useState<boolean>(true);
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
