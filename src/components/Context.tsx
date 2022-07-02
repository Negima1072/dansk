import React, { createContext } from "react";
import { contextProps, contextTypeNullable } from "@/@types/types";

export const context = createContext<contextTypeNullable>({});

const Parent = (props: contextProps): JSX.Element => {
  return (
    <context.Provider value={props.value || {}}>
      {props.children}
    </context.Provider>
  );
};

export default Parent;
