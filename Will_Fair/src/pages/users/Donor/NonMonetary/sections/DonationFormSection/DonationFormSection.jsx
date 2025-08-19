import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export const DonationFormSection = ({ value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(date);
    setShowCalendar(false);
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }
    
    return days;
  };

  const formatDisplayDate = (date) => {
    if (!date) return "DD/MM/YYYY";
    return format(date, "dd/MM/yyyy");
  };

  return (
    <section className="form-section">
      <h2 className="section-title">Dropoff Date</h2>
      <div className="date-picker-container">
        <button
          className="date-picker-button"
          onClick={() => setShowCalendar(!showCalendar)}
          type="button"
        >
          <span>{formatDisplayDate(selectedDate)}</span>
          <Calendar className="calendar-icon" />
        </button>
        
        {showCalendar && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            marginTop: '5px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '5px',
              textAlign: 'center'
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ 
                  padding: '10px', 
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date || date < new Date().setHours(0,0,0,0)}
                  style={{
                    padding: '10px',
                    border: 'none',
                    background: date ? (date < new Date().setHours(0,0,0,0) ? '#f5f5f5' : 'white') : 'transparent',
                    cursor: date && date >= new Date().setHours(0,0,0,0) ? 'pointer' : 'default',
                    borderRadius: '5px',
                    color: date ? (date < new Date().setHours(0,0,0,0) ? '#ccc' : '#333') : 'transparent',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    if (date && date >= new Date().setHours(0,0,0,0)) {
                      e.target.style.background = '#8b0ab4';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (date && date >= new Date().setHours(0,0,0,0)) {
                      e.target.style.background = 'white';
                      e.target.style.color = '#333';
                    }
                  }}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};