import { VideoController } from "@/main/VideoController";
import ReactDOM from "react-dom";
import { useAtom } from "jotai";
import { elementAtom } from "@/atoms";
import { FC } from "react";

/**
 * メインブロック(プレイヤー内)
 * @constructor
 */
const Main: FC = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return ReactDOM.createPortal(
    <>
      <VideoController />
    </>,
    elements.MainElement
  );
};
export { Main };
