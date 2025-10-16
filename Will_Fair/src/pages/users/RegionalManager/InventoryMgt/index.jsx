import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RegionalManager } from "./screens/RegionalManager";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <RegionalManager />
  </StrictMode>,
);