import { Button } from "@/components/common/button/Button";
import { Dropdown } from "@/components/common/dropdown/Dropdown";
import { Popup } from "@/components/common/popup/Popup";

import { convertText } from "@/libraries/convert";
import { str2time, time2str } from "@/libraries/timeUtil";
import { typeGuard } from "@/libraries/typeGuard";
import Styles from "./LoadJSON.module.scss";

type propType = {
  textareaValue: string[];
  setTextareaValue: (value: string[]) => void;
  close: () => void;
};

export const LoadJSON = (props: propType) => {
  const [jsonTextAreaValue, setJsonTextAreaValue] = useState<string>("[]");
  const [timeMode, setTimeMode] = useState<"abs" | "plus" | "minus">("abs");
  const [timeValue, setTimeValue] = useState<string>("00:00.00");
  const [gapValue, setGapValue] = useState<string>("00:00.00");
  const jsonAcceptable = useMemo(() => {
    try {
      const data = JSON.parse(jsonTextAreaValue);
      return typeGuard.owner.comments(data);
    } catch {
      return false;
    }
  }, [jsonTextAreaValue]);
  const timeValueAcceptable = useMemo(() => {
    return str2time(timeValue) !== undefined;
  }, [timeValue]);
  const gapValueAcceptable = useMemo(() => {
    return str2time(gapValue) !== undefined;
  }, [gapValue]);
  const handleApplyTime = useCallback(() => {
    const data = JSON.parse(jsonTextAreaValue);
    if (!typeGuard.owner.comments(data)) return;
    for (const line of data) {
      const beforeTime = str2time(line.time) ?? 0;
      const changeTime = str2time(timeValue) ?? 0;
      let afterTime = 0;
      if (timeMode === "abs") {
        afterTime = changeTime;
      }
      if (timeMode === "plus") {
        afterTime = beforeTime + changeTime;
      }
      if (timeMode === "minus") {
        afterTime = beforeTime - changeTime;
      }
      if (afterTime < 0) afterTime = 0;
      line.time = time2str(afterTime);
    }
    setJsonTextAreaValue(JSON.stringify(data, null, 2));
  }, [jsonTextAreaValue, timeMode, timeValue]);
  const handleApplyGap = useCallback(() => {
    const data = JSON.parse(jsonTextAreaValue);
    if (!typeGuard.owner.comments(data)) return;
    for (let i = 0; i < data.length; i++) {
      const beforeTime = str2time(data[i].time) ?? 0;
      const changeTime = str2time(gapValue) ?? 0;
      const afterTime = beforeTime + changeTime * i;
      data[i].time = time2str(afterTime);
    }
    setJsonTextAreaValue(JSON.stringify(data, null, 2));
  }, [jsonTextAreaValue, gapValue]);
  const handleGetFromBox = useCallback(() => {
    setJsonTextAreaValue(
      convertText("dansk", "tokome", props.textareaValue.join("\n")),
    );
  }, [props.textareaValue]);
  const handleApplyToBox = useCallback(() => {
    const converted = convertText("tokome", "dansk", jsonTextAreaValue);
    props.setTextareaValue(converted === "" ? [] : converted.split("\n"));
  }, [jsonTextAreaValue, props.setTextareaValue]);
  return (
    <Popup title="JSON読込" close={props.close}>
      <div className={Styles.wrapper}>
        <div className={Styles.table}>
          <div className={Styles.row}>
            <textarea
              className={Styles.textarea}
              wrap="off"
              spellCheck={false}
              value={jsonTextAreaValue}
              onChange={(e) => setJsonTextAreaValue(e.target.value)}
            />
          </div>
          <div className={Styles.row}>
            <div className={Styles.block}>
              <Dropdown
                selected={timeMode}
                change={(value) =>
                  setTimeMode(value as "abs" | "plus" | "minus")
                }
                value={[
                  { text: "=", value: "abs" },
                  { text: "+", value: "plus" },
                  { text: "-", value: "minus" },
                ]}
              />
              <input
                className={Styles.timeInput}
                type="text"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
              />
              <Button
                click={handleApplyTime}
                text="時間反映"
                disabled={!jsonAcceptable || !timeValueAcceptable}
              />
            </div>
            <div className={Styles.block}>
              <input
                className={Styles.timeInput}
                type="text"
                value={gapValue}
                onChange={(e) => setGapValue(e.target.value)}
              />
              <Button
                click={handleApplyGap}
                text="ずらし反映"
                disabled={!jsonAcceptable || !gapValueAcceptable}
              />
            </div>
          </div>
          <div className={Styles.row}>
            <div className={Styles.block}>
              <Button click={handleGetFromBox} text="Boxから取得" />
              <Button
                click={handleApplyToBox}
                text="Boxへ反映"
                disabled={!jsonAcceptable}
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
