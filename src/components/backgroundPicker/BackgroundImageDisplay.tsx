import React, { useContext } from "react";
import Styles from "./BackgroundImageDisplay.module.scss";
import { layerContext } from "@/components/LayerContext";
import icons from "@/assets/icons";

const BackgroundPicker = () => {
  const { overlayData, setOverlayData } = useContext(layerContext);
  if (!overlayData || !setOverlayData) return <></>;
  const deleteImage = (key: number) => {
    overlayData.images.splice(key, 1);
    if (overlayData.active >= overlayData.images.length) {
      overlayData.active = -1;
    }
    setOverlayData({ ...overlayData });
  };
  const changeActiveImage = (key: number) => {
    if (overlayData.active === key) {
      overlayData.active = -1;
    } else {
      overlayData.active = key;
    }
    setOverlayData({ ...overlayData });
  };
  return (
    <div className={Styles.container}>
      {overlayData.images.map((blob, key) => {
        return (
          <div
            key={`backgroundImageDisplay${key}`}
            className={`${Styles.item} ${
              key === overlayData.active ? Styles.active : ""
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
