import React from "react";

export const DataCard = ({ user }) => {
  const handleView = () => {
    console.log(`View user: ${user.name}`);
    // In a real app, this would navigate to user details or open a modal
  };

  const handleBan = () => {
    console.log(`Ban user: ${user.name}`);
    // In a real app, this would call an API to ban the user
    if (window.confirm(`Are you sure you want to ban ${user.name}?`)) {
      // API call would go here
      alert(`${user.name} has been banned`);
    }
  };

  const handleRemove = () => {
    console.log(`Remove user: ${user.name}`);
    // In a real app, this would call an API to remove the user
    if (window.confirm(`Are you sure you want to remove ${user.name}? This action cannot be undone.`)) {
      // API call would go here
      alert(`${user.name} has been removed`);
    }
  };

  return (
    <div className="data-card">
      <div className="data-row">
        <div className="data-cell">{user.name}</div>
        <div className="data-cell">{user.email}</div>
        <div className="data-cell">{user.phone}</div>
        <div className="action-buttons">
          <button className="view-btn" onClick={handleView}>
            View
          </button>
          <button className="ban-btn" onClick={handleBan}>
            Ban
          </button>
          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};