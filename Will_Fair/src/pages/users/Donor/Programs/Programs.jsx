import React, { useState } from "react";

export const Programs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Program data for Early Bird Child Care
  const earlyBirdPrograms = [
    {
      id: 1,
      title: "Renovations at Early Bird Child Care - Karapitiya",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12,
    },
    {
      id: 2,
      title: "Renovations at Early Bird Child Care - Karapitiya",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12,
    },
    {
      id: 3,
      title: "Renovations at Early Bird Child Care - Karapitiya",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12,
    },
    {
      id: 4,
      title: "Renovations at Early Bird Child Care - Karapitiya",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12,
    },
  ];

  // Program data for Elderly Care
  const elderlyCarePrograms = [
    {
      id: 5,
      title: "Renovations at Elderly Care - Colombo",
      image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "23,000.00",
      target: "40,000.00",
      progress: 58,
    },
    {
      id: 6,
      title: "Renovations at Elderly Care - Colombo",
      image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "23,000.00",
      target: "40,000.00",
      progress: 58,
    },
    {
      id: 7,
      title: "Renovations at Elderly Care - Colombo",
      image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "23,000.00",
      target: "40,000.00",
      progress: 58,
    },
    {
      id: 8,
      title: "Renovations at Elderly Care - Colombo",
      image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "23,000.00",
      target: "40,000.00",
      progress: 58,
    },
  ];

  // Program data for Special Care
  const specialCarePrograms = [
    {
      id: 9,
      title: "Renovations at Special Care - Matara",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44,
    },
    {
      id: 10,
      title: "Renovations at Special Care - Matara",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44,
    },
    {
      id: 11,
      title: "Renovations at Special Care - Matara",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44,
    },
    {
      id: 12,
      title: "Renovations at Special Care - Matara",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=450&h=326&fit=crop",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44,
    },
  ];

  // Filter options
  const filterOptions = [
    { id: "sort", label: "Sort by" },
    { id: "type", label: "Type" },
    { id: "category", label: "Category" },
    { id: "status", label: "Status" },
    { id: "location", label: "Location" },
  ];

  // Navigation links
  const navLinks = [
    { label: "Home", href: "#", active: false },
    { label: "Volunteer", href: "#", active: true },
    { label: "Contact Us", href: "#", active: false },
    { label: "About", href: "#", active: false },
  ];

  // Footer links
  const footerLinks = {
    quickLinks: ["About Us", "Our Programs", "Our Marketplace"],
    support: ["Help Center", "FAQs", "Privacy Policy", "Terms of Service"],
    contact: ["Reid Avenue, Colombo", "+94 77 123456789", "info@willfair.org"],
  };

  // Handle back button click
  const handleBackClick = () => {
    // You can implement navigation logic here
    console.log("Back button clicked");
  };

  // Render a program card
  const renderProgramCard = (program) => React.createElement(
    "div",
    { key: program.id, className: "program-card" },
    React.createElement(
      "div",
      { className: "card-header" },
      React.createElement(
        "div",
        {
          className: "card-image",
          style: { backgroundImage: `url(${program.image})` }
        },
        React.createElement("div", { className: "badge" }, "Education")
      )
    ),
    React.createElement(
      "div",
      { className: "card-content" },
      React.createElement("h3", { className: "card-title" }, program.title),
      React.createElement(
        "div",
        { className: "progress-container" },
        React.createElement(
          "div",
          { className: "progress-track" },
          React.createElement(
            "div",
            {
              className: "progress-fill",
              style: { width: `${program.progress}%` }
            }
          ),
          React.createElement(
            "div",
            { className: "progress-icon" },
            React.createElement(
              "svg",
              { width: "16", height: "12", viewBox: "0 0 16 12", fill: "none" },
              React.createElement("path", {
                d: "M1 6L6 11L15 1",
                stroke: "white",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "funding-info" },
        React.createElement(
          "div",
          { className: "funding-labels" },
          "Raised:",
          React.createElement("br"),
          "Target:"
        ),
        React.createElement(
          "div",
          { className: "funding-amounts" },
          program.raised,
          React.createElement("br"),
          program.target
        )
      )
    ),
    React.createElement(
      "div",
      { className: "card-footer" },
      React.createElement("button", { className: "btn btn-outline" }, "Details"),
      React.createElement("button", { className: "btn btn-primary" }, "Donate")
    )
  );

  return React.createElement(
    "div",
    { className: "app" },
    // Hero Section
    React.createElement(
      "div",
      { className: "hero-section" },
      React.createElement("div", { className: "hero-background" }),
      React.createElement("div", { className: "hero-overlay" }),
      // Navigation
      React.createElement(
        "header",
        { className: "header" },
        React.createElement("div", { className: "nav-background" }),
        // Logo
        React.createElement(
          "div",
          { className: "logo-container" },
          React.createElement(
            "div",
            { className: "logo-circle" },
            React.createElement("span", { className: "logo-text" }, "WF")
          )
        ),
        // Back Button
        React.createElement(
          "a",
          { 
            href: "#",
            className: "back-button",
            onClick: handleBackClick
          },
          React.createElement("span", { className: "back-arrow" }, "← "),
          React.createElement("span", { className: "back-text" }, "Back")
        ),
        // Navigation Container
        React.createElement(
          "div",
          { className: "nav-container" },
          // Desktop Navigation
          React.createElement(
            "nav",
            { className: "desktop-nav" },
            navLinks.map((link, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className: `nav-link ${link.active ? 'nav-link-active' : ''}`
                },
                link.label
              )
            )
          ),
          // Mobile Menu Button
          React.createElement(
            "button",
            {
              className: "mobile-menu-btn",
              onClick: () => setMobileMenuOpen(!mobileMenuOpen)
            },
            React.createElement(
              "svg",
              { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
              React.createElement("path", {
                d: "M3 12H21M3 6H21M3 18H21",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            )
          ),
          // Sign In Button
          React.createElement("button", { className: "signin-btn" }, "Sign in")
        ),
        // Mobile Menu
        mobileMenuOpen && React.createElement(
          "div",
          { className: "mobile-menu" },
          navLinks.map((link, index) =>
            React.createElement(
              "div",
              {
                key: index,
                className: `mobile-nav-link ${link.active ? 'mobile-nav-link-active' : ''}`
              },
              link.label
            )
          )
        )
      ),
      // Hero Content
      React.createElement(
        "div",
        { className: "hero-content" },
        React.createElement("h1", { className: "hero-title" }, "Featured Programs"),
        React.createElement(
          "p",
          { className: "hero-subtitle" },
          "Every act of giving fuels a story of hope. Explore programs where your kindness sparks change — in communities, lives, and futures"
        )
      )
    ),
    // Filters
    React.createElement(
      "div",
      { className: "filters-container" },
      filterOptions.map((filter) =>
        React.createElement(
          "div",
          { key: filter.id, className: "filter-dropdown" },
          React.createElement("span", { className: "filter-label" }, filter.label),
          React.createElement(
            "svg",
            { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none" },
            React.createElement("path", {
              d: "M5 7.5L10 12.5L15 7.5",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          )
        )
      )
    ),
    // Programs Grid
    React.createElement(
      "div",
      { className: "programs-container" },
      // Row 1
      React.createElement(
        "div",
        { className: "programs-grid" },
        renderProgramCard(earlyBirdPrograms[0]),
        renderProgramCard(elderlyCarePrograms[0]),
        renderProgramCard(specialCarePrograms[0])
      ),
      // Row 2
      React.createElement(
        "div",
        { className: "programs-grid" },
        renderProgramCard(earlyBirdPrograms[1]),
        renderProgramCard(elderlyCarePrograms[1]),
        renderProgramCard(specialCarePrograms[1])
      ),
      // Row 3
      React.createElement(
        "div",
        { className: "programs-grid" },
        renderProgramCard(earlyBirdPrograms[2]),
        renderProgramCard(elderlyCarePrograms[2]),
        renderProgramCard(specialCarePrograms[2])
      ),
      // Row 4
      React.createElement(
        "div",
        { className: "programs-grid" },
        renderProgramCard(earlyBirdPrograms[3]),
        renderProgramCard(elderlyCarePrograms[3]),
        renderProgramCard(specialCarePrograms[3])
      )
    ),
    // Footer
    React.createElement(
      "footer",
      { className: "footer" },
      React.createElement(
        "div",
        { className: "footer-container" },
        React.createElement(
          "div",
          { className: "footer-grid" },
          // Logo and Description
          React.createElement(
            "div",
            { className: "footer-brand" },
            React.createElement(
              "div",
              { className: "footer-logo-container" },
              React.createElement(
                "div",
                { className: "footer-logo-circle" },
                React.createElement("span", { className: "footer-logo-text" }, "WF")
              )
            ),
            React.createElement("h2", { className: "footer-brand-name" }, "WillFair"),
            React.createElement("p", { className: "footer-tagline" }, "Connecting Hearts, Changing Lives"),
            React.createElement(
              "p",
              { className: "footer-description" },
              "Connecting generous hearts with communities in need, creating lasting positive change through transparent and impactful giving."
            ),
            React.createElement(
              "div",
              { className: "social-links" },
              React.createElement("a", { href: "#", className: "social-link facebook" }, "f"),
              React.createElement("a", { href: "#", className: "social-link instagram" }, "IG"),
              React.createElement("a", { href: "#", className: "social-link linkedin" }, "in")
            )
          ),
          // Quick Links
          React.createElement(
            "div",
            { className: "footer-section" },
            React.createElement("h3", { className: "footer-section-title" }, "Quick Links"),
            React.createElement(
              "ul",
              { className: "footer-links" },
              footerLinks.quickLinks.map((link, index) =>
                React.createElement(
                  "li",
                  { key: index },
                  React.createElement("a", { href: "#", className: "footer-link" }, link)
                )
              )
            )
          ),
          // Support
          React.createElement(
            "div",
            { className: "footer-section" },
            React.createElement("h3", { className: "footer-section-title" }, "Support"),
            React.createElement(
              "ul",
              { className: "footer-links" },
              footerLinks.support.map((link, index) =>
                React.createElement(
                  "li",
                  { key: index },
                  React.createElement("a", { href: "#", className: "footer-link" }, link)
                )
              )
            )
          ),
          // Contact Us
          React.createElement(
            "div",
            { className: "footer-section" },
            React.createElement("h3", { className: "footer-section-title" }, "Contact Us"),
            React.createElement(
              "ul",
              { className: "footer-links" },
              footerLinks.contact.map((info, index) =>
                React.createElement("li", { key: index, className: "footer-contact" }, info)
              )
            )
          )
        )
      )
    )
  );
};