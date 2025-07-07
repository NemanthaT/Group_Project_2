import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DocumentUploadSection = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setShowCalendar(false);
  };

  return (
    <section className="w-full my-6">
      <label className="form-label">
        Deadline
      </label>

      <Card className="form-card">
        <CardContent className="p-0">
          <div className="relative">
            <button
              className="calendar-trigger"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span>
                {selectedDate || "DD/MM/YYYY"}
              </span>
              <CalendarIcon size={24} />
            </button>
            
            {showCalendar && (
              <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4 mt-1">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};