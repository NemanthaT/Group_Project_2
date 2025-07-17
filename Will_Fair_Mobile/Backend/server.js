const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const pool = require("./config/db.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Connected to database successfully');
    release();
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is working!" });
});

// Donor registration endpoint
app.post('/api/donor_reg', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Split fullName into first_name and last_name
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Check if email already exists
    const existingUser = await pool.query(
      'SELECT email FROM donors WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert into database with correct field names
    const result = await pool.query(
      'INSERT INTO donors (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING donor_id',
      [email.toLowerCase(), hashedPassword, firstName, lastName]
    );
    
    res.status(201).json({ 
      message: 'Donor created successfully', 
      donorId: result.rows[0].donor_id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));