import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Context from "@/components/Context";
import Footer from "@/components/Footer";
import getElements from "@/libraries/getElements";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { layer } from "@/@types/types";
import sleep from "@/libraries/sleep";

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

const init = async () => {
  let mainContainer,
    mainContainerPlayer,
    videoSymbolContainerCanvas,
    count = 0;
  while (count < 30) {
    mainContainer = document.getElementsByClassName(
      "MainContainer"
    )[0] as HTMLDivElement;
    mainContainerPlayer = mainContainer?.getElementsByClassName(
      "MainContainer-player"
    )[0] as HTMLDivElement;
    videoSymbolContainerCanvas = document.getElementsByClassName(
      "VideoSymbolContainer-canvas"
    )[0] as HTMLCanvasElement;
    count++;
    if (
      mainContainerPlayer === undefined ||
      videoSymbolContainerCanvas === undefined
    ) {
      await sleep(100);
    } else {
      break;
    }
  }
  if (
    mainContainer === undefined ||
    mainContainerPlayer === undefined ||
    videoSymbolContainerCanvas === undefined
  ) {
    throw new Error("fail to get required element");
  }
  const HeaderElement = document.createElement("div");
  mainContainer.before(HeaderElement);
  const MainElement = document.createElement("div");
  mainContainerPlayer.appendChild(MainElement);
  const FooterElement = document.createElement("div");
  mainContainer.after(FooterElement);
  const LayerElement = document.createElement("div");
  videoSymbolContainerCanvas.after(LayerElement);
  HeaderElement.id = "dansk:HeaderElement";
  MainElement.id = "dansk:MainElement";
  FooterElement.id = "dansk:FooterElement";
  LayerElement.id = "dansk:LayerElement";
  const ReactRootElement = document.createElement("div");
  document.body.append(ReactRootElement);
  const ReactRoot = createRoot(ReactRootElement);
  ReactRoot.render(<Root />);
};
void init();
