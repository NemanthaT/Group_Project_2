import React from "react";
import { DonationDetailsSection } from "./sections/DonationDetailsSection";
import { FooterSection } from "./sections/FooterSection";
import { FormWrapperSection } from "./sections/FormWrapperSection";
import { MainContentWrapperSection } from "./sections/MainContentWrapperSection";
import { NavigationBarSection } from "./sections/NavigationBarSection/NavigationBarSection";
import { ProofDocumentsSection } from "./sections/ProofDocumentsSection";
import { RequestImageSection } from "./sections/RequestImageSection";
import { SubmissionInstructionsSection } from "./sections/SubmissionInstructionsSection";
import { SupportOptionsSection } from "./sections/SupportOptionsSection";
import "../../styles/global.css"; 


export const Individual = () => {
  return (
    <div className="flex flex-col w-full">

      {/* Header Section with Background */}
      <div className="hero-section">
        <div className="hero-bg">
          <img
            className="hero-image"
            alt="Close up people"
            src="/close-up-people-holding-box-3.png"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Submit Donation Request
          </h1>
          <p className="hero-subtitle">
            Connect with generous donors who wants to help your cause
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-card">
          {/* Instruction Text */}
          <div className="instruction-text">
            <p>
              Submit your donation request with detailed information about
              what you need. Once approved, your request will be visible to
              potential donors.
            </p>
          </div>

          {/* Support Options Section */}
          <SupportOptionsSection />

          {/* Form Wrapper Section */}
          <FormWrapperSection />

          {/* Proof Documents Section */}
          <ProofDocumentsSection />

          {/* Donation Details Section */}
          <DonationDetailsSection />

          {/* Submission Instructions Section */}
          <SubmissionInstructionsSection />

          {/* Request Image Section */}
          <RequestImageSection />

          {/* Main Content Wrapper Section */}
          <div className="form-section">
            <MainContentWrapperSection />

            <p className="mt-4" style={{ fontSize: '26px', fontWeight: '200', color: 'rgba(0, 0, 0, 0.6)' }}>
              Upload&nbsp;&nbsp;PDF document/s as proof for your request
              (medical reports, school documents, etc.). PDF only, max 5MB.
            </p>
          </div>

          {/* Create Request Button */}
          <div className="create-request-wrapper">
            <button className="create-request-button">
              Create Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;