import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landingPage/LandingPage";
import FeaturedContent from "./pages/landingPage/FeaturedContent";
import Reg from "./pages/signIn/Reg";
import MarketplaceHomepage from "./pages/MarketPlace/MarketplaceHomepage";
import Users from "./pages/users/users";
import AppRoutes from "./components/AppRoutes";
import IndividualProductsView from "./pages/MarketPlace/IndividualProductsView";

const feat = "/featured";

function App() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);
  return (
    <Router>
      {(user == null || user.role !== "auth_manager") && <Header user={user} />}
      <main>
<<<<<<< HEAD
        <AppRoutes user={user}/>
=======
        {/* <AppRoutes user={user} /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={feat} element={<FeaturedContent />} />
          <Route path="/loginD/*" element={<Reg />} />
          <Route path="/loginF/*" element={<Reg />} />
          <Route path="/marketplace" element={<MarketplaceHomepage />} />
          <Route path="/marketplace/product" element={<IndividualProductsView/>} />
        </Routes>
>>>>>>> rachitha
      </main>
      {(user == null || user.role !== "auth_manager") && <Footer />}
    </Router>
  );
}

export default App;
