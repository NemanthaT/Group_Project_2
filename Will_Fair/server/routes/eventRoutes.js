import express from "express";
//import upload from "../middleware/upload.js";
import { getEventsController } from "../controllers/eventController.js";

const router = express.Router();

//Controlling file uploading and image uploading for event creation
/* router.post('/createEvent', upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'documents', maxCount: 5
}]), createEvent); */

//public Routes
router.get('/', getEventsController);

export default router;