import React, { useContext } from "react";
import { context } from "@/components/Context";
import ReactDOM from "react-dom";
import LayerContainer from "@/layer/LayerContainer";

/**
 * レイヤーブロック(プレイヤー内)
 * @constructor
 */
const LayerPortal = (): JSX.Element => {
  const { LayerElement } = useContext(context);
  if (!LayerElement) return <></>;
  return ReactDOM.createPortal(<LayerContainer />, LayerElement);
};
export default LayerPortal;
