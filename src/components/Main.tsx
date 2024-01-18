import { useAtom } from "jotai";
import type { FC } from "react";
import ReactDOM from "react-dom";

import { elementAtom } from "@/atoms";
import { VideoController } from "@/main/VideoController";

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
    elements.MainElement,
  );
};
export { Main };
