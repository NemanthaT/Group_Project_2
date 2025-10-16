import express from "express";
import upload from "../middleware/upload.js";
import { getEvents, createEvent } from "../controllers/EventController.js";

const router = express.Router();

//Controlling file uploading and image uploading for event creation
router.post('/createEvent', upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'documents', maxCount: 5
}]), createEvent);

//public Routes
router.get('/', getEvents);

export default router;