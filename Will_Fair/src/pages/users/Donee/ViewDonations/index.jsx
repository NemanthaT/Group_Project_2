import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DoneeDonationsView } from "./screens/DoneeDonationsView/DoneeDonationsView";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <DoneeDonationsView />
  </StrictMode>,
);