import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEventModal.css';
import { EVENT_OPTIONS, withPlaceholder } from '@/constants/eventOptions';

export default function AddEventModal({ isOpen, onClose, onSubmit }) {
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
    skills: '',
    contactName: '',
    contactEmail: '',
    contactNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldRefs = useRef({});

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setErrors(prev => ({ ...prev, image: null }));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    if (pdfFiles.length === 0) {
      alert('Please select PDF document(s) only.');
      return;
    }
    setDocumentFiles(prev => [...prev, ...pdfFiles]);
    setErrors(prev => ({ ...prev, documents: null }));
  };

  const removeDocument = (index) => {
    setDocumentFiles(prev => { const copy = [...prev]; copy.splice(index,1); return copy; });
  };

  const sanitizePhoneNumber = (phone) => {
    return phone.replace(/\s+/g, '');
  };

  const validatePhoneNumber = (phone) => {
    const sanitized = sanitizePhoneNumber(phone);
    const phoneRegex = /^\+94\d{9}$/;
    return phoneRegex.test(sanitized);
  };

  useEffect(() => {
    if (isOpen) setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: 5, location: '', type: '', commitment: '', skills: '', contactName: '', contactEmail: '', contactNumber: '' });
  }, [isOpen]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const renderError = (key) => {
    if (!errors || !errors[key]) return null;
    return <div className="field-error">{errors[key]}</div>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || form.name.trim() === '') {
      toast.error('Event name is required.');
      return;
    }

    if (!form.location || form.location === '') {
      toast.error('Location is required.');
      return;
    }

    if (!form.type || form.type === '') {
      toast.error('Volunteer type is required.');
      return;
    }

    if (!form.commitment || form.commitment === '') {
      toast.error('Time commitment is required.');
      return;
    }

    if (!form.skills || form.skills === '') {
      toast.error('Skills needed is required.');
      return;
    }

    if (!form.description || form.description.trim() === '') {
      toast.error('Event description is required.');
      return;
    }

    if (!form.contactName || form.contactName.trim() === '') {
      toast.error('Contact name is required.');
      return;
    }

    if (!form.contactEmail || form.contactEmail.trim() === '') {
      toast.error('Contact email is required.');
      return;
    }

    if (!form.contactNumber || form.contactNumber.trim() === '') {
      toast.error('Contact number is required.');
      return;
    }

    if (!validatePhoneNumber(form.contactNumber)) {
      toast.error('Contact number must be in format +94xxxxxxxxx (e.g., +94771234567)');
      return;
    }

    if (!form.isRange) {
      if (!form.date || form.date === '') {
        toast.error('Event date is required.');
        return;
      }
    } else {
      if (!form.startDate || form.startDate === '') {
        toast.error('Start date is required.');
        return;
      }
      if (!form.endDate || form.endDate === '') {
        toast.error('End date is required.');
        return;
      }
      if (new Date(form.endDate) < new Date(form.startDate)) {
        toast.error('End date must be after start date.');
        return;
      }
    }

    if (!form.volunteersNeeded || form.volunteersNeeded < 1) {
      toast.error('Number of volunteers must be at least 1.');
      return;
    }

    if (!imageFile) {
      toast.error('Event image is required.');
      return;
    }

    if (documentFiles.length === 0) {
      toast.error('Please upload at least one proof document (PDF).');
      return;
    }

    const sanitizedPhone = sanitizePhoneNumber(form.contactNumber);

    let formData = new FormData();
    formData.append('name', form.name);
    formData.append('isRange', form.isRange);
    formData.append('description', form.description);
    formData.append('volunteersNeeded', form.volunteersNeeded);
    formData.append('location', form.location);
    formData.append('type', form.type);
    formData.append('commitment', form.commitment);
    formData.append('skills', form.skills);
    formData.append('contactName', form.contactName);
    formData.append('contactEmail', form.contactEmail);
    formData.append('contactNumber', sanitizedPhone);

    if (form.isRange) {
      formData.append('startDate', form.startDate);
      formData.append('endDate', form.endDate);
    } else {
      formData.append('date', form.date);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    documentFiles.forEach((file) => formData.append('documents', file));

    console.log('Form Data:', formData);

    setIsSubmitting(true);
    const result = await onSubmit(formData);
    setIsSubmitting(false);

    if (result.success) {
      setForm({
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
        skills: '',
        contactName: '',
        contactEmail: '',
        contactNumber: ''
      });
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setDocumentFiles([]);
      setErrors({});
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

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
      <div className="modal-card" style={{ position: 'relative' }}>
        {isSubmitting && (
          <div className="modal-loading-overlay">
            <div className="modal-loading-spinner"></div>
            <p className="modal-loading-text">Creating event...</p>
          </div>
        )}
        
        <div className="modal-header">
          <h2>Add Event</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row">
            <label>Event Name</label>
            <input ref={el => fieldRefs.current.name = el} type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
            {renderError('name')}
          </div>

          <div className="form-row">
            <div className="form-row-label">
              <label>Event Date</label>
              <div className="date-toggle" aria-hidden="false">
                <label className="toggle-inline small-toggle">
                  <input type="checkbox" checked={form.isRange} onChange={(e) => setForm({...form, isRange: e.target.checked})} />
                  <span className="toggle-text">" "</span>
                </label>
                <div className="tooltip" aria-label="Toggle when the event spans more than one day">
                  <span className="tooltip-icon">i</span>
                  <span className="tooltip-text">Toggle when the event spans more than 1 day</span>
                </div>
              </div>
            </div>

            {!form.isRange ? (
              <>
                <input ref={el => fieldRefs.current.date = el} type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)} required />
                {renderError('date')}
              </>
            ) : (
              <div className="range-row">
                <input ref={el => fieldRefs.current.startDate = el} type="date" value={form.startDate} onChange={(e) => updateField('startDate', e.target.value)} required />
                {renderError('startDate')}
                <span className="range-sep">to</span>
                <input ref={el => fieldRefs.current.endDate = el} type="date" value={form.endDate} onChange={(e) => updateField('endDate', e.target.value)} required />
                {renderError('endDate')}
              </div>
            )}
          </div>

          <div className="form-row">
            <label>Location</label>
            <select ref={el => fieldRefs.current.location = el} value={form.location} onChange={(e) => updateField('location', e.target.value)}>
              {withPlaceholder(EVENT_OPTIONS.location, 'Location').map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('location')}
          </div>

          <div className="form-row">
            <label>Volunteer Type</label>
            <select ref={el => fieldRefs.current.type = el} value={form.type} onChange={(e) => updateField('type', e.target.value)}>
              {withPlaceholder(EVENT_OPTIONS.type, 'Volunteer Type').map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('type')}
          </div>

          <div className="form-row">
            <label>Time Commitment</label>
            <select ref={el => fieldRefs.current.commitment = el} value={form.commitment} onChange={(e) => updateField('commitment', e.target.value)}>
              {withPlaceholder(EVENT_OPTIONS.commitment, 'Time Commitment').map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('commitment')}
          </div>

          <div className="form-row">
            <label>Skills</label>
            <select ref={el => fieldRefs.current.skills = el} value={form.skills} onChange={(e) => updateField('skills', e.target.value)}>
              {withPlaceholder(EVENT_OPTIONS.skills, 'Skills Needed').map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('skills')}
          </div>

          <div className="form-row">
            <label>Number of Volunteers</label>
            <input ref={el => fieldRefs.current.volunteersNeeded = el} type="number" min="1" value={form.volunteersNeeded} onChange={(e) => updateField('volunteersNeeded', e.target.value)} />
          </div>

          <div className="form-row">
            <label>Event Description</label>
            <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={4}></textarea>
            {renderError('description')}
          </div>

          <div className="form-row">
            <label>Contact Name</label>
            <input type="text" value={form.contactName} onChange={(e) => updateField('contactName', e.target.value)} />
            {renderError('contactName')}
          </div>

          <div className="form-row">
            <label>Contact Gmail</label>
            <input type="email" placeholder="example@gmail.com" value={form.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} />
            {renderError('contactEmail')}
          </div>

          <div className="form-row">
            <label>Contact Number</label>
            <input type="tel" placeholder="e.g. +94 77 123 4567" value={form.contactNumber} onChange={(e) => updateField('contactNumber', e.target.value)} />
            {renderError('contactNumber')}
          </div>

          <div className="form-row">
            <label>Event Image (required)</label>
            <div className="image-upload-card">
              <input
                type="file"
                id="eventImageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="eventImageUpload" className="choose-file-button">
                {imageFile ? 'Change image' : 'Choose image'}
              </label>
              <div style={{ marginTop: 12 }}>
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="preview" style={{ maxWidth: 300, borderRadius: 8 }} />
                    <div />
                  </div>
                ) : (
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>No image selected</span>
                )}
                {renderError('image')}
              </div>
            </div>
          </div>

          <div className="form-row">
            <label>Proof Documents (PDF) (required)</label>
            <div className="file-upload-card">
              <input
                type="file"
                id="eventDocumentUpload"
                accept=".pdf"
                onChange={handleDocumentUpload}
                multiple
                style={{ display: 'none' }}
              />
              <label htmlFor="eventDocumentUpload" className="choose-files-button">
                Choose files
              </label>

              <div className="file-display" style={{ marginTop: 12 }}>
                {documentFiles.length > 0 ? (
                  <div className="document-list">
                    {documentFiles.map((file, index) => (
                      <div key={index} className="document-item">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeDocument(index)} className="remove-document-button">Remove</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>No documents selected</span>
                )}
                {renderError('documents')}
              </div>
            </div>
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
