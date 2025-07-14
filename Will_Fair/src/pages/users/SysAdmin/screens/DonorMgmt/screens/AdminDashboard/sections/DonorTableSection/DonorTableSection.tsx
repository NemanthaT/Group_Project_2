import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const DonorTableSection = (): JSX.Element => {
  // Donor data that can be expanded for multiple entries
  const donorData = [
    {
      name: "Jackson Anthony",
      email: "jackson@gmail.com",
      phone: "0771234659",
    },
  ];

  return (
    <section className="w-full py-4">
      <Card className="w-full bg-[#ffffff80] rounded-[10px] shadow-[4px_2px_2px_#00000005]">
        <CardContent className="p-0">
          <div className="w-full">
            {donorData.map((donor, index) => (
              <div key={index} className="flex items-center p-6 w-full">
                <div className="flex-1 font-['Outfit',Helvetica] font-light text-black text-2xl">
                  {donor.name}
                </div>
                <div className="flex-1 font-['Outfit',Helvetica] font-light text-black text-2xl">
                  {donor.email}
                </div>
                <div className="flex-1 font-['Outfit',Helvetica] font-light text-black text-2xl">
                  {donor.phone}
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#0d429b] rounded-[30px] border border-solid border-[#ffffff33] h-[41px] w-[103px] font-['Outfit',Helvetica] font-medium text-white text-base">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
