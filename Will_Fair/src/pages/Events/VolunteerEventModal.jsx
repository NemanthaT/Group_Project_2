import React, { useState, useEffect, useRef } from 'react';
import './VolunteerEventModal.css';

export default function VolunteerEventModal({ isOpen, onClose, eventTitle = "Community Event" }) {
  const [form, setForm] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '' });
      setErrors({});
    }
  }, [isOpen]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const renderError = (key) => {
    if (!errors[key]) return null;
    return <div className="field-error">{errors[key]}</div>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate only email (required)
    if (!form.email || !form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      setTimeout(() => {
        const el = fieldRefs.current[firstKey];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el && typeof el.focus === 'function') el.focus();
      }, 50);
      return;
    }

    try {
      // TODO: replace with backend call
      alert(`Thank you for volunteering for ${eventTitle}!`);
      setForm({ name: '', email: '' });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again.');
    }
  };

  // Prevent background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>Volunteer for this Event</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>Your Name <span style={{ color: '#94a3b8' }}>(optional)</span></label>
            <input
              ref={el => fieldRefs.current.name = el}
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Email Address</label>
            <input
              ref={el => fieldRefs.current.email = el}
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
            {renderError('email')}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Volunteer</button>
          </div>

          {/* Motivational description / dummy content */}
          <div className="volunteer-description">
            <h3>Why Volunteer?</h3>
            <p>
              Every helping hand matters! 🌱  
              So far, <strong>126 people</strong> have volunteered for this event — each bringing us one step
              closer to making a real difference in the community.
            </p>
            <p>
              By volunteering, you not only support a cause but also grow, connect, and inspire others.
              Let’s build a kinder world — together!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
