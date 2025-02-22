import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<RouterState["location"]>(
    window.__remixRouter.state.location,
  );
  useEffect(() => {
    const unsubscribe = window.__remixRouter.subscribe((state) => {
      setLocation(state.location);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return location;
};
