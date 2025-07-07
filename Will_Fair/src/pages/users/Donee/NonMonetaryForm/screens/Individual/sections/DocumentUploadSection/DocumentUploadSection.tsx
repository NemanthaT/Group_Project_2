import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

export const DocumentUploadSection = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <section className="w-full max-w-[1475px] mx-auto my-8">
      <h2 className="text-[32px] font-normal font-['Outfit',Helvetica] text-black mb-5">
        Deadline
      </h2>

      <Card className="w-full rounded-[15px] border-[0.5px] border-[#00000033] shadow-[0px_4px_4px_#00000040]">
        <CardContent className="p-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-[105px] justify-between rounded-[15px] border-none shadow-none px-[42px] py-7 hover:bg-white"
              >
                <span className="font-['Outfit',Helvetica] font-normal text-[32px] text-[#00000066]">
                  {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
                </span>
                <CalendarIcon className="h-12 w-12 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </section>
  );
};
