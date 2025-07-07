import React from "react";

export const FooterSection = (): JSX.Element => {
  // Footer data for better organization and maintainability
  const quickLinks = [
    { text: "About Us", href: "#" },
    { text: "Our Programs", href: "#" },
    { text: "Our Marketplace", href: "#" },
  ];

  const supportLinks = [
    { text: "Help Center", href: "#" },
    { text: "FAQs", href: "#" },
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ];

  const contactInfo = [
    { text: "Reid Avanue, Colombo", href: "#" },
    { text: "+94 77 123456789", href: "tel:+94771234567" },
    { text: "info@willfair.org", href: "mailto:info@willfair.org" },
  ];

  const socialMedia = [
    { icon: "/group.png", alt: "Facebook", href: "#" },
    { icon: "/insta-logo.png", alt: "Instagram", href: "#" },
    { icon: "/linkedin-logo.png", alt: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="w-full bg-black text-white font-['Outfit',Helvetica]">
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img
                className="w-[197px] h-[197px] object-cover"
                alt="WillFair Logo"
                src="/6-6.png"
              />
              <h2 className="text-5xl font-extrabold ml-5">WillFair</h2>
            </div>
            <h3 className="text-xl font-extrabold mb-4">
              Connecting Hearts, Changing Lives
            </h3>
            <p className="text-xl font-normal max-w-[351px]">
              Connecting generous hearts with communities in need, creating
              lasting positive change through transparent and impactful giving.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-8">
              {socialMedia.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.alt}>
                  {index === 0 ? (
                    <div className="w-[50px] h-[50px] bg-[url(/group.png)] bg-[100%_100%]" />
                  ) : (
                    <img
                      className="w-[50px] h-[50px]"
                      alt={social.alt}
                      src={social.icon}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-xl font-normal hover:underline"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-xl font-normal hover:underline"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="text-xl font-normal hover:underline"
                  >
                    {info.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
