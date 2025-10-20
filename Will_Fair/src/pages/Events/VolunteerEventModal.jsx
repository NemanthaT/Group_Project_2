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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!eventId) {
      setErrors({ ...newErrors, general: "Missing event ID. Please refresh the page." });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/volunteers", {
        event_id: eventId,
        volunteer_name: form.name,
        volunteer_email: form.email,
        volunteer_phone: form.contact,
        notes: form.notes,
      });

      if (response.data.success) {
        toast.success("Successfully registered as volunteer! Check your email for confirmation.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setForm({ name: "", email: "", contact: "", notes: "" });
        // Delay modal close to allow toast to show
        setTimeout(() => {
          const savedPosition = sessionStorage.getItem('eventsScroll');
          onClose();
          if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            sessionStorage.removeItem('eventsScroll');
          }
        }, 1000);
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          "Failed to submit volunteer application. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrors({ ...newErrors, general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle scroll locking and position restoration
  useEffect(() => {
    if (!isOpen) {
      // On modal close, restore scroll position and cleanup
      const savedPosition = sessionStorage.getItem('eventsScroll');
      if (savedPosition) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('eventsScroll');
      }
      return;
    }
    
    // Calculate scrollbar width compensation
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Cleanup function
    return () => {
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className="modal-overlay"
        onClick={(e) => e.target.className === "modal-overlay" && onClose()}
      >
      
      <div className="modal-card" style={{ maxWidth: '520px', minWidth: '400px', position: 'relative' }}>
        {isSubmitting && (
          <div className="modal-loading-overlay">
            <div className="modal-loading-spinner"></div>
            <p className="modal-loading-text">Processing registration...</p>
          </div>
        )}
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
    </>
  );
}
