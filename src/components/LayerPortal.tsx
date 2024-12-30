import { useAtom } from "jotai";
import { createPortal } from "react-dom";

import { elementAtom } from "@/libraries/atoms";

import { LayerContainer } from "./layer/LayerContainer";

/**
 * レイヤーブロック(プレイヤー内)
 * @constructor
 */
export const LayerPortal = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return createPortal(<LayerContainer />, elements.LayerElement);
};
