import Styles from "./SpoilerButton.module.scss";

type propType = {
  open: boolean;
  text: string;
  message?: string;
  click: () => void;
};

/**
 * スポイラーの開閉バー
 * open: 開いているか
 * text: ブロックのタイトル
 * message: タイトルの右に表示されるテキスト
 * click: onClickイベントハンドラ
 * @param props
 * @constructor
 */
export const SpoilerButton = (props: propType) => {
  return (
    <div
      className={`${Styles.wrapper || ""} ${
        props.open ? Styles.open || "" : ""
      }`}
      onClick={props.click}
    >
      <span className={Styles.title}>{props.text}</span>
      <span className={Styles.message}>{props.message}</span>
    </div>
  );
};
