import tg from "@/libraries/typeGuard";
import str2time from "@/libraries/str2time";
const videoElement = (
  document.getElementById("MainVideoPlayer") as HTMLDivElement
).getElementsByTagName("video")[0] as HTMLVideoElement;
const seekToHeadButton = document.getElementsByClassName(
  "SeekToHeadButton"
)[0] as HTMLButtonElement;
window.addEventListener("message", function (event) {
  if (tg.messageEvent.timeSeek(event.data)) {
    seek(videoElement.currentTime + Number(event.data.text));
  } else if (tg.messageEvent.colorClick(event.data)) {
    document.activeElement?.dispatchEvent(new Event("blur"));
  } else if (tg.messageEvent.timeSeekInt(event.data)) {
    seek(videoElement.currentTime + event.data.int / 100);
  } else if (tg.messageEvent.timeSeekPl(event.data)) {
    if (event.data.pl[0]) seek(str2time(event.data.pl[0]) || 0);
    document.activeElement?.dispatchEvent(new Event("blur"));
  }
});
const timeField = document.getElementById("myTimeField") as HTMLInputElement;
let timeFieldFocus = false;
timeField.onfocus = () => {
  timeFieldFocus = true;
};
timeField.oninput = () => {
  timeFieldFocus = true;
};
timeField.onblur = () => {
  timeFieldFocus = false;
};
timeField.onchange = () => {
  timeFieldFocus = false;
};
timeField.onkeydown = (e) => {
  if (e.key === "Enter") {
    seek(str2time(timeField.value) || 0);
    document.activeElement?.dispatchEvent(new Event("blur"));
  }
};

const update = () => {
  timeField.disabled = videoElement.seeking;
  if (!timeFieldFocus) timeField.value = time2str(videoElement.currentTime);
  requestAnimationFrame(update);
};
update();

const time2str = (time: number): string =>
  `${("0" + Math.floor(time / 60).toString()).slice(-2)}:${(
    "0" + Math.floor(time % 60).toString()
  ).slice(-2)}.${("0" + Math.floor((time % 60) / 100).toString()).slice(-2)}`;

const seek = (time: number) => {
  if (time < 0) time = 0;
  if (time > videoElement.duration) time = videoElement.duration;
  seekToHeadButton.click();
  videoElement.currentTime = time + 0.001;
};
