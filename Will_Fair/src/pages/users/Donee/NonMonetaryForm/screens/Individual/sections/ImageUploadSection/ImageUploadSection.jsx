import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Textarea } from "../../../../components/ui/textarea";

export const ImageUploadSection = () => {
  return (
    <section className="w-full my-6">
      <label className="form-label">
        Description
      </label>

      <Card className="form-card">
        <CardContent className="p-0">
          <Textarea
            className="form-textarea"
            placeholder="Describe your request in detail. Include why you need help, how the donations will be used, and who will benefit."
          />
        </CardContent>
      </Card>
    </section>
  );
};