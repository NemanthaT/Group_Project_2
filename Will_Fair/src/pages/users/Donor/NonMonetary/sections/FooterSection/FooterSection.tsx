import React from "react";
import { Separator } from "../../../../components/ui/separator";

export const FooterSection = (): JSX.Element => {
  // Footer link data for mapping
  const quickLinks = [
    { text: "About Us" },
    { text: "Our Programs" },
    { text: "Our Marketplace" },
  ];

  const supportLinks = [
    { text: "Help Center" },
    { text: "FAQs" },
    { text: "Privacy Policy" },
    { text: "Terms of Service" },
  ];

  const contactInfo = [
    { text: "Reid Avanue, Colombo" },
    { text: "+94 77 123456789" },
    { text: "info@willfair.org" },
  ];

  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <img
              className="w-[197px] h-[197px] object-cover"
              alt="WillFair Logo"
              src="/6-6.png"
            />
          </div>
          <div className="font-['Outfit',Helvetica] font-extrabold text-5xl">
            WillFair
          </div>
          <div className="font-['Outfit',Helvetica] font-extrabold text-xl">
            Connecting Hearts, Changing Lives
          </div>
          <div className="font-['Outfit',Helvetica] font-normal text-xl max-w-[351px] mt-4">
            Connecting generous hearts with communities in need, creating
            lasting positive change through transparent and impactful giving.
          </div>
          <div className="flex space-x-4 mt-6">
            <div className="w-[50px] h-[50px] bg-[url(/group.png)] bg-[100%_100%]" />
            <img
              className="w-[50px] h-[50px]"
              alt="Instagram logo"
              src="/insta-logo.png"
            />
            <img
              className="w-[50px] h-[50px]"
              alt="LinkedIn logo"
              src="/linkedin-logo.png"
            />
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-['Outfit',Helvetica] font-semibold text-xl">
            Quick Links
          </h3>
          <Separator className="bg-gray-700" />
          <nav className="flex flex-col space-y-4">
            {quickLinks.map((link, index) => (
              <a
                key={`quick-link-${index}`}
                href="#"
                className="font-['Outfit',Helvetica] font-normal text-xl hover:text-gray-300 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>

        {/* Support Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-['Outfit',Helvetica] font-semibold text-xl">
            Support
          </h3>
          <Separator className="bg-gray-700" />
          <nav className="flex flex-col space-y-4">
            {supportLinks.map((link, index) => (
              <a
                key={`support-link-${index}`}
                href="#"
                className="font-['Outfit',Helvetica] font-normal text-xl hover:text-gray-300 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Us Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-['Outfit',Helvetica] font-semibold text-xl">
            Contact Us
          </h3>
          <Separator className="bg-gray-700" />
          <div className="flex flex-col space-y-4">
            {contactInfo.map((info, index) => (
              <div
                key={`contact-info-${index}`}
                className="font-['Outfit',Helvetica] font-normal text-xl"
              >
                {info.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
