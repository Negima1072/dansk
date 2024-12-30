import { createRoot } from "react-dom/client";

import { Root } from "./Root";

const init = () => {
  const root = document.getElementById("root");
  if (!root) return;
  createRoot(root).render(<Root />);
};

void init();
