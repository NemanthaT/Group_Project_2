import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
/*import LandingPage from "./pages/landingPage/LandingPage";
import FeaturedContent from "./pages/landingPage/FeaturedContent";
import Reg from "./pages/signIn/Reg";
import MarketplaceHomepage from "./pages/MarketPlace/MarketplaceHomepage";
import Users from "./pages/users/users";*/
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
