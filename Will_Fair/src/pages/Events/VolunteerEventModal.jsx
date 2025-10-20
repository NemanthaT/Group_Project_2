import React, { useState, useEffect, useRef } from 'react';
import './VolunteerEventModal.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VolunteerEventModal({ isOpen, onClose, eventTitle = "Community Event", eventId }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", email: "", contact: "", notes: "" });
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
      Object.values(newErrors).forEach(error => {
        toast.error(error, {
          position: "top-right",
          autoClose: 3000
        });
      });
      return;
    }

    if (!eventId) {
      toast.error("Missing event ID. Please refresh the page and try again.", {
        position: "top-right",
        autoClose: 3000
      });
      return; // stop submission
    }

    try {
      const response = await axios.post("http://localhost:5000/api/volunteers", {
        event_id: eventId,
        volunteer_name: form.name,
        volunteer_email: form.email,
        volunteer_phone: form.contact,
        notes: form.notes,
      });

      if (response.data.success) {
        toast.success(`Thank you for volunteering for ${eventTitle}!`, {
          position: "top-right",
          autoClose: 3000
        });
        setForm({ name: "", email: "", contact: "", notes: "" });
        onClose();
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Failed to submit volunteer application. Please try again.",
        {
          position: "top-right",
          autoClose: 5000
        }
      );
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    // Store the original values
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPaddingRight = originalStyle.paddingRight;
    
    // Calculate scroll bar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Add padding right to prevent content shift
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = 'hidden';

    // Cleanup function to restore original styles
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.className === "modal-overlay" && onClose()}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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

          <div className="form-row">
            <label>Notes <span style={{ color: '#94a3b8' }}>(optional)</span></label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Any additional info or message"
            />
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
