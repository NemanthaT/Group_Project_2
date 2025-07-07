import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FormWrapperSection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[1475px] my-6">
      <div className="mb-4">
        <h2 className="font-normal text-[32px] [font-family:'Outfit',Helvetica] text-black">
          Request name
        </h2>
      </div>

      <Card className="rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040]">
        <CardContent className="p-7">
          <Input
            className="h-12 w-full [font-family:'Outfit',Helvetica] font-normal text-[32px] text-[#00000066] placeholder:text-[#00000066]"
            placeholder="Enter request name"
          />
        </CardContent>
      </Card>
    </div>
  );
};
