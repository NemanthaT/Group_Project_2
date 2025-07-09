import { CartItemsSection } from "./sections/CartItemsSection";
import "./PaymentCart.css";

const PaymentCart = () => {
  return (
    <div className="app">
      
      <main className="main-content">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <CartItemsSection />
        </div>
      </main>

    </div>
  );
};

export default PaymentCart;