import React, { useCallback, useContext } from "react";
import Spoiler from "@/components/spoiler/Spoiler";
import Styles from "./CommandBox.module.scss";
import Button from "@/components/button/Button";
import { context } from "@/components/Context";

import Commands from "./CommandBox.json";

const CommandBox = () => {
  const { CommentCommandInput } = useContext(context);
  const update = useCallback((value: string) => {
    if (value === "delete") {
      CommentCommandInput.value = "";
    } else {
      if (!CommentCommandInput.value.match(/^.*\s$/))
        CommentCommandInput.value += " ";
      CommentCommandInput.value += `${value} `;
    }
    return;
  }, []);
  return (
    <Spoiler text={"Main"}>
      <div className={Styles.table}>
        {Commands.map((rowData, rowKey) => {
          return (
            <div className={Styles.row} key={`${Styles.table}-${rowKey}`}>
              {rowData.map((groupData, groupKey) => {
                return (
                  <div
                    className={Styles.group}
                    key={`${Styles.table}-${rowKey}-${groupKey}`}
                  >
                    {groupData.map((itemData, itemKey) => {
                      return (
                        <Button
                          click={update}
                          text={itemData.text}
                          value={itemData.value}
                          type={
                            itemData.text.match(/^#[0-9A-F]{6}$/)
                              ? "color"
                              : "string"
                          }
                          key={`${Styles.table}-${rowKey}-${groupKey}-${itemKey}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Spoiler>
  );
};
export default CommandBox;
