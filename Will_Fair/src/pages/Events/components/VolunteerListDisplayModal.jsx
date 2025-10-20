import React, { useEffect } from 'react';
import './VolunteerListDisplayModal.css';

export default function VolunteerListDisplayModal({ isOpen, onClose, volunteers }) {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="volunteer-list-modal-overlay" onClick={(e) => { if (e.target.className === 'volunteer-list-modal-overlay') onClose(); }}>
      <div className="volunteer-list-modal-card">
        <div className="volunteer-list-modal-header">
          <h2>Registered Volunteers</h2>
          <button className="volunteer-list-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="volunteer-list-modal-body">
          {volunteers && volunteers.length > 0 ? (
            <>
              <div className="volunteer-list-count">
                Total Volunteers: <strong>{volunteers.length}</strong>
              </div>
              <div className="volunteer-list-table-container">
                <table className="volunteer-list-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{volunteer.name}</td>
                        <td>{volunteer.email}</td>
                        <td>{volunteer.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="volunteer-list-empty">
              <p>No volunteers have registered for this event yet.</p>
            </div>
          )}
        </div>

        <div className="volunteer-list-modal-footer">
          <button className="btn-volunteer-list-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
