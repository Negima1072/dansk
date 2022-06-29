import VideoController from "@/footers/VideoController";
import React from "react";
import Context from "@/components/Context";

const Footer = (): JSX.Element => {
  return (
    <Context>
      <VideoController />
    </Context>
  );
};
export default Footer;
