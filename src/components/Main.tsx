import VideoController from "@/main/VideoController";
import React from "react";
import Context from "@/components/Context";

const Main = (): JSX.Element => {
  return (
    <Context>
      <VideoController />
    </Context>
  );
};
export default Main;
