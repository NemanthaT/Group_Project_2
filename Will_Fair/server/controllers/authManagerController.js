import {
  getPendingDonations,
  acceptDonationRequest,
  rejectDonationRequest,
  getPendingDonationDetail,
  getDonationStats
} from "../models/authManagerModel.js";
import { 
  getPendingEvents, 
  getPendingDeletionEvents, 
  approveEvent, 
  deleteEvent,
  getPendingEventsCount,
  getPendingDeletionEventsCount,
  getEventCounts,
  getEventById
} from "../models/eventModel.js";
import { sendEmail } from "../services/emailService.js";
import { 
  eventDeletionOrganizerTemplate, 
  eventCancellationVolunteerTemplate,
  eventApprovalTemplate 
} from "../services/emailTemplates.js";
import pool from "../db.js";

export const getPendingDonationsController = async (req, res) => {
  const result = await getPendingDonations();
  if (result.success) {
    res.status(200).json({ requests: result.requests });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export const acceptDonationRequestController = async (req, res) => {
  const { id } = req.params;
  const result = await acceptDonationRequest(id);
  if (result.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export const rejectDonationRequestController = async (req, res) => {
  const { id } = req.params;
  const result = await rejectDonationRequest(id);
  if (result.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export const getPendingDonationDetailController = async (req, res) => {
  const { id } = req.params;
  const result = await getPendingDonationDetail(id);
  if (result.success) {
    res.status(200).json({ donation: result.donation });
  } else {
    res.status(404).json({ error: result.message });
  }
};

export const getDonationStatsController = async (req, res) => {
  try {
    const stats = await getDonationStats();
    res.status(200).json({ stats });
  } catch {
    res.status(500).json({ error: "Failed to fetch donation stats" });
  }
};

// Retrieves all events pending approval
export const getPendingEventsController = async (req, res) => {
    try {
        const result = await getPendingEvents();
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            events: result.events 
        });
    } catch (err) {
        console.error('Error fetching pending events:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching pending events' 
        });
    }
};

// Retrieves all events marked for deletion pending approval
export const getPendingDeletionEventsController = async (req, res) => {
    try {
        const result = await getPendingDeletionEvents();

        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            events: result.events 
        });
    } catch (err) {
        console.error('Error fetching pending events:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching pending events' 
        });
    }
};

// Approves a pending event and sends confirmation email to organizer
export const approveEventController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                error: "Event ID is required" 
            });
        }
        
        const eventResult = await getEventById(id);
        
        if (!eventResult.success) {
            return res.status(404).json({ 
                success: false, 
                error: "Event not found" 
            });
        }
        
        const event = eventResult.event;
        const organizerInfo = event.organiser;
        
        const result = await approveEvent(id);
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        try {
            let eventDate = 'N/A';
            
            if (event.is_range && event.start_date && event.end_date) {
                eventDate = `${new Date(event.start_date).toLocaleDateString()} - ${new Date(event.end_date).toLocaleDateString()}`;
            } else if (event.date) {
                eventDate = new Date(event.date).toLocaleDateString();
            }
            
            const approvalEmailContent = eventApprovalTemplate({
                organizerName: organizerInfo.name,
                eventTitle: event.name,
                eventDate: eventDate,
                eventLocation: event.location || 'N/A'
            });

            await sendEmail({
                to: organizerInfo.email,
                subject: approvalEmailContent.subject,
                text: approvalEmailContent.text,
                html: approvalEmailContent.html
            });

            console.log(`✅ Event approval email sent to organizer: ${organizerInfo.email}`);
        } catch (emailError) {
            console.error('⚠️ Failed to send event approval email to organizer:', emailError.message);
        }

        return res.status(200).json({ 
            success: true, 
            message: "Event approved successfully",
            eventId: result.eventId,
            emailSent: true
        });
    } catch (err) {
        console.error('Error approving event:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while approving event' 
        });
    }
};

// Deletes an event and notifies organizer and volunteers via email
export const deleteEventController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                error: "Event ID is required" 
            });
        }
        
        const eventResult = await getEventById(id);
        
        if (!eventResult.success) {
            return res.status(404).json({ 
                success: false, 
                error: "Event not found" 
            });
        }
        
        const event = eventResult.event;
        const organizerInfo = event.organiser;
        
        let volunteers = [];
        try {
            const volunteersQuery = await pool.query(
                'SELECT volunteer_name, volunteer_email FROM event_volunteers WHERE event_id = $1',
                [id]
            );
            volunteers = volunteersQuery.rows;
        } catch (volErr) {
            console.error('Error fetching volunteers:', volErr);
        }
        
        const result = await deleteEvent(id);
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        try {
            const organizerEmailContent = eventDeletionOrganizerTemplate({
                eventTitle: event.name,
                organizerName: organizerInfo.name
            });

            await sendEmail({
                to: organizerInfo.email,
                subject: organizerEmailContent.subject,
                text: organizerEmailContent.text,
                html: organizerEmailContent.html
            });

            console.log(`✅ Event deletion email sent to organizer: ${organizerInfo.email}`);
        } catch (emailError) {
            console.error('⚠️ Failed to send event deletion email to organizer:', emailError.message);
        }

        if (volunteers.length > 0) {
            console.log(`📧 Sending cancellation emails to ${volunteers.length} volunteer(s)...`);
            
            for (const volunteer of volunteers) {
                try {
                    const volunteerEmailContent = eventCancellationVolunteerTemplate({
                        volunteerName: volunteer.volunteer_name,
                        eventTitle: event.name
                    });

                    await sendEmail({
                        to: volunteer.volunteer_email,
                        subject: volunteerEmailContent.subject,
                        text: volunteerEmailContent.text,
                        html: volunteerEmailContent.html
                    });

                    console.log(`✅ Cancellation email sent to volunteer: ${volunteer.volunteer_email}`);
                } catch (emailError) {
                    console.error(`⚠️ Failed to send cancellation email to ${volunteer.volunteer_email}:`, emailError.message);
                }
            }
        } else {
            console.log('ℹ️ No volunteers to notify for this event');
        }

        return res.status(200).json({ 
            success: true, 
            message: "Event deleted successfully",
            eventId: result.eventId,
            emailsSent: {
                organizer: true,
                volunteers: volunteers.length
            }
        });
    } catch (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while deleting event' 
        });
    }
};

// Gets the count of events pending approval
export const getPendingEventsCountController = async (req, res) => {
    try {
        const result = await getPendingEventsCount();
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            count: result.count 
        });
    } catch (err) {
        console.error('Error fetching pending events count:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching pending events count' 
        });
    }
};

// Gets the count of events pending deletion approval
export const getPendingDeletionEventsCountController = async (req, res) => {
    try {
        const result = await getPendingDeletionEventsCount();
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            count: result.count 
        });
    } catch (err) {
        console.error('Error fetching pending deletion events count:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching pending deletion events count' 
        });
    }
};

// Gets total count of events pending approval and pending deletion
export const getEventCountsController = async (req, res) => {
    try {
        const result = await getEventCounts();
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            counts: result.counts 
        });
    } catch (err) {
        console.error('Error fetching event counts:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching event counts' 
        });
    }
};
