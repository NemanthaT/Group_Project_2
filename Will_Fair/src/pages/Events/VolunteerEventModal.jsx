import React, { useState, useEffect, useRef } from 'react';
import './VolunteerEventModal.css';
import axios from 'axios';

export default function VolunteerEventModal({ isOpen, onClose, eventTitle = "Community Event", eventId }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", email: "", contact: "" });
      setErrors({});
    }
  }, [isOpen]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };
  //Validation of fields
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.contact.trim()) newErrors.contact = "Contact number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    return newErrors;
  };

  // const renderError = (key) => {
  //   if (!errors[key]) return null;
  //   return <div className="field-error">{errors[key]}</div>;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!eventId) {
    alert("Missing event ID. Please refresh the page and try again.");
    return; // stop submission
  }

    try {
      await axios.post("http://localhost:5000/api/volunteers", {
        event_id: eventId,
        volunteer_name: form.name,
        volunteer_email: form.email,
        volunteer_phone: form.contact,
      });

      alert(`Thank you for volunteering for ${eventTitle}!`);
      setForm({ name: "", email: "", contact: "" });
      onClose();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error)
        alert(err.response.data.error);
      else alert("Submission failed. Please try again.");
    }
  };

  // // Prevent background scroll when open
  // useEffect(() => {
  //   if (!isOpen) return;
  //   const original = document.body.style.overflow;
  //   document.body.style.overflow = 'hidden';
  //   return () => { document.body.style.overflow = original; };
  // }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.className === "modal-overlay" && onClose()}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h2>Volunteer for this Event</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-row">
            <label>Contact Number</label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              required
            />
            {errors.contact && <div className="field-error">{errors.contact}</div>}
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
