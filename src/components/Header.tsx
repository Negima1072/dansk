import React, { useContext } from "react";
import { context } from "@/components/Context";
import ReactDOM from "react-dom";
import Trace from "@/headers/Trace";

const Header = (): JSX.Element => {
  const { HeaderElement } = useContext(context);
  if (!HeaderElement) return <></>;
  return ReactDOM.createPortal(
    <>
      <Trace />
    </>,
    HeaderElement
  );
};
export default Header;
