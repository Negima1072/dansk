import ReactDOM from "react-dom";
import { LayerContainer } from "@/layer/LayerContainer";
import { useAtom } from "jotai";
import { elementAtom } from "@/atoms";
import { FC } from "react";

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
