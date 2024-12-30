import type { ReactNode } from "react";

import { icons } from "@/libraries/icons";

import Styles from "./Popup.module.scss";

type PopupProps = {
  children: ReactNode;
  title: string;
  close: () => void;
};

/**
 * 画面上にポップアップを表示する用
 * title: ポップアップ上部に表示するタイトル
 * close: 閉じる用イベントハンドラ
 * @param props
 * @constructor
 */
export const Popup = (props: PopupProps) => {
  return (
    <div className={Styles.background} onClick={props.close}>
      <div className={Styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.header}>
          <span className={Styles.title}>{props.title}</span>
          <span className={Styles.close} onClick={props.close}>
            {icons.delete}
          </span>
        </div>
        <div className={Styles.container}>{props.children}</div>
      </div>
    </div>
  );
};
