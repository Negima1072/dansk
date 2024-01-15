import { CommandBox } from "@/footers/CommandBox";
import ReactDOM from "react-dom";
import { OutputBox } from "@/footers/OutputBox";
import { useAtom } from "jotai";
import { elementAtom } from "@/atoms";
import { FC } from "react";

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
    elements.FooterElement
  );
};
export { Footer };
