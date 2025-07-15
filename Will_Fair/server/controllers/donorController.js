import { registerDonor } from "../models/donorModel.js";
import bcrypt from "bcryptjs";

export const signUpDonor = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password before passing to model
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await registerDonor(fullName, email, hashedPassword);

    if (result.success) {
      res.status(201).json({ 
        success: true,
        message: "User registered successfully", 
        userId: result.userId 
      });
    } else {
      res.status(400).json({ 
        success: false,
        error: result.message 
      });
    }
  } catch (err) {
    console.error("Error in signUpDonor:", err);
    res.status(500).json({ 
      success: false,
      error: "Server error during registration" 
    });
  }
};