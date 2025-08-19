import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const SubmissionButtonSection = (): JSX.Element => {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-normal font-['Outfit',Helvetica] mb-6">
          Request Image
        </h2>

        <Card className="w-full border border-[#00000033] shadow-[0px_4px_4px_#00000040] rounded-[15px]">
          <CardContent className="p-6 min-h-[320px] flex items-start justify-end">
            <Button
              variant="outline"
              className="bg-[#f2f2f2] text-[#000000cc] text-2xl font-normal font-['Outfit',Helvetica] h-[45px] shadow-[0px_4px_4px_#00000040] rounded-sm"
            >
              Choose file
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
