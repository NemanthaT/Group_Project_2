import { registerDonor, getDonorProfileById } from "../models/donorModel.js";
// Get donor profile by donor ID
export const getDonorProfile = async (req, res) => {
  const donorId = req.query.donorId;
  if (!donorId) {
    return res.status(400).json({ success: false, error: "Missing donorId" });
  }
  try {
    const donor = await getDonorProfileById(donorId);
    if (!donor) {
      return res.status(404).json({ success: false, error: "Donor not found" });
    }
    res.status(200).json({ success: true, donor });
  } catch (err) {
    console.error("Error in getDonorProfile:", err);
    res.status(500).json({ success: false, error: "Server error while fetching donor profile" });
  }
};
import bcrypt from "bcryptjs";

export const signUpDonor = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password before passing to model
    /*const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);*/
    const hashedPassword = password;

    const result = await registerDonor(fullName, email, hashedPassword);

    if (result.success) {
      res.status(201).json({ 
        success: true,
        message: "User registered successfully", 
        userId: result.userId 
      });
    } else {
      res.status(401).json({ 
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