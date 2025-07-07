import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Individual } from "./screens/Individual";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Individual />
  </StrictMode>,
);