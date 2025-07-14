import { registerDonor } from "../models/donorModel.js";

export const signUpDonor = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const result = await registerDonor(fullName, email, password);

  if (result.success) {
    res.status(201).json({ message: "User registered", userId: result.userId });
  } else {
    res.status(400).json({ error: result.message });
  }
};