import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const DonationFormSection = (): JSX.Element => {
  return (
    <div className="w-full py-8">
      <div className="mb-4">
        <label
          htmlFor="item-name"
          className="block font-outfit text-3xl font-normal text-black"
        >
          Item name
        </label>
      </div>

      <Card className="border-[0.5px] border-[#00000033] shadow-[0px_4px_4px_#00000040] rounded-[15px]">
        <CardContent className="p-0">
          <Input
            id="item-name"
            placeholder="Enter item name"
            className="border-none h-[105px] px-10 py-7 text-3xl font-outfit font-normal text-[#00000066] focus-visible:ring-0"
          />
        </CardContent>
      </Card>
    </div>
  );
};
