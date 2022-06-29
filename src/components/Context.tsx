import React, { createContext } from "react";
import { contextProps, contextType } from "@/@types/types";

const videoElement = (
    document.getElementById("MainVideoPlayer") as HTMLDivElement
  ).getElementsByTagName("video")[0] as HTMLVideoElement,
  seekToHeadButton = document.getElementsByClassName(
    "SeekToHeadButton"
  )[0] as HTMLButtonElement;
const contextValue: contextType = {
  videoElement: videoElement,
  seekToHeadButton: seekToHeadButton,
};
export const context = createContext<contextType>(contextValue);

const Parent = (props: contextProps): JSX.Element => {
  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default Parent;
