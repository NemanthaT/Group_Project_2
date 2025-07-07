import React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ContentWrapperSection } from "./sections/ContentWrapperSection";
import { DocumentUploadSection } from "./sections/DocumentUploadSection";
import { DonationFormSection } from "./sections/DonationFormSection";
import { FooterSection } from "./sections/FooterSection";
import { FormHeaderSection } from "./sections/FormHeaderSection/FormHeaderSection";
import { FormWrapperSection } from "./sections/FormWrapperSection";
import { ImageUploadSection } from "./sections/ImageUploadSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { RequestDetailsSection } from "./sections/RequestDetailsSection";
import { SubmissionButtonSection } from "./sections/SubmissionButtonSection";
import { SupportOptionsSection } from "./sections/SupportOptionsSection/SupportOptionsSection";

export const Individual = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Navigation Bar */}
      <NavigationBarSection />

      {/* Hero section with gradient background and image */}
      <div className="relative w-full">
        <div className="w-full bg-[linear-gradient(180deg,rgba(137,10,180,1)_0%,rgba(13,66,155,1)_100%)]">
          <img
            className="w-full h-[506px] object-cover"
            alt="Close up people"
            src="/close-up-people-holding-box-3.png"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="font-['Outfit',Helvetica] font-semibold text-white text-[64px] text-center max-w-[1257px]">
              Submit Donation Request
            </h1>
            <p className="font-['Outfit',Helvetica] font-light text-white text-4xl text-center max-w-[1683px] mt-4">
              Connect with generous donors who wants to help your cause
            </p>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex justify-center w-full">
        <Card className="w-full max-w-[1660px] my-12 bg-[url(/rectangle-30.svg)] bg-[100%_100%] border-none shadow-none">
          <MainContentSection />

          {/* Description text */}
          <div className="w-full px-4 py-3 mb-6">
            <div className="w-full bg-white">
              <p className="font-['Outfit',Helvetica] font-extralight text-black text-[26px] text-center py-3">
                Submit your donation request with detailed information about
                what you need. Once approved, your request will be visible to
                potential donors.
              </p>
            </div>
          </div>

          {/* Form sections */}
          <FormWrapperSection />
          <SupportOptionsSection />
          <ImageUploadSection />
          <DocumentUploadSection />
          <DonationFormSection />
          <FormHeaderSection />
          <RequestDetailsSection />

          {/* Submission button */}
          <div className="flex justify-end w-full px-6 mb-8">
            <SubmissionButtonSection />
            <Button className="w-[410px] h-[79px] rounded-[20px] bg-purple-600 hover:bg-purple-700">
              <span className="font-['Outfit',Helvetica] font-normal text-white text-[32px]">
                Create Request
              </span>
            </Button>
          </div>

          {/* Document upload section with description */}
          <div className="w-full px-6 mb-8">
            <ContentWrapperSection />
            <p className="font-['Outfit',Helvetica] font-extralight text-[#00000099] text-[26px] mt-4">
              Upload&nbsp;&nbsp;PDF document/s as proof for your request
              (medical reports, school documents, etc.). PDF only. max 5MB.
            </p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
