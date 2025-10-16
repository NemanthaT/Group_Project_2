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

  // image and document uploads (required)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);

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
          // validate required image and at least one document
          if (!imageFile) {
            alert('Please attach an image for the event (required).');
            return;
          }
          if (!documentFiles || documentFiles.length === 0) {
            alert('Please upload at least one proof document (PDF).');
            return;
          }

          // attach files info to form object passed to onCreate
          onCreate({ ...form, imageFile, documents: documentFiles });
        }}>
          <div className="form-row">
            <label>Event Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
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

          {/* Image upload (required) */}
          <div className="form-row">
            <label>Event Image (required)</label>
            <div className="image-upload-card">
              <input
                type="file"
                id="eventImageUpload"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                  }
                  setImageFile(file);
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                }}
                style={{ display: 'none' }}
              />
              <label htmlFor="eventImageUpload" className="choose-file-button">
                {imageFile ? 'Change image' : 'Choose image'}
              </label>
              <div style={{ marginTop: 12 }}>
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="preview" style={{ maxWidth: 300, borderRadius: 8 }} />
                    <div>
                      <button type="button" className="remove-document-button" onClick={() => { URL.revokeObjectURL(imagePreview); setImagePreview(null); setImageFile(null); }}>
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <span style={{ color: 'rgba(0,0,0,0.6)' }}>No image selected</span>
                )}
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
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const pdfFiles = files.filter(f => f.type === 'application/pdf');
                  if (pdfFiles.length === 0) {
                    alert('Please select PDF document(s) only.');
                    return;
                  }
                  setDocumentFiles(prev => [...prev, ...pdfFiles]);
                }}
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
                        <button type="button" onClick={() => setDocumentFiles(prev => { const copy = [...prev]; copy.splice(index,1); return copy; })} className="remove-document-button">Remove</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>No documents selected</span>
                )}
              </div>
            </div>
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
