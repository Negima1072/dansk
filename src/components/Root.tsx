import { useAtom } from "jotai";

import { useLocation } from "@/hooks/useLocation";
import { elementAtom } from "@/libraries/atoms";
import {
  getElements,
  getMainContainer,
  getVideoElement,
} from "@/libraries/getElements";
import { initVideoPlayer } from "@/libraries/videoPlayerApi";
import "@/assets/global.scss";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { MemoPortal } from "./MemoPortal";

export const Root = () => {
  const [elements, setElements] = useAtom(elementAtom);
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      if (!elements) {
        setElements(await getElements());
        return;
      }
      await new Promise<void>((resolve) => {
        const check = () => {
          console.log(
            document.body.contains(elements.LayerElement),
            document.getElementById("dansk:LayerElement"),
          );
          if (!document.body.contains(elements.LayerElement)) {
            resolve();
            return;
          }
          setTimeout(check, 1000);
        };
        check();
      });
      setElements(await getElements());
      initVideoPlayer(getMainContainer(), getVideoElement());
    };
    void init();
  }, [location]);
  return (
    <>
      <Header />
      <Main />
      <MemoPortal />
      <Footer />
    </>
  );
};
