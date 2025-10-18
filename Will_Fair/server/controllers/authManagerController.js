import {
  getPendingDonations,
  acceptDonationRequest,
  rejectDonationRequest,
  getPendingDonationDetail,
  getDonationStats
} from "../models/authManagerModel.js";
import { getPendingEvents, getPendingDeletionEvents, approveEvent } from "../models/eventModel.js";

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
