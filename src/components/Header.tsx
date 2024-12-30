import { useAtom } from "jotai";
import { createPortal } from "react-dom";

import { elementAtom } from "@/libraries/atoms";

import { Trace } from "./headers/Trace";

/**
 * ヘッダーブロック(プレイヤー上)
 * @constructor
 */
export const Header = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return createPortal(<Trace />, elements.HeaderElement);
};
