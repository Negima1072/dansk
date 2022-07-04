import React, { ChangeEvent, useState } from "react";
import Styles from "./Dropdown.module.scss";

type dropdownPorps = {
  change: (arg0: string) => void;
  value: { text: string; value: string }[];
  selected: string;
};

const Dropdown = (props: dropdownPorps) => {
  const [value, setValue] = useState<string>(props.selected);
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    props.change(e.target.value);
  };
  return (
    <select value={value} onChange={onSelectChange} className={Styles.select}>
      {props.value.map((item) => {
        return (
          <option key={`Dropdown${item.value}`} value={item.value}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};
export default Dropdown;
