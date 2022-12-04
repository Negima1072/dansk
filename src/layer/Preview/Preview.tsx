import React, { useContext, useEffect, useRef } from "react";
import Styles from "./Preview.module.scss";
import { layerContext } from "@/components/LayerContext";
import NiconiComments from "@xpadev-net/niconicomments";
import layerUtil from "@/headers/layerUtil/layerUtil";

const Preview = () => {
  const canvas = useRef<HTMLCanvasElement>(null),
    niconicomments = useRef<NiconiComments>();
  const { layerData } = useContext(layerContext);
  useEffect(() => {
    if (!layerData || !canvas.current) return;
    const target = layerData
      .filter((layer) => layer.visible)
      .map((layer) => {
        return {
          ...layer,
          content: layer.content.map((value) => {
            while (value.content.length < value.lineCount) {
              value.content.push("");
            }
            while (value.content.length > value.lineCount) {
              value.content[value.lineCount - 1] += value.content
                .splice(value.lineCount)
                .join("");
            }
            return value;
          }),
        };
      });
    const dansk = layerUtil.toString(target, false, false, true);
    if (!dansk) return;
    const formatted: formattedComment[] = [];
    dansk.forEach((string, index) => {
      for (const line of string.content) {
        formatted.push({
          id: 0,
          vpos: 0,
          layer: index,
          content: line
            .replace(/\[tb]/g, "\t")
            .replace(/\[03]/g, "　")
            .replace(/\[0A]/g, "")
            .replace(/<br>/g, "\n"),
          date: new Date().getDate() / 1000,
          date_usec: 0,
          owner: true,
          premium: true,
          mail: string.command.split(/\s/),
          user_id: 0,
        });
      }
    });
    niconicomments.current = new NiconiComments(canvas.current, formatted, {
      format: "formatted",
    });
    niconicomments.current?.drawCanvas(0);
  }, [layerData]);
  if (!layerData) return <></>;
  return (
    <canvas width={1920} height={1080} className={Styles.canvas} ref={canvas} />
  );
};
export { Preview };
