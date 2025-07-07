import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FormHeaderSection = () => {
  return (
    <section className="w-full my-6">
      <label className="form-label">
        Quantity needed
      </label>

      <Card className="form-card">
        <CardContent className="p-0">
          <Input
            className="form-input"
            placeholder="Enter quantity"
          />
        </CardContent>
      </Card>
    </section>
  );
};