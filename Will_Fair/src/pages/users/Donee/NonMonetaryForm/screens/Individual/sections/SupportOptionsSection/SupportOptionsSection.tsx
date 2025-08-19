import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const SupportOptionsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1475px] mx-auto my-0 py-0 px-4">
      <h2 className="text-[32px] font-normal font-['Outfit',Helvetica] text-black mb-5">
        Category
      </h2>

      <div className="w-full shadow-[0px_4px_4px_#00000040]">
        <Select>
          <SelectTrigger className="w-full h-[105px] bg-white rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040] px-[42px] py-7 text-[32px] font-['Outfit',Helvetica] font-normal text-[#00000066]">
            <SelectValue placeholder="Select a category" />
            <ChevronDownIcon className="w-[50px] h-12 ml-auto" />
          </SelectTrigger>
          <SelectContent>
            {/* Dropdown items would go here */}
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
