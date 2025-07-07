import React, { useState } from 'react';

export const IndividualDonation = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { text: "Home", href: "#" },
    { text: "Volunteer", href: "#" },
    { text: "Contact Us", href: "#" },
    { text: "About", href: "#" },
  ];

  // Footer links data
  const footerLinks = {
    quickLinks: [
      { text: "About Us", href: "#" },
      { text: "Our Programs", href: "#" },
      { text: "Our Marketplace", href: "#" },
    ],
    support: [
      { text: "Help Center", href: "#" },
      { text: "FAQs", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
    ],
    contact: [
      { text: "Reid Avenue, Colombo", href: "#" },
      { text: "+94 77 123456789", href: "tel:+94771234567" },
      { text: "info@willfair.org", href: "mailto:info@willfair.org" },
    ],
  };

  // Social media icons
  const socialIcons = [
    { src: "/group.png", alt: "Facebook" },
    { src: "/insta-logo.png", alt: "Instagram" },
    { src: "/linkedin-logo.png", alt: "LinkedIn" },
  ];

  // Progress data
  const progressData = {
    received: 23,
    target: 40,
    percentage: (23 / 40) * 100,
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return React.createElement('div', { className: 'app' },
    // Hero Section
    React.createElement('div', { className: 'hero' },
      React.createElement('img', {
        className: 'hero-bg',
        alt: 'Close up people holding box',
        src: '/close-up-people-holding-box-8.png'
      }),

      // Navigation Bar
      React.createElement('nav', { className: 'nav' },
        React.createElement('div', { className: 'nav-container' },
          React.createElement('div', { className: 'logo' },
            React.createElement('img', {
              alt: 'WillFair Logo',
              src: '/6-6.png'
            }),
            React.createElement('button', {
              className: 'back-btn',
              onClick: () => window.history.back()
            }, '← Back')
          ),

          React.createElement('button', {
            className: 'mobile-nav-toggle',
            onClick: toggleMobileMenu
          }, '☰'),

          React.createElement('ul', {
            className: `nav-links ${mobileMenuOpen ? 'active' : ''}`
          }, ...navLinks.map((link, index) =>
            React.createElement('li', { key: index },
              React.createElement('a', { href: link.href }, link.text)
            )
          )),

          React.createElement('div', { className: 'nav-right' },
            React.createElement('button', { className: 'logout-btn' }, 'Logout'),
            React.createElement('img', {
              className: 'profile-img',
              alt: 'User profile',
              src: '/image.png'
            })
          )
        )
      ),

      // Hero Title
      React.createElement('h1', { className: 'hero-title' },
        'Wheelchairs at Sathkara Elderly Care Centre'
      )
    ),

    // Main Content
    React.createElement('div', { className: 'main-content' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'content-grid' },
          // Left Column - Image
          React.createElement('div', null,
            React.createElement('img', {
              className: 'content-image',
              alt: 'Elderly people at care center',
              src: '/image-7.png'
            })
          ),

          // Right Column - Progress and Actions
          React.createElement('div', { className: 'progress-section' },
            // Progress Bar
            React.createElement('div', { className: 'progress-container' },
              React.createElement('div', { className: 'progress-bar' },
                React.createElement('div', {
                  className: 'progress-fill',
                  style: { width: `${progressData.percentage}%` }
                })
              ),
              React.createElement('img', {
                className: 'progress-icon',
                alt: 'Completed',
                src: '/tick-svgrepo-com-1.svg'
              })
            ),

            // Progress Stats
            React.createElement('div', { className: 'progress-stats' },
              React.createElement('div', { className: 'stats-labels' },
                'Received:', React.createElement('br'), 'Target:'
              ),
              React.createElement('div', { className: 'stats-values' },
                progressData.received, React.createElement('br'), progressData.target
              )
            ),

            // Action Buttons
            React.createElement('div', { className: 'action-buttons' },
              React.createElement('button', { className: 'btn btn-primary' }, 'Donate Now'),
              React.createElement('button', { className: 'btn btn-secondary' }, 'View Proof')
            )
          )
        )
      )
    ),

    // Tabs Section
    React.createElement('div', { className: 'tabs-section' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'tabs-card' },
          React.createElement('div', { className: 'tabs-list' },
            React.createElement('button', {
              className: `tab-trigger ${activeTab === 'details' ? 'active' : ''}`,
              onClick: () => setActiveTab('details')
            }, 'Details'),
            React.createElement('button', {
              className: `tab-trigger ${activeTab === 'impact' ? 'active' : ''}`,
              onClick: () => setActiveTab('impact')
            }, 'Impact'),
            React.createElement('button', {
              className: `tab-trigger ${activeTab === 'updates' ? 'active' : ''}`,
              onClick: () => setActiveTab('updates')
            }, 'Updates')
          ),
          React.createElement('div', { className: 'tab-content' },
            activeTab === 'details' && React.createElement('div', null, 'Details content goes here...'),
            activeTab === 'impact' && React.createElement('div', null, 'Impact content goes here...'),
            activeTab === 'updates' && React.createElement('div', null, 'Updates content goes here...')
          )
        )
      )
    ),

    // Footer
    React.createElement('footer', { className: 'footer' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'footer-content' },
          // Brand Section
          React.createElement('div', { className: 'footer-brand' },
            React.createElement('div', { className: 'footer-logo' },
              React.createElement('img', {
                alt: 'WillFair Logo',
                src: '/6-6.png'
              }),
              React.createElement('div', null,
                React.createElement('h2', null, 'WillFair'),
                React.createElement('p', { className: 'footer-tagline' }, 'Connecting Hearts, Changing Lives')
              )
            ),
            React.createElement('p', { className: 'footer-description' },
              'Connecting generous hearts with communities in need, creating lasting positive change through transparent and impactful giving.'
            )
          ),

          // Quick Links
          React.createElement('div', { className: 'footer-section' },
            React.createElement('h3', null, 'Quick Links'),
            React.createElement('ul', { className: 'footer-links' },
              ...footerLinks.quickLinks.map((link, index) =>
                React.createElement('li', { key: index },
                  React.createElement('a', { href: link.href }, link.text)
                )
              )
            )
          ),

          // Support
          React.createElement('div', { className: 'footer-section' },
            React.createElement('h3', null, 'Support'),
            React.createElement('ul', { className: 'footer-links' },
              ...footerLinks.support.map((link, index) =>
                React.createElement('li', { key: index },
                  React.createElement('a', { href: link.href }, link.text)
                )
              )
            )
          ),

          // Contact Us
          React.createElement('div', { className: 'footer-section' },
            React.createElement('h3', null, 'Contact Us'),
            React.createElement('ul', { className: 'footer-links' },
              ...footerLinks.contact.map((link, index) =>
                React.createElement('li', { key: index },
                  React.createElement('a', { href: link.href }, link.text)
                )
              )
            )
          )
        ),

        // Social Media
        React.createElement('div', { className: 'social-icons' },
          ...socialIcons.map((icon, index) =>
            React.createElement('a', { key: index, href: '#' },
              React.createElement('img', {
                alt: icon.alt,
                src: icon.src
              })
            )
          )
        )
      )
    )
  );
};