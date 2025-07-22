import { Routes, Route } from "react-router-dom";
import MarketplaceHomepage from "./MarketplaceHomepage";
import PaymentCart from "./PaymentCart/PaymentCart";
import "./MarketPlace.css";

function MarketPlace () {
  return (
<<<<<<< HEAD
    <div>
      <Routes>
        <Route path="/" element={<MarketplaceHomepage />} />
        <Route path="/paymentCart" element={<PaymentCart />} />
      </Routes>
    </div>
  );
}
=======
    <>
      <div className="mark">
        <h1 >Welcome to the Marketplace</h1>
        <p className="text-lg">
          Explore a wide range of products and services.
        </p>
      </div>
    </>
  );}
>>>>>>> rachitha

export default MarketPlace;
