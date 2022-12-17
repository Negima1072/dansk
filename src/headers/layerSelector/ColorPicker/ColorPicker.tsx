import Styles from "./ColorPicker.module.scss";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type props = {
  color: string;
  key_: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, key: number) => void;
};

type colorProps = {
  bgColor: string;
};

const ColorDisplay = styled.label<colorProps>`
  background-color: ${(props) => props.bgColor};
`;

type pos = {
  x: number;
  y: number;
};
const HoverItem = styled.div<pos>`
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

/*

 */

const ColorPicker = ({ color, key_, onChange }: props) => {
  const colorDisplayRef = useRef<HTMLLabelElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; height: number }>({
    x: 0,
    y: 0,
    height: 0,
  });
  const [colorInput, setColorInput] = useState(color);

  useEffect(() => {
    setColorInput(color);
  }, [color]);

  const onClick = () => {
    if (!colorDisplayRef.current) return;
    setPos(colorDisplayRef.current.getBoundingClientRect());
  };

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorInput(value);
    if (value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) onChange(e, key_);
  };

  useEffect(() => {
    if (!colorDisplayRef.current) return;
    setPos(colorDisplayRef.current.getBoundingClientRect());
  }, []);

  return (
    <div className={Styles.wrapper}>
      <ColorDisplay
        className={Styles.colorLabel}
        bgColor={color}
        ref={colorDisplayRef}
        onMouseEnter={onClick}
      >
        <input
          className={Styles.colorInput}
          type="color"
          onChange={(e) => onChange(e, key_)}
        />
      </ColorDisplay>
      <HoverItem x={pos.x} y={pos.y + pos.height} className={Styles.hoverItem}>
        <input
          type="text"
          value={colorInput}
          onChange={update}
          className={Styles.input}
          pattern={"^#([0-9a-fA-Z]{3}|[0-9a-fA-Z]{6})$"}
          required
          placeholder={"#FFFFFF"}
        />
      </HoverItem>
    </div>
  );
};
export { ColorPicker };
