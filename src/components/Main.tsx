import { useAtom } from "jotai";
import { createPortal } from "react-dom";

import { elementAtom } from "@/libraries/atoms";

import { VideoController } from "./main/VideoController";

/**
 * メインブロック(プレイヤー内)
 * @constructor
 */
export const Main = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return createPortal(<VideoController />, elements.MainElement);
};
