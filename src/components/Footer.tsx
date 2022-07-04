import CommandBox from "@/footers/CommandBox";
import React, { useContext } from "react";
import { context } from "@/components/Context";
import ReactDOM from "react-dom";
import OutputBox from "@/footers/OutputBox";

const Footer = (): JSX.Element => {
  const { FooterElement } = useContext(context);
  if (!FooterElement) return <></>;
  return ReactDOM.createPortal(
    <>
      <CommandBox />
      <OutputBox />
    </>,
    FooterElement
  );
};
export default Footer;
