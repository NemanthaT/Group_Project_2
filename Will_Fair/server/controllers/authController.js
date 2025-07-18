import { authenticateUser,authenticateDonee, getNameById } from "../models/authModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const result = await authenticateUser(email, password);
  const name = await getNameById(result.userId, result.role, result.userType);

  if (result.success) {
    // Create JWT token with user details
    const token = jwt.sign(
      { 
        userId: result.userId,
        email: result.email,
        name: name,
        role: result.role,
        userType: result.userType
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Longer expiration for convenience
    );

    res.json({ 
      success: true,
      token,
      user: {
        id: result.userId,
        email: result.email,
        name: name,
        role: result.role,
        userType: result.userType
      }
    });
  } else {
    res.status(401).json({ 
      success: false,
      error: result.message || "Invalid credentials" 
    });
  }
};

export const loginDonee = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: "Phone and password are required" });
  }

  const result = await authenticateDonee(phone, password);
  const name = await getNameById(result.userId, result.role, result.userType);

  if (result.success) {
    // Create JWT token with user details
    const token = jwt.sign(
      { 
        userId: result.userId,
        phone: result.phone,
        name: name,
        role: result.role,
        userType: result.userType
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Longer expiration for convenience
    );

    res.json({ 
      success: true,
      token,
      user: {
        id: result.userId,
        phone: result.phone,
        name: name,
        role: result.role,
        userType: result.userType
      }
    });
  } else {
    res.status(401).json({ 
      success: false,
      error: result.message || "Invalid credentials from Controller" 
    });
  }
};