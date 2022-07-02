import VideoController from "@/main/VideoController";
import React, { useEffect, useState } from "react";
import Context from "@/components/Context";
import getElements from "@/libraries/getElements";

const Main = (): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    const init = async () => setData(await getElements());
    void init();
  }, []);
  return (
    <Context value={data}>
      <VideoController />
    </Context>
  );
};
export default Main;
