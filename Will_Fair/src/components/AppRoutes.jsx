import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import FeaturedContent from "../pages/landingPage/FeaturedContent";
import Reg from "../pages/signIn/Reg";
import MarketplaceHomepage from "../pages/MarketPlace/MarketplaceHomepage";
import Users from "../pages/users/users";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/featured/*" element={<FeaturedContent />} />
      <Route path="/loginD/*" element={<Reg />} />
      <Route path="/loginF/*" element={<Reg />} />
      <Route path="/marketplace/*" element={<MarketplaceHomepage />} />
      <Route path="/users/*" element={<Users />} />

    </Routes>
  );
};

export default AppRoutes;