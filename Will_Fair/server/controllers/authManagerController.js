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
  getEventCounts
} from "../models/eventModel.js";

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

export const approveEventController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                error: "Event ID is required" 
            });
        }
        
        const result = await approveEvent(id);
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Event approved successfully",
            eventId: result.eventId
        });
    } catch (err) {
        console.error('Error approving event:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while approving event' 
        });
    }
};

export const deleteEventController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                error: "Event ID is required" 
            });
        }
        
        const result = await deleteEvent(id);
        
        if (!result.success) {
            return res.status(400).json({ 
                success: false, 
                error: result.message 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Event deleted successfully",
            eventId: result.eventId
        });
    } catch (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while deleting event' 
        });
    }
};

// Get count of pending approval events
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

// Get count of pending deletion events
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

// Get all event counts in one call (more efficient)
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
