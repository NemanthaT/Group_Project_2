// server.js
const express = require("express");
const cors = require("cors");
const { registerDonor } = require("./donorModel");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
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
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});