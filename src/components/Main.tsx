import VideoController from "@/main/VideoController";
import React, { useContext } from "react";
import { context } from "@/components/Context";
import ReactDOM from "react-dom";

/**
 * メインブロック(プレイヤー内)
 * @constructor
 */
const Main = (): JSX.Element => {
  const { MainElement } = useContext(context);
  if (!MainElement) return <></>;
  return ReactDOM.createPortal(
    <>
      <VideoController />
    </>,
    MainElement
  );
};
export default Main;
