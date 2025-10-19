import { updateDoneeEmail, updateDoneePassword } from "../models/doneeModel.js";
import bcrypt from "bcryptjs";
// Update donee email
export const updateEmail = async (req, res) => {
  const { doneeId, email } = req.body;
  if (!doneeId || !email) {
    return res.status(400).json({ success: false, error: "Missing doneeId or email" });
  }
  try {
    const result = await updateDoneeEmail(doneeId, email);
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error("Error in updateEmail:", err);
    res.status(500).json({ success: false, error: "Server error while updating email" });
  }
};

// Update donee password
export const updatePassword = async (req, res) => {
  const { doneeId, newPassword } = req.body;
  if (!doneeId || !newPassword) {
    return res.status(400).json({ success: false, error: "Missing doneeId or newPassword" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const result = await updateDoneePassword(doneeId, hashedPassword);
    if (result.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error("Error in updatePassword:", err);
    res.status(500).json({ success: false, error: "Server error while updating password" });
  }
};
// Get donee profile by donee ID
export const getDoneeProfile = async (req, res) => {
  const doneeId = req.query.doneeId;
  if (!doneeId) {
    return res.status(400).json({ success: false, error: "Missing doneeId" });
  }
  try {
    const allDonees = await getAllDonees();
    const donee = allDonees.find(d => String(d.donee_id) === String(doneeId) || String(d.id) === String(doneeId));
    if (!donee) {
      console.log("Donee not found for ID:", doneeId);
      return res.status(404).json({ success: false, error: "Donee not found" });
    }
    // Map to frontend structure
    res.status(200).json({
      success: true,
      donee: {
        name: donee.name || '',
        email: donee.email || '',
        phone: donee.phone || '',
        category: donee.type || 'individual',
        subcategory: donee.category || '',
        proofDocuments: donee.documents?.map((doc, i) => ({
          id: i + 1,
          name: doc.split('/').pop(),
          uploadDate: '', // Add if available
          size: '' // Add if available
        })) || []
      }
    });
  } catch (err) {
    console.error("Error in getDoneeProfile:", err);
    res.status(500).json({ success: false, error: "Server error while fetching donee profile" });
  }
};
// doneeController.js
import { registerDonee, getAllDonees } from "../models/doneeModel.js";

export const signUpDonee = async (req, res) => {
  const { type, name, phone, password } = req.body;
  const proofDocument = req.file; // Get uploaded file
  console.log("Proof Document: ", proofDocument);
  
  if (!type || !name || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password before passing to model
    /*const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);*/
    const hashedPassword = password;

    const result = await registerDonee(
      name, 
      phone, 
      hashedPassword, 
      type,
      proofDocument // Pass the file to the model
    );

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
    console.error("Error in signUpDonee:", err);
    res.status(500).json({ 
      success: false,
      error: "Server error during registration" 
    });
  }
};

// Get all donees for admin dashboard
export const getDoneesAdmin = async (req, res) => {
  try {
    const donees = await getAllDonees();
    res.json({ success: true, donees });
  } catch {
    res.status(500).json({ success: false, error: "Server error fetching donees" });
  }
};