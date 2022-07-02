import React from "react";
import { createRoot } from "react-dom/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
window.onload = () => {
  //const myExtUrl: string = (chrome || browser).runtime.getURL('');
  const mainContainer = document.getElementsByClassName(
    "MainContainer"
  )[0] as HTMLDivElement;

  const HeaderElement = document.createElement("div");
  mainContainer.before(HeaderElement);
  const FooterElement = document.createElement("div");
  mainContainer.after(FooterElement);
  const HeaderRoot = createRoot(HeaderElement),
    FooterRoot = createRoot(FooterElement);
  HeaderRoot.render(<Header />);
  FooterRoot.render(<Footer />);
};
