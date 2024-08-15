import { useEffect, useState } from "react";

const useLocation = () => {
  const [currentHref, setCurrentHref] = useState(window.location.href);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentHref(window.location.href);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  return currentHref;
};

export { useLocation };
