import React, { useCallback, useContext, useState } from "react";
import Spoiler from "@/components/spoiler/Spoiler";
import Styles from "./CommandBox.module.scss";
import Button from "@/components/button/Button";
import { context } from "@/components/Context";

import Commands from "./CommandBox.json";
import tg from "@/libraries/typeGuard";

const CommandBox = () => {
  const { commentCommandInput } = useContext(context),
    [commands, setCommands] = useState<string[]>([]);
  const update = useCallback(
    (value: string) => {
      if (!tg.context.commentCommandInput(commentCommandInput)) return;
      const command = value.match(/^dansk:(.*)$/);
      let currentCommands = commands;
      if (command) {
        switch (command[1]) {
          case "delete":
            commentCommandInput.value = "";
            setCommands([]);
            break;
          default:
            break;
        }
      } else {
        if (currentCommands.join(" ") !== commentCommandInput.value)
          currentCommands = commentCommandInput.value.split(" ");
        if (!commands.includes(value))
          currentCommands = [...currentCommands, value];
        commentCommandInput.value = currentCommands.join(" ");
        setCommands(currentCommands);
      }
      return;
    },
    [commands, commentCommandInput]
  );

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
