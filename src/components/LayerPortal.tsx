import { useAtom } from "jotai";
import type { FC } from "react";
import ReactDOM from "react-dom";

import { elementAtom } from "@/atoms";
import { LayerContainer } from "@/layer/LayerContainer";

/**
 * レイヤーブロック(プレイヤー内)
 * @constructor
 */
const LayerPortal: FC = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return ReactDOM.createPortal(<LayerContainer />, elements.LayerElement);
};
export { LayerPortal };
