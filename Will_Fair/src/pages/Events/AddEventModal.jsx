import React, { useState, useEffect } from 'react';
import './AddEventModal.css';

// Option lists
const TYPE_OPTIONS = [
  { value: 'environment', label: 'Environment' },
  { value: 'teaching', label: 'Teaching' },
  { value: 'caregiving', label: 'Caregiving' },
  { value: 'construction', label: 'Construction' },
  { value: 'admin', label: 'Administration' }
];

const COMMITMENT_OPTIONS = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'flexible', label: 'Flexible' }
];

const LOCATION_OPTIONS = [
  { value: 'Colombo', label: 'Colombo' },
  { value: 'Galle', label: 'Galle' },
  { value: 'Kandy', label: 'Kandy' },
  { value: 'Matara', label: 'Matara' },
  { value: 'Yala', label: 'Yala' }
];

const SKILLS_OPTIONS = [
  { value: 'teaching', label: 'Teaching' },
  { value: 'caregiving', label: 'Care-Giving' },
  { value: 'manual', label: 'Manual Labour' },
  { value: 'technical', label: 'Technical' },
  { value: 'none', label: 'No Experience' }
];

export default function AddEventModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    isRange: false,
    date: '',
    startDate: '',
    endDate: '',
    description: '',
    volunteersNeeded: 5,
    location: '',
    type: '',
    commitment: '',
    skills: ''
  });

  // reset form when modal opens
  useEffect(() => {
    if (isOpen) setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: 5, location: '' });
  }, [isOpen]);

  // prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // compute scrollbar width and add padding to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
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
            <select value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}>
              <option value="">Location</option>
              {LOCATION_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Volunteer Type</label>
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
              <option value="">Volunteer Type</option>
              {TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Time Commitment</label>
            <select value={form.commitment} onChange={(e) => setForm({...form, commitment: e.target.value})}>
              <option value="">Time Commitment</option>
              {COMMITMENT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Skills</label>
            <select value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})}>
              <option value="">Skills Needed</option>
              {SKILLS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
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
