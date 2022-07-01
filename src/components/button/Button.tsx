import React from "react";
import Styles from "./Button.module.scss";
import styled from "styled-components";

type buttonProps = {
  click: (arg0: string) => void;
  text: string;
  type?: "string" | "color";
  value: string;
};

type colorButtonProps = {
  color: string;
};

const ColorButton = styled.input.attrs((props: colorButtonProps) => ({
  style: {
    backgroundColor: props.color,
  },
}))``;

const Button = (props: buttonProps) => {
  if (props.type === "color") {
    return (
      <ColorButton
        type={"button"}
        className={Styles.colorButton}
        color={props.text}
        onClick={() => props.click(props.value)}
        value={" "}
      />
    );
  }
  return (
    <input
      type={"button"}
      className={Styles.button}
      onClick={() => props.click(props.value)}
      value={props.text}
    />
  );
};
export default Button;
