import { elementAtom } from "@/libraries/atoms";
import { useAtom } from "jotai";
import { createPortal } from "react-dom";
import { CommandBox } from "./footers/CommandBox";
import { OutputBox } from "./footers/OutputBox";

/**
 * フッターブロック(プレイヤー下)
 * @constructor
 */
export const Footer = () => {
  const [elements] = useAtom(elementAtom);
  if (!elements) return <></>;
  return createPortal(
    <>
      <CommandBox />
      <OutputBox />
    </>,
    elements.FooterElement,
  );
};
