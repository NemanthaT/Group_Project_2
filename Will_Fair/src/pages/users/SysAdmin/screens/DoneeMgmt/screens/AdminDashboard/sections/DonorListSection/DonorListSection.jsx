import React from "react";

export const DonorListSection = ({ searchTerm, filterType }) => {
  const donorData = [
    {
      id: 1,
      name: "John Doe",
      phone: "0771234659",
      address: "123 Main Street, Colombo 01",
      status: "approved", // approved, pending, banned
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "0771234660",
      address: "456 Oak Avenue, Kandy",
      status: "pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "0771234661",
      address: "789 Pine Road, Galle",
      status: "approved",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      phone: "0771234662",
      address: "321 Elm Street, Negombo",
      status: "pending",
    },
    {
      id: 5,
      name: "David Brown",
      phone: "0771234663",
      address: "654 Maple Drive, Matara",
      status: "approved",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      phone: "0771234664",
      address: "987 Beach Road, Hikkaduwa",
      status: "pending",
    },
    {
      id: 7,
      name: "Robert Taylor",
      phone: "0771234665",
      address: "147 Hill View, Nuwara Eliya",
      status: "banned",
    },
  ];

  const handleView = (donor) => {
    alert(`Viewing details for: ${donor.name}\nStatus: ${donor.status}`);
  };

  const handleBan = (donor) => {
    if (window.confirm(`Are you sure you want to ban ${donor.name}?`)) {
      alert(`${donor.name} has been banned.`);
      // Here you would update the donor's status to 'banned'
    }
  };

  const handleApprove = (donor) => {
    if (window.confirm(`Are you sure you want to approve ${donor.name}'s donee account?`)) {
      alert(`${donor.name}'s account has been approved.`);
      // Here you would update the donor's status to 'approved'
    }
  };

  const handleReject = (donor) => {
    if (window.confirm(`Are you sure you want to reject ${donor.name}'s donee account application?`)) {
      alert(`${donor.name}'s account application has been rejected.`);
      // Here you would update the donor's status to 'rejected' or remove the record
    }
  };

  // Filter data based on search term and filter type
  const filteredData = donorData.filter((donor) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    switch (filterType) {
      case 'name':
        return donor.name.toLowerCase().includes(searchLower);
      case 'address':
        return donor.address.toLowerCase().includes(searchLower);
      case 'all':
      default:
        return (
          donor.name.toLowerCase().includes(searchLower) ||
          donor.address.toLowerCase().includes(searchLower) ||
          donor.phone.includes(searchTerm)
        );
    }
  });

  const renderActionButtons = (donor) => {
    if (donor.status === 'pending') {
      return (
        <div className="action-buttons">
          <button 
            className="view-btn"
            onClick={() => handleView(donor)}
          >
            View
          </button>
          <button 
            className="approve-btn"
            onClick={() => handleApprove(donor)}
          >
            Approve
          </button>
          <button 
            className="reject-btn"
            onClick={() => handleReject(donor)}
          >
            Reject
          </button>
        </div>
      );
    } else {
      return (
        <div className="action-buttons">
          <button 
            className="view-btn"
            onClick={() => handleView(donor)}
          >
            View
          </button>
          <button 
            className={`ban-btn ${donor.status === 'banned' ? 'disabled' : ''}`}
            onClick={() => handleBan(donor)}
            disabled={donor.status === 'banned'}
          >
            {donor.status === 'banned' ? 'Banned' : 'Ban'}
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {filteredData.length === 0 ? (
        <div className="no-results">
          <p>No records found matching your search criteria.</p>
        </div>
      ) : (
        filteredData.map((donor) => (
          <div key={donor.id} className="data-card">
            <div className="data-row">
              <div className="data-cell">
                <div className="donor-name">{donor.name}</div>
                <div className={`status-badge ${donor.status}`}>
                  {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                </div>
              </div>
              <div className="data-cell">{donor.phone}</div>
              <div className="data-cell">{donor.address}</div>
              {renderActionButtons(donor)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};