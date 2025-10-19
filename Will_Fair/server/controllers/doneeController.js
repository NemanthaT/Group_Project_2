// doneeController.js
import { registerDonee, getAllDonees } from "../models/doneeModel.js";
import pool from "../db.js";

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

// PATCH /admin/donees/:id/toggle - Toggle donee status
export async function toggleDoneeAdmin(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE donees SET verification_status = CASE WHEN verification_status = 'accepted' THEN 'pending' ELSE 'accepted' END WHERE donee_id = $1 RETURNING verification_status`,
      [id]
    );
    if (result.rows.length) {
      const status = result.rows[0].verification_status === 'accepted' ? 'Accepted' : 'Pending';
      res.json({ success: true, status });
    } else {
      res.status(404).json({ success: false, error: "Donee not found" });
    }
  } catch {
    res.status(500).json({ success: false, error: "Failed to toggle donee status" });
  }
}

// DELETE /admin/donees/:id - Delete donee
export async function deleteDoneeAdmin(req, res) {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM donees WHERE donee_id = $1`, [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete donee" });
  }
}