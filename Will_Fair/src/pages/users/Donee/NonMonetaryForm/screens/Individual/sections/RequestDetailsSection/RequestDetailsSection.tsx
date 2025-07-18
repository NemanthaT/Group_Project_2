import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const RequestDetailsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1475px] my-8">
      <h2 className="text-[32px] font-normal font-['Outfit',Helvetica] text-black mb-5">
        Province
      </h2>

      <div className="w-full shadow-[0px_4px_4px_#00000040]">
        <Select>
          <SelectTrigger className="w-full h-[105px] bg-white rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040] px-10">
            <div className="flex justify-between items-center w-full">
              <SelectValue
                placeholder="Select province"
                className="text-[32px] font-normal font-['Outfit',Helvetica] text-[#00000066]"
              />
              <ChevronDownIcon className="w-[50px] h-12" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alberta">Alberta</SelectItem>
            <SelectItem value="british-columbia">British Columbia</SelectItem>
            <SelectItem value="manitoba">Manitoba</SelectItem>
            <SelectItem value="new-brunswick">New Brunswick</SelectItem>
            <SelectItem value="newfoundland">
              Newfoundland and Labrador
            </SelectItem>
            <SelectItem value="nova-scotia">Nova Scotia</SelectItem>
            <SelectItem value="ontario">Ontario</SelectItem>
            <SelectItem value="pei">Prince Edward Island</SelectItem>
            <SelectItem value="quebec">Quebec</SelectItem>
            <SelectItem value="saskatchewan">Saskatchewan</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
