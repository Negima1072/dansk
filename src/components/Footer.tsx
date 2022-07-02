import React from "react";
import Context from "@/components/Context";
import CommandBox from "@/footers/CommandBox";

const Footer = (): JSX.Element => {
  return (
    <Context>
      <CommandBox />
    </Context>
  );
};
export default Footer;
