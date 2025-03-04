import { useAtom } from "jotai";

import { useLocation } from "@/hooks/useLocation";
import { elementAtom } from "@/libraries/atoms";
import { getBaseElements, getElements } from "@/libraries/getElements";
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
          if (!document.body.contains(elements.LayerElement)) {
            resolve();
            return;
          }
          setTimeout(check, 1000);
        };
        check();
      });
      setElements(await getElements());
      const { mainContainer, videoElement } = await getBaseElements();
      initVideoPlayer(mainContainer, videoElement);
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
