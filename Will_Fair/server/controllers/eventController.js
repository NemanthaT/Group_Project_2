import { getEvents } from "../models/eventModel.js";

//Controller to get all events
export const getEventsController = async (req, res) => {
    try {
        const result = await getEvents();
        if (result.success) {
            res.status(200).json({ success: true, events: result.events });
        } else {
            res.status(400).json({ success: false, error: result.message });
        }
    } catch {
        res.status(500).json({ success: false, error: 'Server error while fetching events' });
    } 
};