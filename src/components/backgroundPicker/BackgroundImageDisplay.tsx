import React, { useContext } from "react";
import Styles from "./BackgroundImageDisplay.module.scss";
import { layerContext } from "@/components/LayerContext";
import icons from "@/assets/icons";

const BackgroundPicker = () => {
  const { optionData, setOptionData } = useContext(layerContext);
  if (!optionData || !setOptionData) return <></>;
  const deleteImage = (key: number) => {
    optionData.images.splice(key, 1);
    if (optionData.active >= optionData.images.length) {
      optionData.active = -1;
    }
    setOptionData({ ...optionData });
  };
  const changeActiveImage = (key: number) => {
    if (optionData.active === key) {
      optionData.active = -1;
    } else {
      optionData.active = key;
    }
    setOptionData({ ...optionData });
  };
  return (
    <div className={Styles.container}>
      {optionData.images.map((blob, key) => {
        return (
          <div
            key={`backgroundImageDisplay${key}`}
            className={`${Styles.item} ${
              key === optionData.active ? Styles.active : ""
            }`}
          >
            <img
              className={Styles.image}
              src={blob}
              alt={""}
              onClick={() => changeActiveImage(key)}
            />
            <span className={Styles.delete} onClick={() => deleteImage(key)}>
              {icons.delete}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default BackgroundPicker;
