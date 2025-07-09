const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

   // Split fullName into first_name and last_name
  const nameParts = fullName.trim().split(" ");
  const first_Name = nameParts[0];
  const last_Name = nameParts.slice(1).join(" ") || ""; // handles single-word names

  try {
    const result = await pool.query(
      "INSERT INTO donors (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING donor_id",
      [first_Name, last_Name, email, password]
    );

    res.status(201).json({ message: "User registered", userId: result.rows[0].donor_id });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(5000, () => console.log('Server is running on http://localhost:5000'));