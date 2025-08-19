import React from "react";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";

export const TermsAgreementSection = (): JSX.Element => {
  return (
    <div className="w-full font-['Outfit',Helvetica] text-black text-4xl">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" className="h-6 w-6" />
        <Label
          htmlFor="terms"
          className="flex items-center cursor-pointer font-normal"
        >
          I agree to the{" "}
          <span className="font-bold mx-1 hover:underline cursor-pointer">
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span className="font-bold ml-1 hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </Label>
      </div>
    </div>
  );
};
