import React, { useState, useEffect, useRef } from 'react';
import './VolunteerEventModal.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VolunteerEventModal({ isOpen, onClose, onVolunteerSuccess, eventTitle = "Community Event", eventId, eventOrganiserEmail }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

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

  // Validates required fields and email format
  const validate = () => {
    const newErrors = {};
    //Organiser Email Check
    if (form.email.trim() === eventOrganiserEmail) {
      newErrors.email = "Organizer cannot register here!";
      toast.error("Organizers cannot volunteer for their own event!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      });
    }


    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else {
      const contact = form.contact.trim();

      // Mobile numbers starting with 07X, 10 digits
      const mobileRegex = /^07\d{8}$/;

      // Landline numbers: 011, 021, etc., 10 digits
      const landlineRegex = /^0\d{9}$/;

      // Numbers with +94 prefix
      const plus94Regex = /^\+94\d{9}$/;

      if (!(mobileRegex.test(contact) || landlineRegex.test(contact) || plus94Regex.test(contact))) {
        newErrors.contact = "Enter a valid Sri Lankan phone number (e.g. 0712345678, +94712345678)";
      }
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Simple practical email regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = "Enter a valid email address";
      }
    }
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
        toast.success("Successfully registered as a volunteer!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });


        setForm({ name: "", email: "", contact: "", notes: "" });

        setTimeout(() => {
          const savedPosition = sessionStorage.getItem('eventsScroll');
          onClose();

          if (typeof onVolunteerSuccess === "function") onVolunteerSuccess();
          if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            sessionStorage.removeItem('eventsScroll');
          }
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
        err.response?.data?.message ||
        "Submission Faild. Please try again.";
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
