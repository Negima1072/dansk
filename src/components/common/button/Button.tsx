import Styles from "./Button.module.scss";

type buttonProps = {
  click: (arg0: string) => void;
  text: string;
  type?: "string" | "color";
  value?: string;
  active?: boolean;
  disabled?: boolean;
};

/**
 * 色とかコマンド用のボタン
 * click: onClickイベントハンドラ
 * text: ボタンの表示テキスト
 * type: stringかcolor
 * value: クリックされた時にイベントハンドラに渡される値
 * active: 有効だということを示す
 * disabled: 無効だと言うことを示す・イベントハンドラ無効化
 * @param props
 * @constructor
 */
export const Button = (props: buttonProps) => {
  if (props.type === "color") {
    return (
      <input
        type={"button"}
        className={`${Styles.colorButton} ${props.active ? Styles.active : ""}`}
        onClick={() => props.click(props.value || "")}
        disabled={props.disabled || false}
        value={" "}
        style={{
          backgroundColor: props.text,
        }}
      />
    );
  }
  return (
    <input
      type={"button"}
      className={`${Styles.button} ${props.active ? Styles.active : ""}`}
      onClick={() => props.click(props.value || "")}
      disabled={props.disabled || false}
      value={props.text}
    />
  );
};
