import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Spoiler } from "@/components/spoiler/Spoiler";
import { str2time, time2str } from "@/libraries/timeUtil";

import Styles from "./VideoController.module.scss";

const buttons: number[] = [0.01, 0.03, 0.1, 0.3, 1, 3];

/**
 * 動画コントローラー
 * buttonsにある秒数(のそれぞれ+-)のボタンが生成される
 * @constructor
 */
export const VideoController = () => {
  const [value, setValue] = useState<string>("0");
  const [isValueChanged, setValueChanged] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const timeInputElement = useRef<HTMLInputElement>(null);
  const updateTime = (time: number, relative = true) => {
    setIsSeeking(true);
    //const commentOnOffButton = document.getElementsByClassName(
    //  "CommentOnOffButton",
    //)[0] as HTMLButtonElement;
    let _time = time;
    if (relative) _time += window.__videoplayer.currentTime();
    if (_time < 0) _time = 0;
    if (_time > window.__videoplayer.duration())
      _time = window.__videoplayer.duration();
    window.__videoplayer.currentTime((Math.floor(_time * 100) + 0.1) / 100);
    //if (
    //  document.getElementsByClassName("CommentOnOffButton-iconHide").length > 0
    //) {
    //  commentOnOffButton.click();
    //}
    //commentOnOffButton.click();
    setIsSeeking(false);
  };
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValueChanged(true);
      setValue(e.target.value);
    },
    [value],
  );
  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      setValueChanged(true);
      const time = str2time(value);
      if (e.key === "Enter" && time !== undefined) {
        (e.target as HTMLInputElement).blur();
      }
    },
    [value],
  );
  const onInputBlur = useCallback(() => {
    if (isValueChanged) {
      const time = str2time(value);
      if (time !== undefined) {
        void updateTime(time, !!value.match(/^[+-]/));
      }
    }
    requestAnimationFrame(updateCurrentTime);
  }, [value]);
  const updateCurrentTime = () => {
    if (document.activeElement === timeInputElement.current) {
      setValueChanged(false);
      return;
    }
    setValue(time2str(window.__videoplayer.currentTime()));
    requestAnimationFrame(updateCurrentTime);
  };
  useEffect(() => updateCurrentTime(), []);

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
              <button
                type="button"
                className={Styles.row}
                onClick={() => void updateTime(data)}
              >
                +{data.toFixed(2)}
              </button>
              <button
                type="button"
                className={Styles.row}
                onClick={() => void updateTime(data * -1)}
              >
                -{data.toFixed(2)}
              </button>
            </div>
          );
        })}
      </div>
    </Spoiler>
  );
};
