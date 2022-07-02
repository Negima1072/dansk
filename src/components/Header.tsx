import React, { useEffect, useState } from "react";
import Context from "@/components/Context";
import getElements from "@/libraries/getElements";

const Header = (): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    const init = async () => setData(await getElements());
    void init();
  }, []);
  return (
    <Context value={data}>
      <></>
    </Context>
  );
};
export default Header;
