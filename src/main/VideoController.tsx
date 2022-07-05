import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Styles from "./VideoController.module.scss";
import Spoiler from "@/components/spoiler/Spoiler";
import { context } from "@/components/Context";
import tg from "@/libraries/typeGuard";
import str2time from "@/libraries/str2time";

const buttons: number[] = [0.01, 0.03, 0.1, 0.3, 1, 3];

const VideoController = (): JSX.Element => {
  const { videoElement } = useContext(context),
    [value, setValue] = useState<string>("0"),
    [isSeeking, setIsSeeking] = useState<boolean>(false),
    timeInputElement = useRef<HTMLInputElement>(null);

  const onTimeUpdate = () => {
    if (
      !tg.context.videoElement(videoElement) &&
      document.activeElement !== timeInputElement.current
    )
      return;
    setValue(window.__videoplayer.currentTime().toFixed(2));
  };

  const updateTime = (time: number, relative = true) => {
    setIsSeeking(true);
    const commentOnOffButton = document.getElementsByClassName(
      "CommentOnOffButton"
    )[0] as HTMLButtonElement;
    if (!window.__videoplayer.paused()) window.__videoplayer.pause();
    console.log(relative, time, window.__videoplayer.currentTime());
    if (relative) time += window.__videoplayer.currentTime();
    if (time < 0) time = 0;
    if (time > window.__videoplayer.duration())
      time = window.__videoplayer.duration();
    window.__videoplayer.currentTime(Math.floor(time * 100) / 100 + 0.001);
    const pauseButton = document.getElementsByClassName("PlayerPauseButton");
    if (pauseButton && pauseButton[0]) {
      (pauseButton[0] as HTMLButtonElement).click();
    }
    commentOnOffButton.click();
    commentOnOffButton.click();
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
      const time = str2time(value);
      if (e.key === "Enter" && time !== undefined) {
        (e.target as HTMLInputElement).blur();
      }
    },
    [value]
  );
  const onInputBlur = useCallback(() => {
    const time = str2time(value);
    if (time !== undefined) {
      void updateTime(time, !!value.match(/^[+-]/));
    }
  }, [value]);
  useEffect(() => {
    if (tg.context.videoElement(videoElement)) {
      videoElement.addEventListener("timeupdate", onTimeUpdate);
      videoElement.addEventListener("pause", onTimeUpdate);
      videoElement.addEventListener("play", onTimeUpdate);
      console.log(videoElement);
    }
    return () => {
      videoElement?.removeEventListener("timeupdate", onTimeUpdate);
      videoElement?.removeEventListener("pause", onTimeUpdate);
      videoElement?.removeEventListener("play", onTimeUpdate);
    };
  }, [videoElement]);

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
        ref={timeInputElement}
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
