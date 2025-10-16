import React, { useState, useEffect, useRef } from 'react';
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

export default function AddEventModal({ isOpen, onClose }) {
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

  // field errors to show inline tooltips instead of alerts
  const [errors, setErrors] = useState({});

  // refs for form fields so we can focus / scroll the first invalid one
  const fieldRefs = useRef({});

  // image and document uploads (required)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

  // Handlers moved out of JSX
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
    // clear image-related error
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
    // clear document-related error
    setErrors(prev => ({ ...prev, documents: null }));
  };

  const removeDocument = (index) => {
    setDocumentFiles(prev => { const copy = [...prev]; copy.splice(index,1); return copy; });
  };

  // reset form when modal opens
  useEffect(() => {
    if (isOpen) setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: 5, location: '', type: '', commitment: '', skills: '', contactName: '', contactEmail: '', contactNumber: '' });
  }, [isOpen]);

  // helper to update a field and clear its error
  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const renderError = (key) => {
    if (!errors || !errors[key]) return null;
    return <div className="field-error">{errors[key]}</div>;
  };

  // Submit handler with validations similar to Forms.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear previous errors
    const newErrors = {};

    // simple required checks for all form fields
    const requiredTextFields = [
      'name', 'location', 'type', 'commitment', 'skills', 'description', 'contactName', 'contactEmail', 'contactNumber'
    ];

    for (const key of requiredTextFields) {
      if (!form[key] || String(form[key]).trim() === '') {
        newErrors[key] = 'This field is required';
      }
    }

    if (!form.isRange) {
      if (!form.date) { newErrors.date = 'Please select the event date.'; }
    } else {
      if (!form.startDate) { newErrors.startDate = 'Please select start date.'; }
      if (!form.endDate) { newErrors.endDate = 'Please select end date.'; }
    }

    if (!imageFile) { newErrors.image = 'Event image is required.'; }

    if (!documentFiles || documentFiles.length === 0) { newErrors.documents = 'Please upload at least one proof document (PDF).'; }

    // ensure all documents are PDFs
    const nonPdf = documentFiles.find(f => f.type !== 'application/pdf');
    if (nonPdf) { newErrors.documents = 'All proof documents must be PDF files.'; }

    // if there are any errors, set them and bail out
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus + scroll to first invalid field after render
      const firstKey = Object.keys(newErrors)[0];
      setTimeout(() => {
        const el = fieldRefs.current[firstKey];
        if (el) {
          try {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (err) { void err; /* ignore scroll errors on older browsers */ }
          if (typeof el.focus === 'function') el.focus();
        }
      }, 50);
      return;
    }

    // all validations passed — perform submission inside try/catch
    try {
      // TODO: add URL for backend and perform the request here (e.g. fetch/axios)
      // Example: await axios.post('<BACKEND_URL>', formData)

      // simulate success for now
      alert('Event created successfully!');

      // reset form and files
      setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: 5, location: '', type: '', commitment: '', skills: '', contactName: '', contactEmail: '', contactNumber: '' });
      setImageFile(null);
      if (imagePreview) { URL.revokeObjectURL(imagePreview); }
      setImagePreview(null);
      setDocumentFiles([]);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit event. Please try again.');
    }
  };

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
              <option value="">Location</option>
              {LOCATION_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('location')}
          </div>

          <div className="form-row">
            <label>Volunteer Type</label>
            <select ref={el => fieldRefs.current.type = el} value={form.type} onChange={(e) => updateField('type', e.target.value)}>
              <option value="">Volunteer Type</option>
              {TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('type')}
          </div>

          <div className="form-row">
            <label>Time Commitment</label>
            <select ref={el => fieldRefs.current.commitment = el} value={form.commitment} onChange={(e) => updateField('commitment', e.target.value)}>
              <option value="">Time Commitment</option>
              {COMMITMENT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('commitment')}
          </div>

          <div className="form-row">
            <label>Skills</label>
            <select ref={el => fieldRefs.current.skills = el} value={form.skills} onChange={(e) => updateField('skills', e.target.value)}>
              <option value="">Skills Needed</option>
              {SKILLS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {renderError('skills')}
          </div>

          <div className="form-row">
            <label>Number of Volunteers</label>
            <input ref={el => fieldRefs.current.volunteersNeeded = el} type="number" min="1" value={form.volunteersNeeded} onChange={(e) => updateField('volunteersNeeded', e.target.value)} />
          </div>

          {/* Image upload (required) */}
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

          {/* Document uploads (required, PDF) */}
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

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
