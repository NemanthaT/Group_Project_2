import React from "react";

export const DonorTableSection = ({ searchTerm = "" }) => {
  const donorData = [
    {
      id: 1,
      name: "Jackson Anthony",
      address: "123 Main Street, Colombo 07",
      phone: "0771234659",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      address: "456 Oak Avenue, Kandy",
      phone: "0771234660",
    },
    {
      id: 3,
      name: "Michael Brown",
      address: "789 Pine Road, Galle",
      phone: "0771234661",
    },
    {
      id: 4,
      name: "Emily Davis",
      address: "321 Elm Street, Negombo",
      phone: "0771234662",
    },
    {
      id: 5,
      name: "David Wilson",
      address: "654 Maple Drive, Matara",
      phone: "0771234663",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      address: "987 Cedar Lane, Jaffna",
      phone: "0771234664",
    },
    {
      id: 7,
      name: "Robert Taylor",
      address: "147 Birch Street, Anuradhapura",
      phone: "0771234665",
    },
    {
      id: 8,
      name: "Jennifer Martinez",
      address: "258 Willow Avenue, Trincomalee",
      phone: "0771234666",
    },
  ];

  // Filter donors based on search term
  const filteredDonors = donorData.filter(donor => {
    const searchLower = searchTerm.toLowerCase();
    return (
      donor.name.toLowerCase().includes(searchLower) ||
      donor.address.toLowerCase().includes(searchLower) ||
      donor.phone.toLowerCase().includes(searchLower)
    );
  });

  const handleViewClick = (donor) => {
    alert(`Viewing details for: ${donor.name}`);
  };

  const handleBanClick = (donor) => {
    if (window.confirm(`Are you sure you want to ban ${donor.name}?`)) {
      alert(`${donor.name} has been banned.`);
    }
  };

  return (
    <section className="table-section">
      {/* Table Header */}
      <div className="table-header">
        <div className="table-header-row">
          <div className="table-header-cell">Name</div>
          <div className="table-header-cell">Address</div>
          <div className="table-header-cell">Contact No</div>
          <div className="table-header-cell">Actions</div>
        </div>
      </div>

      {/* Donor Cards */}
      {filteredDonors.length > 0 ? (
        filteredDonors.map((donor) => (
          <div key={donor.id} className="donor-card">
            <div className="donor-row">
              <div className="donor-info">{donor.name}</div>
              <div className="donor-info">{donor.address}</div>
              <div className="donor-info">{donor.phone}</div>
              <div className="action-buttons">
                <button 
                  className="view-button"
                  onClick={() => handleViewClick(donor)}
                >
                  View
                </button>
                <button 
                  className="ban-button"
                  onClick={() => handleBanClick(donor)}
                >
                  Ban
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          {searchTerm ? `No donors found matching "${searchTerm}"` : "No donors available"}
        </div>
      )}
    </section>
  );
};