import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContentWrapperSection = (): JSX.Element => {
  return (
    <section className="w-full space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-normal text-[32px] font-['Outfit',Helvetica]">
          Proof Documents
        </h2>
        <Button
          variant="outline"
          className="h-[45px] w-[195px] bg-[#f2f2f2] rounded-sm shadow-[0px_4px_4px_#00000040] text-[#000000cc] text-2xl font-['Outfit',Helvetica] font-normal"
        >
          Choose files
        </Button>
      </div>

      <Card className="w-full rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040]">
        <CardContent className="p-7">
          <p className="font-['Outfit',Helvetica] font-normal text-[32px] text-[#00000066]">
            Documents
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
