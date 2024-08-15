import { useEffect, useState } from "react";

const useLocation = () => {
  const [currentHref, setCurrentHref] = useState(window.location.href);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentHref(window.location.href);
    };

    const originalPushState = window.history.pushState;
    window.history.pushState = function (
      data: unknown,
      ununsed: string,
      url?: string | URL | null,
    ) {
      originalPushState.apply(this, [data, ununsed, url]);
      handleLocationChange();
    };
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (
      data: unknown,
      ununsed: string,
      url?: string | URL | null,
    ) {
      originalReplaceState.apply(this, [data, ununsed, url]);
      handleLocationChange();
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
