import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landingPage/LandingPage";
import FeaturedContent from "./pages/landingPage/FeaturedContent";
import Reg from "./pages/signIn/Reg";
import MarketplaceHomepage from "./pages/MarketPlace/MarketplaceHomepage";
import Users from "./pages/users/users";

const feat = "/featured";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={feat} element={<FeaturedContent />} />
          <Route path="/loginD/*" element={<Reg />} />
          <Route path="/loginF/*" element={<Reg />} />
          <Route path="/marketplace" element={<MarketplaceHomepage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
