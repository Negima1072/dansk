import React, { useCallback, useContext, useEffect, useState } from "react";
import { Spoiler } from "@/components/spoiler/Spoiler";
import Styles from "./CommandBox.module.scss";
import { Button } from "@/components/button/Button";
import { context } from "@/components/Context";

import { Commands } from "./CommandBox.Commands";
import { typeGuard } from "@/libraries/typeGuard";

/**
 * コマンドパレット
 * @constructor
 */
const CommandBox = () => {
  const { commentCommandInput, commentInputTextarea } = useContext(context),
    [commands, setCommands] = useState<string[]>([]);
  const commandOnChange = () => {
    if (commentCommandInput && commands.join(" ") !== commentCommandInput.value)
      setCommands(
        commentCommandInput.value.split(" ").filter((str) => str !== "")
      );
  };
  useEffect(() => {
    if (commentCommandInput) {
      commentCommandInput.addEventListener("change", commandOnChange);
    }
    return () => {
      commentCommandInput?.removeEventListener("change", commandOnChange);
    };
  }, [commentCommandInput, commands]);
  const update = useCallback(
    (value: string) => {
      if (
        !(
          typeGuard.context.commentCommandInput(commentCommandInput) &&
          typeGuard.context.commentInputTextarea(commentInputTextarea)
        )
      )
        return;
      const command = value.match(/^dansk:(.*)$/);
      let currentCommands = commands;
      if (command) {
        switch (command[1]) {
          case "deleteCommand":
            commentCommandInput.value = "";
            commentCommandInput.dispatchEvent(
              new Event("change", { bubbles: true })
            );
            setCommands([]);
            break;
          case "deleteComment":
            commentInputTextarea.value = "";
            commentInputTextarea.dispatchEvent(
              new Event("change", { bubbles: true })
            );
            break;
          default:
            break;
        }
      } else {
        if (currentCommands.join(" ") !== commentCommandInput.value)
          currentCommands = commentCommandInput.value
            .split(" ")
            .filter((str) => str !== "");
        if (commands.includes(value)) {
          currentCommands = currentCommands.filter((item) => item !== value);
        } else {
          const group = getGroupFromItem(value);
          if (!group) return;
          const items = getItemsFromGroup(group);
          currentCommands = currentCommands.filter(
            (item) => !items.includes(item)
          );
          currentCommands = [...currentCommands, value];
        }
        commentCommandInput.value = currentCommands.join(" ");
        commentCommandInput.dispatchEvent(
          new Event("change", { bubbles: true })
        );
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
                          active={commands.includes(itemData.value)}
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

const getGroupFromItem = (value: string): string | undefined => {
  for (const row of Commands) {
    for (const block of row) {
      for (const item of block) {
        if (item.value === value) return item.group;
      }
    }
  }
  return undefined;
};
const getItemsFromGroup = (group: string): string[] => {
  const result: string[] = [];
  for (const row of Commands) {
    for (const block of row) {
      for (const item of block) {
        if (item.group === group) result.push(item.value);
      }
    }
  }
  return result;
};
export { CommandBox };
