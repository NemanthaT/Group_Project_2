import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const DonationFormSection = () => {
  return (
    <div className="w-full my-6">
      <label className="form-label">
        Item name
      </label>

      <Card className="form-card">
        <CardContent className="p-0">
          <Input
            className="form-input"
            placeholder="Enter item name"
          />
        </CardContent>
      </Card>
    </div>
  );
};