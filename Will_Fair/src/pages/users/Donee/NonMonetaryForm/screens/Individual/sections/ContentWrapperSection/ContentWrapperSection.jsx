import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContentWrapperSection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <section className="w-full space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="form-label">
          Proof Documents
        </h2>
        <div>
          <input
            type="file"
            id="document-upload"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="document-upload" className="btn btn-secondary cursor-pointer">
            Choose files
          </label>
        </div>
      </div>

      <Card className="form-card">
        <CardContent className="p-6">
          {selectedFiles.length > 0 ? (
            <div>
              <p className="font-normal text-xl text-gray-600 mb-4">
                Selected Documents:
              </p>
              <ul className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-gray-700">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="font-normal text-xl text-gray-400">
              Documents
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};