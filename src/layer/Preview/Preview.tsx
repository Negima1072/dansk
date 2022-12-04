import React, { useContext, useEffect, useRef } from "react";
import Styles from "./Preview.module.scss";
import { layerContext } from "@/components/LayerContext";
import NiconiComments from "@xpadev-net/niconicomments";
import layerUtil from "@/headers/layerUtil/layerUtil";
import { convertText } from "@/libraries/convert";

const Preview = () => {
  const canvas = useRef<HTMLCanvasElement>(null),
    niconicomments = useRef<NiconiComments>();
  const { layerData } = useContext(layerContext);
  useEffect(() => {
    if (!layerData || !canvas.current) return;
    const dansk = layerUtil.toString(
      layerData.filter((layer) => layer.visible)
    );
    const layerString = [];
    if (!dansk) return;
    for (const string of dansk) {
      for (const line of string.content) {
        if (string.command) {
          layerString.push(string.command + line);
          string.command = "";
        } else {
          layerString.push(line);
        }
      }
    }
    const tokome = JSON.parse(
      convertText("dansk", "tokome", layerString.join("\n"))
    );
    niconicomments.current = new NiconiComments(canvas.current, tokome, {
      format: "owner",
    });
    niconicomments.current?.drawCanvas(0);
  }, [layerData]);
  if (!layerData) return <></>;
  return (
    <canvas width={1920} height={1080} className={Styles.canvas} ref={canvas} />
  );
};
export { Preview };
