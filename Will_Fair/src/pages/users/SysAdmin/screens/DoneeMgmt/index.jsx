import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminDashboard } from "./screens/AdminDashboard";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>
);