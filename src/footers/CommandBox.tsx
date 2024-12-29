import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { elementAtom } from "@/atoms";
import { Button } from "@/components/button/Button";
import { Spoiler } from "@/components/spoiler/Spoiler";
import {
  updateReactHTMLInput,
  updateReactHTMLTextArea,
} from "@/libraries/elementUtil";

import { Commands } from "./CommandBox.Commands";
import Styles from "./CommandBox.module.scss";

/**
 * コマンドパレット
 * @constructor
 */
const CommandBox = () => {
  const [elements] = useAtom(elementAtom);
  const [commands, setCommands] = useState<string[]>([]);
  const commandOnChange = () => {
    if (
      elements?.commentCommandInput &&
      commands.join(" ") !== elements.commentCommandInput.value
    )
      setCommands(
        elements.commentCommandInput.value
          .split(" ")
          .filter((str) => str !== ""),
      );
  };
  useEffect(() => {
    if (elements) {
      elements.commentCommandInput.addEventListener("change", commandOnChange);
    }
    return () => {
      elements?.commentCommandInput.removeEventListener(
        "change",
        commandOnChange,
      );
    };
  }, [elements, commands]);
  const update = useCallback(
    (value: string) => {
      if (!elements) return;
      const command = value.match(/^dansk:(.*)$/);
      let currentCommands = commands;
      if (command) {
        switch (command[1]) {
          case "deleteCommand":
            updateReactHTMLInput(elements.commentCommandInput, "");
            setCommands([]);
            break;
          case "deleteComment":
            updateReactHTMLTextArea(elements.commentInputTextarea, "");
            break;
          default:
            break;
        }
      } else {
        if (currentCommands.join(" ") !== elements.commentCommandInput.value)
          currentCommands = elements.commentCommandInput.value
            .split(" ")
            .filter((str) => str !== "");
        if (commands.includes(value)) {
          currentCommands = currentCommands.filter((item) => item !== value);
        } else {
          const group = getGroupFromItem(value);
          if (!group) return;
          const items = getItemsFromGroup(group);
          currentCommands = currentCommands.filter(
            (item) => !items.includes(item),
          );
          currentCommands = [...currentCommands, value];
        }
        updateReactHTMLInput(
          elements.commentCommandInput,
          currentCommands.join(" "),
        );
        setCommands(currentCommands);
      }
    },
    [commands, elements],
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
