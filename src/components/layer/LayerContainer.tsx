import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import {
  backgroundAtom,
  elementAtom,
  layerAtom,
  optionAtom,
} from "@/libraries/atoms";

import Styles from "./LayerContainer.module.scss";
import { Preview } from "./Preview/Preview";
import { Layer } from "./layer/Layer";

/**
 * レイヤー全体を管理
 * @constructor
 */
export const LayerContainer = () => {
  const [layerData] = useAtom(layerAtom);
  const [background] = useAtom(backgroundAtom);
  const [optionData] = useAtom(optionAtom);
  const [elements] = useAtom(elementAtom);
  useEffect(() => {
    const classList = elements?.commentCanvas.parentElement?.classList;
    const cssClass = Styles.VideoSymbolContainer || "_";
    if (!classList || process.env.NODE_ENV === "development") return;
    if (layerData && layerData.length > 0) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
      };
      classList.toggle(cssClass, true);
    } else {
      window.onbeforeunload = null;
      classList.toggle(cssClass, false);
    }
  }, [layerData]);
  const observerCallback = () => {
    if (
      !targetNode.current ||
      !targetNode.current.parentElement ||
      !targetNode.current.parentElement.parentElement
    )
      return;
    const target = targetNode.current.parentElement.parentElement;
    setScale({ x: target.clientWidth / 640, y: target.clientHeight / 360 });
  };
  const [observer] = useState<MutationObserver>(
    new MutationObserver(observerCallback),
  );
  const [scale, setScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const targetNode = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !targetNode.current ||
      !targetNode.current.parentElement ||
      !targetNode.current.parentElement.parentElement
    )
      return;
    observer.observe(targetNode.current.parentElement.parentElement, {
      attributes: true,
      childList: false,
      subtree: false,
    });
  }, [targetNode]);
  useEffect(() => observerCallback(), [document.body.classList]);
  return (
    <>
      {background.selected > -1 && background.visible && elements
        ? ReactDOM.createPortal(
            <img
              className={`${Styles.backgroundImage}`}
              src={background.images[background.selected]?.url}
              alt={"backgroundImage"}
              style={{
                objectFit: background.mode,
                opacity: background.transparency / 100,
              }}
            />,
            elements?.BackgroundImageElement,
          )
        : ""}
      {optionData.preview !== "disable" && <Preview />}
      <div
        ref={targetNode}
        style={{
          transform: `scale(${scale.x}, ${scale.y})`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className={`${Styles.scaleWrapper} ${
          optionData.preview === "previewOnly" && Styles.hide
        }`}
      >
        {layerData?.map((data) => {
          return <Layer key={data.layerId} data={data} />;
        })}
      </div>
    </>
  );
};
