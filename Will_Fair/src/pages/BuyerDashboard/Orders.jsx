import { useState } from "react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Mock data for ongoing orders
  const ongoingOrders = [
    {
      id: 'ORD2024001',
      date: '2024-01-18',
      items: [
        { name: 'Handloom Saree', quantity: 1, price: 2300, image: '🥻' },
        { name: 'Silk Scarf', quantity: 2, price: 450, image: '🧣' }
      ],
      total: 3200,
      status: 'Processing',
      estimatedDelivery: '2024-01-25',
      seller: 'Traditional Crafts Store',
      shippingAddress: '123 Main Street, Cityville, State 12345',
      paymentMethod: 'Credit Card ending in 4567',
      trackingNumber: 'TRK123456789',
      statusHistory: [
        { status: 'Order Placed', date: '2024-01-18 10:30 AM', completed: true },
        { status: 'Payment Confirmed', date: '2024-01-18 10:35 AM', completed: true },
        { status: 'Processing', date: '2024-01-19 09:15 AM', completed: true },
        { status: 'Shipped', date: '', completed: false },
        { status: 'Out for Delivery', date: '', completed: false },
        { status: 'Delivered', date: '', completed: false }
      ]
    },
    {
      id: 'ORD2024002',
      date: '2024-01-20',
      items: [
        { name: 'Wooden Sculpture', quantity: 1, price: 1800, image: '🗿' }
      ],
      total: 1800,
      status: 'Shipped',
      estimatedDelivery: '2024-01-27',
      seller: 'Wood Works Gallery',
      shippingAddress: '123 Main Street, Cityville, State 12345',
      paymentMethod: 'Debit Card ending in 8901',
      trackingNumber: 'TRK987654321',
      statusHistory: [
        { status: 'Order Placed', date: '2024-01-20 02:15 PM', completed: true },
        { status: 'Payment Confirmed', date: '2024-01-20 02:20 PM', completed: true },
        { status: 'Processing', date: '2024-01-21 11:00 AM', completed: true },
        { status: 'Shipped', date: '2024-01-22 03:45 PM', completed: true },
        { status: 'Out for Delivery', date: '', completed: false },
        { status: 'Delivered', date: '', completed: false }
      ]
    },
    {
      id: 'ORD2024003',
      date: '2024-01-22',
      items: [
        { name: 'Ceramic Bowl Set', quantity: 1, price: 650, image: '🍜' },
        { name: 'Table Runner', quantity: 1, price: 350, image: '🏃' }
      ],
      total: 1000,
      status: 'Pending',
      estimatedDelivery: '2024-01-30',
      seller: 'Home Essentials',
      shippingAddress: '123 Main Street, Cityville, State 12345',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK456789123',
      statusHistory: [
        { status: 'Order Placed', date: '2024-01-22 11:45 AM', completed: true },
        { status: 'Payment Confirmed', date: '2024-01-22 11:50 AM', completed: true },
        { status: 'Processing', date: '', completed: false },
        { status: 'Shipped', date: '', completed: false },
        { status: 'Out for Delivery', date: '', completed: false },
        { status: 'Delivered', date: '', completed: false }
      ]
    },
    {
      id: 'ORD2024004',
      date: '2024-01-23',
      items: [
        { name: 'Embroidered Cushion Cover', quantity: 4, price: 200, image: '🛏️' }
      ],
      total: 800,
      status: 'Out for Delivery',
      estimatedDelivery: '2024-01-24',
      seller: 'Textile Paradise',
      shippingAddress: '123 Main Street, Cityville, State 12345',
      paymentMethod: 'Credit Card ending in 2345',
      trackingNumber: 'TRK789123456',
      statusHistory: [
        { status: 'Order Placed', date: '2024-01-23 09:20 AM', completed: true },
        { status: 'Payment Confirmed', date: '2024-01-23 09:25 AM', completed: true },
        { status: 'Processing', date: '2024-01-23 02:30 PM', completed: true },
        { status: 'Shipped', date: '2024-01-24 08:00 AM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-24 01:15 PM', completed: true },
        { status: 'Delivered', date: '', completed: false }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'out for delivery': return '#06b6d4';
      case 'delivered': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  const closeTrackingModal = () => {
    setShowTrackingModal(false);
    setSelectedOrder(null);
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      // Handle order cancellation logic here
      console.log('Cancelling order:', orderId);
    }
  };

  const contactSeller = (seller) => {
    // Handle contact seller logic here
    console.log('Contacting seller:', seller);
  };

  return (
    <div className="buyer-orders-content">
      <div className="buyer-content-header">
        <h1>My Orders</h1>
        <p className="buyer-subtitle">Track and manage your ongoing orders</p>
      </div>

      {/* Orders Summary */}
      <div className="buyer-orders-summary">
        <div className="buyer-summary-card">
          <h3>{ongoingOrders.length}</h3>
          <p>Active Orders</p>
        </div>
        <div className="buyer-summary-card">
          <h3>{ongoingOrders.filter(order => order.status === 'Out for Delivery').length}</h3>
          <p>Out for Delivery</p>
        </div>
        <div className="buyer-summary-card">
          <h3>{ongoingOrders.filter(order => order.status === 'Processing').length}</h3>
          <p>Processing</p>
        </div>
        <div className="buyer-summary-card">
          <h3>Rs. {ongoingOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</h3>
          <p>Total Value</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="buyer-orders-list">
        {ongoingOrders.map((order) => (
          <div key={order.id} className="buyer-order-card">
            <div className="buyer-order-header">
              <div className="buyer-order-info">
                <h3>Order {order.id}</h3>
                <p>Placed on {order.date}</p>
                <p>Seller: {order.seller}</p>
              </div>
              <div className="buyer-order-status">
                <span 
                  className="buyer-status-badge"
                  style={{ backgroundColor: getStatusColor(order.status), color: 'white' }}
                >
                  {order.status}
                </span>
                <p className="buyer-delivery-date">Expected: {order.estimatedDelivery}</p>
              </div>
            </div>

            <div className="buyer-order-items">
              {order.items.map((item, index) => (
                <div key={index} className="buyer-order-item">
                  <span className="buyer-item-image">{item.image}</span>
                  <div className="buyer-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <span className="buyer-item-total">
                    Rs. {(item.quantity * item.price).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="buyer-order-footer">
              <div className="buyer-order-total">
                <strong>Total: Rs. {order.total.toLocaleString()}</strong>
              </div>
              <div className="buyer-order-actions">
                <button 
                  className="buyer-action-btn buyer-track-btn"
                  onClick={() => handleTrackOrder(order)}
                >
                  Track Order
                </button>
                <button 
                  className="buyer-action-btn buyer-contact-btn"
                  onClick={() => contactSeller(order.seller)}
                >
                  Contact Seller
                </button>
                {(order.status === 'Pending' || order.status === 'Processing') && (
                  <button 
                    className="buyer-action-btn buyer-cancel-btn"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="buyer-modal-overlay" onClick={closeTrackingModal}>
          <div className="buyer-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="buyer-modal-header">
              <h3>Track Order {selectedOrder.id}</h3>
              <button className="buyer-modal-close-btn" onClick={closeTrackingModal}>×</button>
            </div>
            
            <div className="buyer-modal-content">
              <div className="buyer-tracking-info">
                <div className="buyer-tracking-detail">
                  <strong>Tracking Number:</strong> {selectedOrder.trackingNumber}
                </div>
                <div className="buyer-tracking-detail">
                  <strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}
                </div>
                <div className="buyer-tracking-detail">
                  <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                </div>
              </div>

              <div className="buyer-tracking-timeline">
                <h4>Order Progress</h4>
                <div className="buyer-timeline">
                  {selectedOrder.statusHistory.map((status, index) => (
                    <div key={index} className={`buyer-timeline-item ${status.completed ? 'completed' : 'pending'}`}>
                      <div className="buyer-timeline-marker"></div>
                      <div className="buyer-timeline-content">
                        <h5>{status.status}</h5>
                        {status.date && <p>{status.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="buyer-order-details">
                <h4>Order Items</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="buyer-modal-item">
                    <span className="buyer-modal-item-image">{item.image}</span>
                    <div className="buyer-modal-item-info">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span>Rs. {(item.quantity * item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
