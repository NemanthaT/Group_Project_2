import { Routes, Route } from "react-router-dom";
import SellerDashboardMain from "./SellerDashboardMain"; 
import SellerDashboardLayout from "./SellerDashboardLayout"; 
import Orders from "./Orders/Orders";
import Inventory from "./Inventory/Inventory";
import Reviews from "./Reviews/Reviews";
import Profile from "./Profile/Profile";
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
          <Route path="inventory" element={<Inventory />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default SellerDashboard;