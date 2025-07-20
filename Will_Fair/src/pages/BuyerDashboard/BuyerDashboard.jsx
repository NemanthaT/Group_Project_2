import { Routes, Route } from "react-router-dom";
import BuyerDashboardMain from "./BuyerDashboardMain"; 
import BuyerDashboardLayout from "./BuyerDashboardLayout"; 
import Orders from "./Orders";
import BuyerHistory from "./BuyerHistory";
import Wishlist from "./Wishlist";
import Settings from "./Settings";

import "./BuyerDashboard.css";

function BuyerDashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BuyerDashboardLayout />}>
          <Route index element={<BuyerDashboardMain />} /> 
          <Route path="dashboard" element={<BuyerDashboardMain />} />
          <Route path="orders" element={<Orders />} />
          <Route path="history" element={<BuyerHistory />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default BuyerDashboard;
