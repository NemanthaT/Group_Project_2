import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const DonorListSection = (): JSX.Element => {
  // Donor data that can be mapped over if more donors are added
  const donorData = [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "0771234659",
    },
  ];

  return (
    <section className="w-full py-4">
      <Card className="bg-[#ffffff80] shadow-[4px_2px_2px_#00000005] rounded-[10px]">
        <CardContent className="p-0">
          {donorData.map((donor, index) => (
            <div key={index} className="flex items-center p-6">
              <div className="flex-1 [font-family:'Outfit',Helvetica] font-light text-black text-2xl">
                {donor.name}
              </div>
              <div className="flex-1 [font-family:'Outfit',Helvetica] font-light text-black text-2xl">
                {donor.email}
              </div>
              <div className="flex-1 [font-family:'Outfit',Helvetica] font-light text-black text-2xl">
                {donor.phone}
              </div>
              <div className="ml-4">
                <Button className="bg-[#0d429b] rounded-[30px] border border-solid border-[#ffffff33] h-[41px] w-[103px] [font-family:'Outfit',Helvetica] font-medium text-white text-base">
                  View
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
