import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IndividualDonation } from "./components/IndividualDonation";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <IndividualDonation />
  </StrictMode>,
);