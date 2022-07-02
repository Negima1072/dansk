import React from "react";
import { createRoot } from "react-dom/client";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
window.onload = () => {
  //const myExtUrl: string = (chrome || browser).runtime.getURL('');
  const mainContainer = document.getElementsByClassName(
      "MainContainer"
    )[0] as HTMLDivElement,
    mainContainerPlayer = mainContainer.getElementsByClassName(
      "MainContainer-player"
    )[0] as HTMLDivElement;

  const HeaderElement = document.createElement("div");
  mainContainer.before(HeaderElement);
  const MainElement = document.createElement("div");
  mainContainerPlayer.appendChild(MainElement);
  const FooterElement = document.createElement("div");
  mainContainer.after(FooterElement);
  const HeaderRoot = createRoot(HeaderElement),
    MainRoot = createRoot(MainElement),
    FooterRoot = createRoot(FooterElement);
  HeaderRoot.render(<Header />);
  MainRoot.render(<Main />);
  FooterRoot.render(<Footer />);
};
