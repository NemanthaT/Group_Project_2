import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const MainContentSection = (): JSX.Element => {
  const tabOptions = [
    { id: "monetary", label: "Monetary Support" },
    { id: "non-monetary", label: "Non Monetary Support" },
  ];

  return (
    <section className="w-full py-8 px-4">
      <Tabs defaultValue="monetary" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-[100px] rounded-[20px] p-0 shadow-[0px_4px_4px_#00000040]">
          {tabOptions.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`rounded-[20px] h-full border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040] [font-family:'Outfit',Helvetica] font-semibold text-[35px] data-[state=active]:text-black data-[state=inactive]:text-white data-[state=active]:bg-white data-[state=inactive]:bg-[#9333ea]`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </section>
  );
};
