import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

export const DonationFormSection = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <section className="w-full max-w-[1475px] mx-auto my-6">
      <h2 className="text-[32px] font-normal font-['Outfit',Helvetica] text-black mb-5">
        Dropoff Date
      </h2>

      <div className="w-full shadow-[0px_4px_4px_#00000040]">
        <div className="relative w-full h-[105px] bg-white rounded-[15px] border-[0.5px] border-solid border-[#00000033] shadow-[0px_4px_4px_#00000040]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-full justify-start text-left font-normal font-['Outfit',Helvetica] text-[32px] text-[#00000066] px-[42px] rounded-[15px] border-none"
              >
                {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
                <CalendarIcon className="ml-auto w-12 h-12" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
};
