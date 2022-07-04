import React from "react";
import { createRoot } from "react-dom/client";
window.onload = () => {
  //const myExtUrl: string = (chrome || browser).runtime.getURL('');
  const init = async () => {
    const mainContainer = document.getElementsByClassName(
        "MainContainer"
      )[0] as HTMLDivElement,
      mainContainerPlayer = mainContainer.getElementsByClassName(
        "MainContainer-player"
      )[0] as HTMLDivElement;
    const Root = (await import("@/Root"))
      .default as unknown as () => JSX.Element;
    const HeaderElement = document.createElement("div");
    mainContainer.before(HeaderElement);
    const MainElement = document.createElement("div");
    mainContainerPlayer.appendChild(MainElement);
    const FooterElement = document.createElement("div");
    mainContainer.after(FooterElement);
    HeaderElement.id = "dansk:HeaderElement";
    MainElement.id = "dansk:MainElement";
    FooterElement.id = "dansk:FooterElement";
    const ReactRootElement = document.createElement("div");
    document.body.append(ReactRootElement);
    const ReactRoot = createRoot(ReactRootElement);
    ReactRoot.render(<Root />);
  };
  void init();
};
