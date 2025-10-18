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