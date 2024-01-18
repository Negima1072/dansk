import { useAtom } from "jotai";
import type { FC } from "react";
import ReactDOM from "react-dom";

import { elementAtom } from "@/atoms";
import { Trace } from "@/headers/Trace";

/**
 * ヘッダーブロック(プレイヤー上)
 * @constructor
 */
const Header: FC = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return ReactDOM.createPortal(
    <>
      <Trace />
    </>,
    elements.HeaderElement,
  );
};
export { Header };
