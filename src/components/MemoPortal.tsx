import { useAtom } from "jotai";
import { createPortal } from "react-dom";

import { elementAtom } from "@/libraries/atoms";

import { Memo } from "./memo/Memo";

/**
 * メモブロック(プレイヤー内)
 * @constructor
 */
export const MemoPortal = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return createPortal(<Memo />, elements.MemoElement);
};
