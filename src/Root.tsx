import React, { useEffect, useState } from "react";
import Context from "@/components/Context";
import Footer from "@/components/Footer";
import getElements from "@/libraries/getElements";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { layer } from "@/@types/types";

const Root = (): JSX.Element => {
  const [data, setData] = useState({}),
    [exportLayer, setExportLayer] = useState<layer[]>([]);
  useEffect(() => {
    const init = async () =>
      setData({ ...(await getElements()), exportLayer, setExportLayer });
    void init();
  }, []);
  return (
    <Context value={data}>
      <Header />
      <Main />
      <Footer />
    </Context>
  );
};
export default Root;
