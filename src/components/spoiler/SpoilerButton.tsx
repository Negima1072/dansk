import React from "react";
import Styles from "./SpoilerButton.module.scss";

type propType = {
  open: boolean;
  text: string;
  click: () => void;
};
/**
 * スポイラーの開閉バー
 * @param props
 * @constructor
 */
const SpoilerButton: React.FC<propType> = (props) => {
  return (
    <div
      className={`${Styles.wrapper || ""} ${
        props.open ? Styles.open || "" : ""
      }`}
      onClick={props.click}
    >
      {props.text}
    </div>
  );
};
export default SpoilerButton;
