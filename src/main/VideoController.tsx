import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import Styles from "./VideoController.module.scss";
import Spoiler from "@/components/spoiler/Spoiler";
import { context } from "@/components/Context";
import tg from "@/libraries/typeGuard";

const buttons: number[] = [0.01, 0.03, 0.1, 0.3, 1, 3];

const VideoController = (): JSX.Element => {
  const { videoElement, seekToHeadButton, commentOnOffButton } =
      useContext(context),
    [value, setValue] = useState<string>("0"),
    [isSeeking, setIsSeeking] = useState<boolean>(false);

  const onTimeUpdate = () => {
    if (
      !tg.context.videoElement(videoElement) &&
      document.activeElement !== videoElement
    )
      return;
    setValue(videoElement.currentTime.toFixed(2));
  };

  const updateTime = async (time: number, relative = true) => {
    if (
      !tg.context.videoElement(videoElement) ||
      !tg.context.seekToHeadButton(seekToHeadButton) ||
      !tg.context.commentOnOffButton(commentOnOffButton)
    )
      return;
    setIsSeeking(true);
    if (!videoElement.paused) videoElement.pause();
    if (relative) time += videoElement.currentTime;
    if (time < 0) time = 0;
    if (time > videoElement.duration) time = videoElement.duration;
    seekToHeadButton.click();
    await new Promise<void>((resolve) => {
      const i = setInterval(() => {
        if (videoElement.currentTime === 0) {
          clearInterval(i);
          setTimeout(() => resolve(), 10);
        }
      }, 10);
    });
    videoElement.currentTime = Math.floor(time * 100) / 100 + 0.001;
    const pauseButton = document.getElementsByClassName("PlayerPauseButton");
    if (pauseButton && pauseButton[0]) {
      (pauseButton[0] as HTMLButtonElement).click();
    }
    commentOnOffButton.click();
    commentOnOffButton.click();
    setValue(String((Math.floor(time * 100) / 100 + 0.001).toFixed(2)));
    setIsSeeking(false);
  };
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [value]
  );
  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isNaN(Number(value))) {
        void updateTime(Number(value), false);
      }
    },
    [value]
  );
  const onInputBlur = useCallback(() => {
    if (!isNaN(Number(value))) {
      void updateTime(Number(value), false);
    }
  }, [value]);
  if (tg.context.videoElement(videoElement)) {
    videoElement.ontimeupdate = onTimeUpdate;
    videoElement.onpause = onTimeUpdate;
    videoElement.onplay = onTimeUpdate;
  }

  return (
    <Spoiler text={"Time"}>
      <input
        type={"text"}
        className={Styles.input}
        value={value}
        onBlur={onInputBlur}
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        disabled={isSeeking}
      />
      <div className={Styles.table}>
        {buttons.map((data, key) => {
          return (
            <div className={Styles.column} key={key}>
              <div className={Styles.row} onClick={() => void updateTime(data)}>
                +{data.toFixed(2)}
              </div>
              <div
                className={Styles.row}
                onClick={() => void updateTime(data * -1)}
              >
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
