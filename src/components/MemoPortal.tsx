import { useAtom } from "jotai";
import type { FC } from "react";
import ReactDOM from "react-dom";

import { elementAtom } from "@/atoms";
import { Memo } from "@/memo/Memo";

/**
 * メモブロック(プレイヤー内)
 * @constructor
 */
const MemoPortal: FC = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return ReactDOM.createPortal(<Memo />, elements.MemoElement);
};
export { MemoPortal };
