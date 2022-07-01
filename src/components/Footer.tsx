import VideoController from "@/footers/VideoController";
import React from "react";
import Context from "@/components/Context";
import CommandBox from "@/footers/CommandBox";

const Footer = (): JSX.Element => {
  return (
    <Context>
      <VideoController />
      <CommandBox />
    </Context>
  );
};
export default Footer;
