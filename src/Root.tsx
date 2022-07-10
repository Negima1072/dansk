import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Context from "@/components/Context";
import Footer from "@/components/Footer";
import getElements from "@/libraries/getElements";
import Header from "@/components/Header";
import Main from "@/components/Main";
import sleep from "@/libraries/sleep";

const Root = (): JSX.Element => {
  const [data, setData] = useState({}),
    [exportLayer, setExportLayer] = useState<string[]>([]);
  useEffect(() => console.log("root", exportLayer), [exportLayer]);
  useEffect(() => {
    const init = async () => setData({ ...(await getElements()) });
    void init();
  }, []);
  return (
    <Context value={{ ...data, exportLayer, setExportLayer }}>
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
    videoContainer,
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
    videoContainer = document.getElementsByClassName(
      "InView VideoContainer"
    )[0] as HTMLDivElement;
    count++;
    if (
      mainContainerPlayer === undefined ||
      videoSymbolContainerCanvas === undefined ||
      videoContainer === undefined
    ) {
      await sleep(100);
    } else {
      break;
    }
  }
  if (
    mainContainer === undefined ||
    mainContainerPlayer === undefined ||
    videoSymbolContainerCanvas === undefined ||
    videoContainer === undefined
  ) {
    throw new Error("fail to get required element");
  }
  videoContainer.addEventListener(
    "scroll",
    (e) => {
      (e.target as HTMLDivElement).scroll(0, 0);
    },
    { passive: false }
  );
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
