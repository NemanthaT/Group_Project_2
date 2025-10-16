import React, { useState, useEffect } from 'react';
import './AddEventModal.css';

export default function AddEventModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    isRange: false,
    date: '',
    startDate: '',
    endDate: '',
    description: '',
    volunteersNeeded: 5,
    location: ''
  });

  useEffect(() => {
    if (isOpen) setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: 5, location: '' });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>Add Event</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={(e) => {
          e.preventDefault();
          onCreate(form);
        }}>
          <div className="form-row">
            <label>Event Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          </div>

          <div className="form-row">
            <label>Event Date</label>
            <div className="date-row">
              <label className="toggle-inline">
                <input type="checkbox" checked={form.isRange} onChange={(e) => setForm({...form, isRange: e.target.checked})} />
                {' '}Use start & end dates
              </label>
            </div>
            {!form.isRange ? (
              <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required />
            ) : (
              <div className="range-row">
                <input type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} required />
                <span className="range-sep">to</span>
                <input type="date" value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} required />
              </div>
            )}
          </div>

          <div className="form-row">
            <label>Location</label>
            <input type="text" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />
          </div>

          <div className="form-row">
            <label>Number of Volunteers</label>
            <input type="number" min="1" value={form.volunteersNeeded} onChange={(e) => setForm({...form, volunteersNeeded: e.target.value})} />
          </div>

          <div className="form-row">
            <label>Event Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={4}></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
