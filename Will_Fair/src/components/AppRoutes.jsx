import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import FeaturedContent from "../pages/landingPage/FeaturedContent";
import Reg from "../pages/signIn/Reg";
import Marketplace from "../pages/MarketPlace/MarketPlace";
import Users from "../pages/users/users";
import AuthManager from "../pages/AuthManager/AuthManager";
import SellerDashboard from "../pages/SellerDashboard/SellerDashboard";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/featured/*" element={<FeaturedContent />} />
      <Route path="/loginD/*" element={<Reg />} />
      <Route path="/loginF/*" element={<Reg />} />
      <Route path="/marketplace/*" element={<Marketplace />} />
      <Route path="/sellerDashboard/*" element={<SellerDashboard />} />
      <Route path="/authManager" element={<AuthManager />} />
      <Route path="/users/*" element={<Users />} />

    </Routes>
  );
};

export default AppRoutes;