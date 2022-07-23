import React, { useContext } from "react";
import Styles from "./BackgroundImageDisplay.module.scss";
import { layerContext } from "@/components/LayerContext";
import icons from "@/assets/icons";

const BackgroundPicker = () => {
  const { backgroundData, setBackgroundData } = useContext(layerContext);
  if (!backgroundData || !setBackgroundData) return <></>;
  const deleteImage = (key: number) => {
    backgroundData.images.splice(key, 1);
    if (backgroundData.active >= backgroundData.images.length) {
      backgroundData.active = -1;
    }
    setBackgroundData({ ...backgroundData });
  };
  const changeActiveImage = (key: number) => {
    if (backgroundData.active === key) {
      backgroundData.active = -1;
    } else {
      backgroundData.active = key;
    }
    setBackgroundData({ ...backgroundData });
  };
  return (
    <div className={Styles.container}>
      {backgroundData.images.map((blob, key) => {
        return (
          <div
            key={`backgroundImageDisplay${key}`}
            className={`${Styles.item} ${
              key === backgroundData.active ? Styles.active : ""
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
