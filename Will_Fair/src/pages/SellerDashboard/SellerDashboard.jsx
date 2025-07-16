import { Routes, Route } from "react-router-dom";
import SellerDashboardMain from "./SellerDashboardMain"; 
import SellerDashboardLayout from "./SellerDashboardLayout"; 
import Orders from "./Orders/Orders";
// Add other tab components as needed

import "./SellerDashboard.css";

function SellerDashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellerDashboardLayout />}>
          <Route index element={<SellerDashboardMain />} /> 
          <Route path="dashboard" element={<SellerDashboardMain />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default SellerDashboard;