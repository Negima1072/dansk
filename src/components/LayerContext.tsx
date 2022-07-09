import React, { createContext, ReactNode } from "react";
import { layer } from "@/@types/types";

type layerContext = {
  setLayerData?: (layer: layer[]) => void;
  layerData?: layer[];
};

type contextProps = {
  children: ReactNode;
  value?: layerContext;
};

export const layerContext = createContext<layerContext>({});

const Parent = (props: contextProps): JSX.Element => {
  return (
    <layerContext.Provider value={props.value || {}}>
      {props.children}
    </layerContext.Provider>
  );
};

export default Parent;
