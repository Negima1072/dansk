import React, { useState } from "react";
import Styles from "./Spoiler.module.scss";
import SpoilerButton from "@/components/spoiler/SpoilerButton";

type propType = {
  text: string;
  children: React.ReactNode;
};

const Spoiler: React.FC<propType> = (props) => {
  const [spoilerOpen, setSpoilerOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <SpoilerButton
        open={spoilerOpen}
        text={props.text}
        click={() => setSpoilerOpen(!spoilerOpen)}
      />
      {spoilerOpen ? (
        <div className={Styles.container}>{props.children}</div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Spoiler;
