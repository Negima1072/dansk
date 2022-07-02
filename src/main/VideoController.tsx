import React, { useContext, useState } from "react";
import Styles from "./VideoController.module.scss";
import Spoiler from "@/components/spoiler/Spoiler";
import { context } from "@/components/Context";

const buttons: number[] = [0.01, 0.03, 0.1, 0.3, 1, 3];

const VideoController = (): JSX.Element => {
  const { videoElement, seekToHeadButton } = useContext(context),
    [value, setValue] = useState<number>(0);

  const updateTime = (time: number) => {
    time += videoElement.currentTime;
    if (time < 0) time = 0;
    if (time > videoElement.duration) time = videoElement.duration;
    seekToHeadButton.click();
    videoElement.currentTime = Math.floor(time * 100) / 100 + 0.001;
    setValue(Math.floor(time * 100) / 100 + 0.001);
  };
  videoElement.ontimeupdate = () => setValue(videoElement.currentTime);
  videoElement.onpause = () => setValue(videoElement.currentTime);
  videoElement.onplay = () => setValue(videoElement.currentTime);
  return (
    <Spoiler text={"Time"}>
      <input
        type={"text"}
        className={Styles.input}
        value={value.toFixed(2)}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className={Styles.table}>
        {buttons.map((data, key) => {
          return (
            <div className={Styles.column} key={key}>
              <div className={Styles.row} onClick={() => updateTime(data)}>
                +{data.toFixed(2)}
              </div>
              <div className={Styles.row} onClick={() => updateTime(data * -1)}>
                -{data.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </Spoiler>
  );
};
export default VideoController;
