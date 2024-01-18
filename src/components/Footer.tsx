import { useAtom } from "jotai";
import type { FC } from "react";
import ReactDOM from "react-dom";

import { elementAtom } from "@/atoms";
import { CommandBox } from "@/footers/CommandBox";
import { OutputBox } from "@/footers/OutputBox";

/**
 * フッターブロック(プレイヤー下)
 * @constructor
 */
const Footer: FC = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return ReactDOM.createPortal(
    <>
      <CommandBox />
      <OutputBox />
    </>,
    elements.FooterElement,
  );
};
export { Footer };
