import React, { useEffect, useState } from "react";
import Context from "@/components/Context";
import CommandBox from "@/footers/CommandBox";
import getElements from "@/libraries/getElements";

const Footer = (): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    const init = async () => setData(await getElements());
    void init();
  }, []);
  return (
    <Context value={data}>
      <CommandBox />
    </Context>
  );
};
export default Footer;
