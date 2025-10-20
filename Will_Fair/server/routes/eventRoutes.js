import express from "express";
import multer from "multer";
import { getEventsController, createEvent, withdrawVolunteerController, requestEventDeletionController, getVolunteerListController } from "../controllers/eventController.js";
import { getEventById } from "../models/eventModel.js";

const router = express.Router();

// Create a separate multer configuration for events
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const eventUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only PDF and image files allowed. Got: ${file.mimetype}`), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 
  }
});

router.post('/createEvent', eventUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]), createEvent);

router.post('/withdrawVolunteer', withdrawVolunteerController);
router.post('/deleteRequest', requestEventDeletionController);
router.post('/getVolunteerList', getVolunteerListController);

// GET event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getEventById(id);
  res.json(result);//returns { success: true, event: {...} } or { success: false, message: "..." }
});

router.get('/', getEventsController);

export default router;