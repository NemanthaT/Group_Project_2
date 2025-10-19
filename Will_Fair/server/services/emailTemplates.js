/**
 * Email template for event creation confirmation
 */
function eventCreationTemplate(eventData) {
  const { title, description, location, date, secretKey, organizerName } = eventData;
  
  return {
    subject: `Event Created Successfully: ${title}`,
    text: `
Hello ${organizerName},

Your event has been created successfully!

Event Details:
- Title: ${title}
- Description: ${description}
- Location: ${location}
- Date: ${date}

IMPORTANT - Secret Event Key: ${secretKey}
Please save this key securely. You will need it to manage your event.

Thank you for using WillFair!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50; }
    .secret-key { background-color: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; text-align: center; }
    .secret-key code { font-size: 18px; font-weight: bold; color: #d9534f; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Event Created Successfully</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${organizerName}</strong>,</p>
      <p>Your event has been created successfully on WillFair!</p>
      
      <div class="details">
        <h3>Event Details:</h3>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Date:</strong> ${date}</p>
      </div>

      <div class="secret-key">
        <h3>⚠️ IMPORTANT - Secret Event Key</h3>
        <p>Please save this key securely:</p>
        <code>${secretKey}</code>
        <p style="margin-top: 10px; font-size: 14px;">You will need this key to manage and delete your event.</p>
      </div>

      <p>Thank you for using WillFair to make a difference!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for successful volunteer registration
 */
function volunteerRegistrationTemplate(volunteerData) {
  const { volunteerName, volunteerEmail, eventTitle, eventDate, eventLocation, secretKey } = volunteerData;
  
  return {
    subject: `Volunteer Registration Confirmed: ${eventTitle}`,
    text: `
Hello ${volunteerName},

You have successfully registered as a volunteer for the event!

Event Details:
- Event: ${eventTitle}
- Date: ${eventDate}
- Location: ${eventLocation}

Your Volunteer Secret Key: ${secretKey}
Save this key - you'll need it to manage your volunteer registration.

We look forward to seeing you at the event!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #2196F3; }
    .secret-key { background-color: #e3f2fd; border: 2px solid #2196F3; padding: 15px; margin: 20px 0; text-align: center; }
    .secret-key code { font-size: 18px; font-weight: bold; color: #1976D2; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Volunteer Registration Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${volunteerName}</strong>,</p>
      <p>Thank you for volunteering! Your registration has been confirmed.</p>
      
      <div class="details">
        <h3>Event Details:</h3>
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
      </div>

      <div class="secret-key">
        <h3>🔑 Your Volunteer Secret Key</h3>
        <code>${secretKey}</code>
        <p style="margin-top: 10px; font-size: 14px;">Save this key to manage your volunteer registration.</p>
      </div>

      <p>We're excited to have you join us. See you at the event!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for volunteer unregistration
 */
function volunteerUnregistrationTemplate(volunteerData) {
  const { volunteerName, eventTitle } = volunteerData;
  
  return {
    subject: `Volunteer Unregistration Confirmed: ${eventTitle}`,
    text: `
Hello ${volunteerName},

You have successfully unregistered from the event "${eventTitle}".

We're sorry to see you go, but we understand that plans change.

We hope to see you at future WillFair events!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Volunteer Unregistration Confirmed</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${volunteerName}</strong>,</p>
      <p>You have successfully unregistered from the event <strong>"${eventTitle}"</strong>.</p>
      <p>We're sorry to see you go, but we understand that plans change.</p>
      <p>We hope to see you at future WillFair events and appreciate your interest in volunteering!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for event deletion (organizer)
 */
function eventDeletionOrganizerTemplate(eventData) {
  const { eventTitle, organizerName } = eventData;
  
  return {
    subject: `Event Deleted: ${eventTitle}`,
    text: `
Hello ${organizerName},

Your event "${eventTitle}" has been successfully deleted from WillFair.

All volunteers registered for this event have been notified of the cancellation.

Thank you for using WillFair.

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Event Deleted</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${organizerName}</strong>,</p>
      <p>Your event <strong>"${eventTitle}"</strong> has been successfully deleted from WillFair.</p>
      <p>All volunteers registered for this event have been notified of the cancellation.</p>
      <p>Thank you for using WillFair.</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for event cancellation (volunteers)
 */
function eventCancellationVolunteerTemplate(volunteerData) {
  const { volunteerName, eventTitle } = volunteerData;
  
  return {
    subject: `Event Cancelled: ${eventTitle}`,
    text: `
Hello ${volunteerName},

We regret to inform you that the event "${eventTitle}" has been cancelled by the organizer.

Your volunteer registration for this event has been automatically removed.

We apologize for any inconvenience and hope to see you at future WillFair events!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ Event Cancelled</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${volunteerName}</strong>,</p>
      <p>We regret to inform you that the event <strong>"${eventTitle}"</strong> has been cancelled by the organizer.</p>
      <p>Your volunteer registration for this event has been automatically removed.</p>
      <p>We apologize for any inconvenience and hope to see you at future WillFair events!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for event approval notification (organizer)
 */
function eventApprovalTemplate(eventData) {
  const { organizerName, eventTitle, eventDate, eventLocation } = eventData;
  
  return {
    subject: `Event Approved: ${eventTitle}`,
    text: `
Hello ${organizerName},

Great news! Your event "${eventTitle}" has been approved and is now live on WillFair!

Event Details:
- Title: ${eventTitle}
- Date: ${eventDate}
- Location: ${eventLocation}

Your event is now visible to volunteers and they can start registering. You will receive notifications when volunteers sign up for your event.

Thank you for organizing events on WillFair and making a positive impact in the community!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50; }
    .success-badge { background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 15px 0; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Event Approved!</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${organizerName}</strong>,</p>
      <p>Congratulations! Your event has been approved and is now live on WillFair!</p>
      
      <div class="success-badge">
        🎉 Your event is now visible to volunteers
      </div>
      
      <div class="details">
        <h3>Event Details:</h3>
        <p><strong>Title:</strong> ${eventTitle}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
      </div>

      <p>Volunteers can now view and register for your event. You will receive email notifications when volunteers sign up.</p>
      
      <p>Thank you for organizing events on WillFair and making a positive impact in the community!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

/**
 * Email template for new volunteer notification (organizer)
 */
function newVolunteerNotificationTemplate(data) {
  const { organizerName, eventTitle, volunteerName, volunteerEmail, totalVolunteers } = data;
  
  return {
    subject: `New Volunteer Registered: ${eventTitle}`,
    text: `
Hello ${organizerName},

Good news! A new volunteer has registered for your event "${eventTitle}".

Volunteer Details:
- Name: ${volunteerName}
- Email: ${volunteerEmail}

Total Volunteers: ${totalVolunteers}

Keep up the great work organizing events on WillFair!

Best regards,
The WillFair Team
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Volunteer Registered!</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${organizerName}</strong>,</p>
      <p>Great news! A new volunteer has registered for your event <strong>"${eventTitle}"</strong>.</p>
      
      <div class="details">
        <h3>Volunteer Details:</h3>
        <p><strong>Name:</strong> ${volunteerName}</p>
        <p><strong>Email:</strong> ${volunteerEmail}</p>
        <p><strong>Total Volunteers:</strong> ${totalVolunteers}</p>
      </div>

      <p>Keep up the great work organizing events on WillFair!</p>
    </div>
    <div class="footer">
      <p>© 2025 WillFair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  };
}

export {
  eventCreationTemplate,
  volunteerRegistrationTemplate,
  volunteerUnregistrationTemplate,
  eventDeletionOrganizerTemplate,
  eventCancellationVolunteerTemplate,
  newVolunteerNotificationTemplate,
  eventApprovalTemplate
};