import { useAtom } from "jotai";

import { backgroundAtom } from "@/libraries/atoms";
import { icons } from "@/libraries/icons";

import Styles from "./BackgroundImageDisplay.module.scss";

type props = {
  setImageCrop: (key: number) => void;
};

/**
 * 背景の選択画面
 * 有効無効の切り替えとか画像の削除とかも
 * @constructor
 */
export const BackgroundImageDisplay = ({ setImageCrop }: props) => {
  const [background, setBackground] = useAtom(backgroundAtom);
  const deleteImage = (key: number) => {
    background.images.splice(key, 1);
    if (background.selected >= background.images.length) {
      background.selected = -1;
    }
    setBackground({ ...background });
  };
  const changeActiveImage = (key: number) => {
    if (background.selected === key) {
      background.selected = -1;
    } else {
      background.selected = key;
      background.visible = true;
    }
    setBackground({ ...background });
  };

  const cropImage = (index: number) => {
    setImageCrop(index);
  };

  const download = async (index: number) => {
    const image = background.images[index];
    if (!image) return;
    const link = document.createElement("a");
    if (!image.url.startsWith("http")) {
      link.href = image.url;
      link.download = `${image.id}.png`;
      link.click();
    } else {
      try {
        const response = await fetch(image.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
        link.download = `${image.id}.png`;
        link.click();
      } catch {
        alert("この画像はダウンロードできません。手動でPCに保存してください。");
      }
    }
  };

  return (
    <div className={Styles.container}>
      {background.images.map((image, key) => {
        return (
          <div
            key={`backgroundImageDisplay${image.id}`}
            className={`${Styles.item} ${
              key === background.selected ? Styles.active : ""
            }`}
          >
            <img
              className={Styles.image}
              src={image.url}
              alt={""}
              onClick={() => changeActiveImage(key)}
            />
            <span className={Styles.delete} onClick={() => deleteImage(key)}>
              {icons.delete}
            </span>
            <span className={Styles.crop} onClick={() => cropImage(key)}>
              {icons.crop}
            </span>
            <span className={Styles.download} onClick={() => download(key)}>
              {icons.download}
            </span>
          </div>
        );
      })}
    </div>
  );
};
