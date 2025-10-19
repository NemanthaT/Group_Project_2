import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/landingPage/LandingPage";
import Events from "@/pages/Events/EventsMain";
import EventDetails from "@/pages/Events/EventDetails";
import Reg from "@/pages/signIn/Reg";
import Marketplace from "@/pages/MarketPlace/MarketPlace";
import Users from "@/pages/users/users";
//import AuthManager from "@/pages/AuthManager/AuthManager";
import SellerDashboard from "@/pages/SellerDashboard/SellerDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard/BuyerDashboard";
import AuthManagerDonationDetail from "@/pages/users/AuthManager/AuthManagerDonationDetail";
import SysAdmin from "@/pages/users/SysAdmin/SysAdmin";
import RegionalManager from "@/pages/users/RegionalManager/RegionalManager";
import DonorProfile from "@/pages/users/Donor/DonorProfile/Profile";

const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Events" element={<Events user={user} />} />
      <Route path="/Events/:id" element={<EventDetails />} />
      <Route path="/loginD/*" element={<Reg />} />
      <Route path="/loginF/*" element={<Reg />} />
      <Route path="/marketplace/*" element={<Marketplace />} />
      <Route path="/sellerDashboard/*" element={<SellerDashboard />} />
      <Route path="/buyerDashboard/*" element={<BuyerDashboard />} />
      <Route path="/users/*" element={<Users />} />
      <Route path="/authmanager/donations/:id" element={<AuthManagerDonationDetail />} />
      <Route path="/sysadmin/*" element={<SysAdmin />} />
      <Route path="/regManager/*" element={<RegionalManager />} />
      <Route path="/donor/profile" element={<DonorProfile user={user} />} />
    </Routes>
  );
};

export default AppRoutes;