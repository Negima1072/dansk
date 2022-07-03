import React, { useEffect, useState } from "react";
import Context from "@/components/Context";
import Footer from "@/components/Footer";
import getElements from "@/libraries/getElements";
import Header from "@/components/Header";
import Main from "@/components/Main";

const Root = (): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    const init = async () => setData(await getElements());
    void init();
  }, []);
  console.log(data);
  /*
    return( <Context value={data}>
        <CommandBox />
      </Context>
     );*/
  return (
    <Context value={data}>
      <Header />
      <Main />
      <Footer />
    </Context>
  );
};
export default Root;
