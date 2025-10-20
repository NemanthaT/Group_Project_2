import React, { useState, useEffect } from 'react';
import './AddEventModal.css';

export default function RequestVolunteerListModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    eventKey: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ email: '', eventKey: '' });
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

    if (!form.email || !form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.eventKey || !form.eventKey.trim()) {
      newErrors.eventKey = 'Event key is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      const result = await onSubmit(form);
      setIsSubmitting(false);
      
      if (result?.success) {
        setForm({ email: '', eventKey: '' });
        setErrors({});
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className="modal-card" style={{ maxWidth: '520px', minWidth: '400px', position: 'relative' }}>
        {isSubmitting && (
          <div className="modal-loading-overlay">
            <div className="modal-loading-spinner"></div>
            <p className="modal-loading-text">Fetching volunteer list...</p>
          </div>
        )}
        
        <div className="modal-header">
          <h2>Request Volunteer List</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label>Email Address</label>
              <div className="tooltip" aria-label="Email that you registered with">
                <span className="tooltip-icon">i</span>
                <span className="tooltip-text">Email that you registered with</span>
              </div>
            </div>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
            />
            {renderError('email')}
          </div>

          <div className="form-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label>Event Key</label>
              <div className="tooltip" aria-label="Event key received in confirmation email">
                <span className="tooltip-icon">i</span>
                <span className="tooltip-text">Event key received in confirmation email</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="EVT-XXXXX-YYYYY"
              value={form.eventKey}
              onChange={(e) => updateField('eventKey', e.target.value)}
              required
            />
            {renderError('eventKey')}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Request List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
