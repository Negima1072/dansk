import React, { createContext, ReactNode } from "react";
import { backgroundDataType, layer } from "@/@types/types";

type layerContext = {
  setLayerData?: (layer: layer[]) => void;
  layerData?: layer[];
  setBackgroundData?: (data: backgroundDataType) => void;
  backgroundData?: backgroundDataType;
};

type contextProps = {
  children: ReactNode;
  value?: layerContext;
};

export const layerContext = createContext<layerContext>({});

/**
 * レイヤー用コンテクスト
 * @param props
 * @constructor
 */
const LayerContext = (props: contextProps): JSX.Element => {
  return (
    <layerContext.Provider value={props.value || {}}>
      {props.children}
    </layerContext.Provider>
  );
};

export default LayerContext;
