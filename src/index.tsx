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
    const Header = (await import("@/components/Header"))
      .default as unknown as () => JSX.Element;
    const Main = (await import("@/components/Main"))
      .default as unknown as () => JSX.Element;
    const Footer = (await import("@/components/Footer"))
      .default as unknown as () => JSX.Element;
    const HeaderElement = document.createElement("div");
    mainContainer.before(HeaderElement);
    const MainElement = document.createElement("div");
    mainContainerPlayer.appendChild(MainElement);
    const FooterElement = document.createElement("div");
    mainContainer.after(FooterElement);
    console.log(Header, Main, Footer);
    const HeaderRoot = createRoot(HeaderElement),
      MainRoot = createRoot(MainElement),
      FooterRoot = createRoot(FooterElement);
    HeaderRoot.render(<Header />);
    MainRoot.render(<Main />);
    FooterRoot.render(<Footer />);
  };
  void init();
};
