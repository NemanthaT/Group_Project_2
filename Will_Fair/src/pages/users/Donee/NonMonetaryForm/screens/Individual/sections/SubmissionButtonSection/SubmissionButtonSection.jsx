import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const SubmissionButtonSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <section className="w-full py-8">
      <label className="form-label">
        Request Image
      </label>

      <Card className="form-card">
        <CardContent className="p-6 min-h-80 flex items-start justify-end">
          <div className="file-upload-area w-full">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload" className="btn btn-secondary cursor-pointer">
              Choose file
            </label>
            {selectedFile && (
              <p className="mt-4 text-gray-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};