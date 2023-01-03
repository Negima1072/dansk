import React, { useContext } from "react";
import Styles from "./BackgroundImageDisplay.module.scss";
import { layerContext } from "@/components/LayerContext";
import { icons } from "@/assets/icons";

/**
 * 背景の選択画面
 * 有効無効の切り替えとか画像の削除とかも
 * @constructor
 */
const BackgroundImageDisplay = () => {
  const { optionData, setOptionData } = useContext(layerContext);
  if (!optionData || !setOptionData) return <></>;
  const deleteImage = (key: number) => {
    optionData.bgImages.splice(key, 1);
    if (optionData.bgActive >= optionData.bgImages.length) {
      optionData.bgActive = -1;
    }
    setOptionData({ ...optionData });
  };
  const changeActiveImage = (key: number) => {
    if (optionData.bgActive === key) {
      optionData.bgActive = -1;
    } else {
      optionData.bgActive = key;
      optionData.bgVisible = true;
    }
    setOptionData({ ...optionData });
  };
  return (
    <div className={Styles.container}>
      {optionData.bgImages.map((blob, key) => {
        return (
          <div
            key={`backgroundImageDisplay${key}`}
            className={`${Styles.item} ${
              key === optionData.bgActive ? Styles.active : ""
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
export { BackgroundImageDisplay };
