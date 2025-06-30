import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landingPage/LandingPage";
import FeaturedContent from "./pages/landingPage/FeaturedContent";
import Reg from "./pages/signIn/Reg";
//import MarketPlace from "./pages/MarketPlace/MarketPlace";
import MarketPlaceHomepage from "./pages/MarketPlace/MarketplaceHomepage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/featured" element={<FeaturedContent />} />
          <Route path="/loginD/*" element={<Reg />} />
          <Route path="/loginF/*" element={<Reg />} />
          <Route path="/marketplace" element={<MarketPlace/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
