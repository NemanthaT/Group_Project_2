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

export const Individual = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Navigation Bar */}
      <NavigationBarSection />

      {/* Hero section with gradient background and image */}
      <div className="hero-section">
        <img
          className="hero-image"
          alt="Close up people"
          src="/close-up-people-holding-box-3.png"
        />
        <div className="hero-content">
          <h1 className="hero-title">
            Submit Donation Request
          </h1>
          <p className="hero-subtitle">
            Connect with generous donors who wants to help your cause
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex justify-center w-full">
        <div className="container">
          <Card className="form-card my-12">
            <MainContentSection />

            {/* Description text */}
            <div className="w-full px-4 py-6 mb-6">
              <div className="w-full bg-white">
                <p className="text-center text-xl font-light">
                  Submit your donation request with detailed information about
                  what you need. Once approved, your request will be visible to
                  potential donors.
                </p>
              </div>
            </div>

            {/* Form sections */}
            <div className="px-6">
              <FormWrapperSection />
              <SupportOptionsSection />
              <ImageUploadSection />
              <DonationFormSection />
              <FormHeaderSection />
              <RequestDetailsSection />
              <DocumentUploadSection />
              <SubmissionButtonSection />

              {/* Document upload section with description */}
              <div className="w-full mb-8">
                <ContentWrapperSection />
                <p className="font-light text-gray-600 text-lg mt-4">
                  Upload PDF document/s as proof for your request
                  (medical reports, school documents, etc.). PDF only. max 5MB.
                </p>
              </div>

              {/* Create Request button - moved to the end */}
              <div className="flex justify-end w-full mb-8">
                <Button className="btn btn-primary">
                  Create Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};