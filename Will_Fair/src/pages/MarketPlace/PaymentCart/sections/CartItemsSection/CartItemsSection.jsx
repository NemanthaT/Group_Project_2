import React, { useState } from "react";

export const CartItemsSection = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "Elegant Diamond Necklace", 
      price: 2500, 
      quantity: 1,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    { 
      id: 2, 
      name: "Gold Pearl Earrings Set", 
      price: 1800, 
      quantity: 2,
      image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    { 
      id: 3, 
      name: "Silver Bracelet Collection", 
      price: 1200, 
      quantity: 3,
      image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    { 
      id: 4, 
      name: "Ruby Ring Premium", 
      price: 3200, 
      quantity: 1,
      image: "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    { 
      id: 5, 
      name: "Sapphire Pendant Chain", 
      price: 2800, 
      quantity: 2,
      image: "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Here you would typically redirect to checkout page or open checkout modal
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = 500;
  const totalAmount = subtotal + deliveryCharge;

  return (
    <div className="cart-section">
      {/* Desktop Table View */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  className="product-image"
                  alt={item.name}
                  src={item.image}
                  onError={(e) => {
                    e.target.src = "/rectangle-73-2.png";
                  }}
                />
              </td>
              <td>
                <div className="product-name">{item.name}</div>
              </td>
              <td className="price">Rs. {item.price.toFixed(2)}</td>
              <td>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="price">Rs. {(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  title="Remove item"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      {cartItems.map((item) => (
        <div key={`mobile-${item.id}`} className="cart-item-card">
          <div className="cart-item-content">
            <img
              className="cart-item-image"
              alt={item.name}
              src={item.image}
              onError={(e) => {
                e.target.src = "/rectangle-73-2.png";
              }}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">Rs. {item.price.toFixed(2)}</div>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              <button
                className="remove-btn mobile-remove"
                onClick={() => removeItem(item.id)}
                title="Remove item"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartItems.length === 0 && (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some beautiful jewelry to get started!</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          {/* Summary Section */}
          <div className="summary-section">
            <div className="summary-row">
              <span className="summary-label">Subtotal ({cartItems.length} items)</span>
              <span className="summary-amount">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery</span>
              <span className="summary-amount">Rs. {deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Total Amount</span>
              <span className="summary-amount">Rs. {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button Section */}
          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};