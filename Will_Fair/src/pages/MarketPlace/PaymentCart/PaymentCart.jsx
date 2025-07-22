import CartItemsSection from "./sections/CartItemsSection/CartItemsSection";
import "./PaymentCart.css";

const PaymentCart = () => {
  return (
      
      <main className="main-content-cart">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <CartItemsSection />
        </div>
      </main>

  );
};

export default PaymentCart;