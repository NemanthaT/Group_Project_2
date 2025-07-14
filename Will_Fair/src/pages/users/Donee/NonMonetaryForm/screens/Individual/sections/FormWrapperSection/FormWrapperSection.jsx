import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FormWrapperSection = () => {
  return (
    <div className="w-full my-6">
      <label className="form-label">
        Request name
      </label>

      <Card className="form-card">
        <CardContent className="p-0">
          <Input
            className="form-input"
            placeholder="Enter request name"
          />
        </CardContent>
      </Card>
    </div>
  );
};