import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { layerContext } from "@/components/LayerContext";
import Layer from "@/components/layer/Layer";

const LayerScale = styled.div<{ scaleX: number; scaleY: number }>`
  transform: scale(${(props) => props.scaleX}, ${(props) => props.scaleY});
  position: absolute;
  top: 0;
  left: 0;
`;

/**
 * レイヤー全体を管理
 * @constructor
 */
const LayerContainer = (): JSX.Element => {
  const { layerData } = useContext(layerContext);
  const observerCallback = () => {
    if (
      !targetNode.current ||
      !targetNode.current.parentElement ||
      !targetNode.current.parentElement.parentElement
    )
      return;
    const target = targetNode.current.parentElement.parentElement;
    setScale({ x: target.clientWidth / 640, y: target.clientHeight / 360 });
  };
  const [observer] = useState<MutationObserver>(
      new MutationObserver(observerCallback)
    ),
    [scale, setScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 }),
    targetNode = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !targetNode.current ||
      !targetNode.current.parentElement ||
      !targetNode.current.parentElement.parentElement
    )
      return;
    observer.observe(targetNode.current.parentElement.parentElement, {
      attributes: true,
      childList: false,
      subtree: false,
    });
  }, [targetNode]);
  useEffect(() => observerCallback(), [document.body.classList]);
  return (
    <LayerScale ref={targetNode} scaleX={scale.x} scaleY={scale.y}>
      {layerData?.map((data, key) => {
        return <Layer key={key} id={key} data={data} />;
      })}
    </LayerScale>
  );
};
export default LayerContainer;
