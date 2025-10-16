import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const DonationInstructionsSection = (): JSX.Element => {
  return (
    <section className="w-full mb-6">
      <h2 className="text-[32px] font-normal font-['Outfit',Helvetica] text-black mb-5">
        Quantity to Donate
      </h2>

      <Card className="rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040]">
        <CardContent className="p-7">
          <Input
            className="h-12 text-[32px] font-normal font-['Outfit',Helvetica] text-[#00000066] placeholder:text-[#00000066]"
            placeholder="Enter quantity"
          />
        </CardContent>
      </Card>
    </section>
  );
};
