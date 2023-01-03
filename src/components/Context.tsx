import React, { createContext } from "react";
import { contextProps, contextTypeNullable } from "@/@types/types";

export const context = createContext<contextTypeNullable>({});

/**
 * 共通コンテクスト
 * @param props
 * @constructor
 */
const Context = (props: contextProps): JSX.Element => {
  return (
    <context.Provider value={props.value || {}}>
      {props.children}
    </context.Provider>
  );
};

export { Context };
