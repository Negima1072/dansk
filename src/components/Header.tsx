import React, { useContext } from "react";
import { context } from "@/components/Context";
import ReactDOM from "react-dom";

const Header = (): JSX.Element => {
  const { HeaderElement } = useContext(context);
  if (!HeaderElement) return <></>;
  return ReactDOM.createPortal(<></>, HeaderElement);
};
export default Header;
