import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Textarea } from "../../../../components/ui/textarea";

export const ImageUploadSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1475px] mx-auto my-6">
      <h2 className="text-[32px] font-normal [font-family:'Outfit',Helvetica] text-black mb-5">
        Description
      </h2>

      <Card className="shadow-[0px_4px_4px_#00000040] border-[0.5px] border-[#00000033] rounded-[15px]">
        <CardContent className="p-0">
          <Textarea
            className="w-full min-h-[105px] p-7 text-[29px] [font-family:'Outfit',Helvetica] font-normal text-[#00000066] border-none resize-none focus-visible:ring-0"
            placeholder="Describe your request in detail. Include why you need help, how the donations will be used, and who will benefit."
          />
        </CardContent>
      </Card>
    </section>
  );
};
