import React, { useState } from 'react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const orders = [
    {
      id: 'ORD01',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/07/01',
      totalAmount: 'Rs. 500.00',
      status: 'Delivered'
    },
    {
      id: 'ORD21',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/07/01',
      totalAmount: 'Rs. 500.00',
      status: 'Pending'
    },
    {
      id: 'ORD15',
      customer: 'Garrett Leisure',
      email: 'garrett.leisure@gmail.com',
      date: '2024/07/01',
      totalAmount: 'Rs. 250.00',
      status: 'Pending'
    },
    {
      id: 'ORD19',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/07/01',
      totalAmount: 'Rs. 500.00',
      status: 'Delivered'
    },
    {
      id: 'ORD46',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/07/01',
      totalAmount: 'Rs. 250.00',
      status: 'Pending'
    },
    {
      id: 'ORD22',
      customer: 'Garrett Leisure',
      email: 'garrett.leisure@gmail.com',
      date: '2024/06/12',
      totalAmount: 'Rs. 500.00',
      status: 'Cancelled'
    },
    {
      id: 'ORD70',
      customer: 'Celia Lamrenze',
      email: 'celia.lamrenze@gmail.com',
      date: '2024/06/12',
      totalAmount: 'Rs. 600.00',
      status: 'Processing'
    },
    {
      id: 'ORD36',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/06/12',
      totalAmount: 'Rs. 800.00',
      status: 'Delivered'
    },
    {
      id: 'ORD37',
      customer: 'Diksha Sangmana',
      email: 'diksha27@gmail.com',
      date: '2024/06/22',
      totalAmount: 'Rs. 1500.00',
      status: 'Processing'
    },
    {
      id: 'ORD34',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/06/30',
      totalAmount: 'Rs. 2500.00',
      status: 'Delivered'
    },
    {
      id: 'ORD37',
      customer: 'Diksha Sangmana',
      email: 'diksha27@gmail.com',
      date: '2024/06/30',
      totalAmount: 'Rs. 4000.00',
      status: 'Processing'
    },
    {
      id: 'ORD25',
      customer: 'Garrett Leisure',
      email: 'garrett.leisure@gmail.com',
      date: '2024/06/28',
      totalAmount: 'Rs. 350.00',
      status: 'Pending'
    },
    {
      id: 'ORD70',
      customer: 'Saurabe Thakrun',
      email: 'sthakrun@wifeco.com',
      date: '2024/06/24',
      totalAmount: 'Rs. 250.00',
      status: 'Delivered'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="orders-content">
      <div className="content-header">
        <h1>Order Details</h1>
        <p className="subtitle">Managing Orders</p>
      </div>

      <div className="filters-section">
        <div className="filters-left">
          <div className="filter-group">
            <select
              className="filter-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="">Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div className="filter-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={`${order.id}-${index}`}>
                <td className="order-id">{order.id}</td>
                <td className="customer">{order.customer}</td>
                <td className="email">{order.email}</td>
                <td className="date">{order.date}</td>
                <td className="amount">{order.totalAmount}</td>
                <td className="status">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
