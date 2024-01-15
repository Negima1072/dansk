import ReactDOM from "react-dom";
import { Trace } from "@/headers/Trace";
import { useAtom } from "jotai";
import { elementAtom } from "@/atoms";
import { FC } from "react";

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
    elements.HeaderElement
  );
};
export { Header };
