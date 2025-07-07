import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const DonationDetailsSection = (): JSX.Element => {
  return (
    <section className="w-full mb-6">
      <h2 className="text-3xl font-normal font-['Outfit',Helvetica] mb-4">
        Dropoff Location
      </h2>

      <Card className="rounded-[15px] border-[0.5px] border-[#00000033] shadow-[0px_4px_4px_#00000040]">
        <CardContent className="p-7">
          <Input
            placeholder="Enter location"
            className="h-12 text-3xl font-normal font-['Outfit',Helvetica] text-[#00000066] placeholder:text-[#00000066] border-none focus-visible:ring-0 p-0"
          />
        </CardContent>
      </Card>
    </section>
  );
};
