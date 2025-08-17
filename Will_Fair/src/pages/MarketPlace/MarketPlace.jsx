import { Routes, Route } from "react-router-dom";
import MarketplaceHomepage from "./MarketplaceHomepage";
import IndividualProductsView from "./IndividualProductsView";
import PaymentCart from "./PaymentCart/PaymentCart";
import "./MarketPlace.css";

function MarketPlace () {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MarketplaceHomepage />} />
        <Route path="/product" element={<IndividualProductsView/>} />
        <Route path="/paymentCart" element={<PaymentCart />} />
      </Routes>
    </div>
  );
}

export default MarketPlace;
