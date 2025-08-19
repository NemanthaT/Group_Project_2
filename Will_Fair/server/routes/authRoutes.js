import express from "express";
import { login, loginDonee } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/loginDonee", loginDonee);

export default router;