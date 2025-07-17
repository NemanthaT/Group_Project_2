const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("./config/db.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Connected to database successfully');
    release();
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// =================== ROUTES ===================

// Health check endpoint
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
    
    // Insert into database
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

// Individual Donee Registration Endpoint (Uses Phone)
app.post('/api/donee_ind_reg', upload.single('proofDocument'), async (req, res) => {
  try {
    console.log('=== Individual Donee Registration ===');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { fullName, contactno, password } = req.body;
    
    if (!fullName || !contactno || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { 
          fullName: !!fullName, 
          contactno: !!contactno, 
          password: !!password 
        }
      });
    }

    if (!/^\d{10}$/.test(contactno)) {
      console.log('Invalid phone number:', contactno);
      return res.status(400).json({ 
        message: 'Please enter a valid phone number (10 digits)' 
      });
    }

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    console.log('Parsed names:', { firstName, lastName });

    const existingUser = await pool.query(
      'SELECT phone FROM donees WHERE phone = $1',
      [contactno]
    );

    if (existingUser.rows.length > 0) {
      console.log('Phone number already exists:', contactno);
      return res.status(400).json({ 
        message: 'Phone number already registered' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    const documentPath = req.file ? req.file.path : null;
    console.log('Document path:', documentPath);
    
    const result = await pool.query(
      'INSERT INTO donees (password_hash, first_name, last_name, phone, type, proof_document_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING donee_id',
      [hashedPassword, firstName, lastName, contactno, 'individual', documentPath]
    );
    
    console.log('Database insert successful:', result.rows[0]);
    
    res.status(201).json({ 
      message: 'Individual donee created successfully', 
      doneeId: result.rows[0].donee_id,
      documentUploaded: !!req.file
    });
    
  } catch (error) {
    console.error('Individual donee registration error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Representative Donee Registration Endpoint (Uses Email - FIXED)
app.post('/api/donee_rep_reg', upload.single('proofDocument'), async (req, res) => {
  try {
    console.log('=== Individual Donee Registration ===');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { fullName, contactno, password } = req.body;
    
    if (!fullName || !contactno || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { 
          fullName: !!fullName, 
          contactno: !!contactno, 
          password: !!password 
        }
      });
    }

    if (!/^\d{10,15}$/.test(contactno)) {
      console.log('Invalid phone number:', contactno);
      return res.status(400).json({ 
        message: 'Please enter a valid phone number (10-15 digits)' 
      });
    }

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    console.log('Parsed names:', { firstName, lastName });

    const existingUser = await pool.query(
      'SELECT phone FROM donees WHERE phone = $1',
      [contactno]
    );

    if (existingUser.rows.length > 0) {
      console.log('Phone number already exists:', contactno);
      return res.status(400).json({ 
        message: 'Phone number already registered' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    const documentPath = req.file ? req.file.path : null;
    console.log('Document path:', documentPath);
    
    const result = await pool.query(
      'INSERT INTO donees (password_hash, first_name, last_name, phone, type, proof_document_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING donee_id',
      [hashedPassword, firstName, lastName, contactno, 'representative', documentPath]
    );
    
    console.log('Database insert successful:', result.rows[0]);
    
    res.status(201).json({ 
      message: 'Representative donee created successfully', 
      doneeId: result.rows[0].donee_id,
      documentUploaded: !!req.file
    });
    
  } catch (error) {
    console.error('Representative donee registration error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Add this right after the Donee Login endpoint definition:

// Donee Login endpoint (Phone-based)
app.post('/api/donee_login', async (req, res) => {
  try {
    console.log('Donee login request received:', req.body);
    
    const { contactno, password } = req.body;
    
    // Validate required fields
    if (!contactno || !password) {
      return res.status(400).json({ 
        message: 'Phone number and password are required'
      });
    }

    // Validate phone number format
    if (!/^\d{10,15}$/.test(contactno)) {
      return res.status(400).json({ 
        message: 'Please enter a valid phone number (10-15 digits)' 
      });
    }

    // Check if donee exists in database
    const doneeResult = await pool.query(
      'SELECT donee_id, phone, password_hash, first_name, last_name, type FROM donees WHERE phone = $1',
      [contactno]
    );

    if (doneeResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    const donee = doneeResult.rows[0];

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, donee.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Login successful
    res.status(200).json({
      message: 'Login successful',
      donee: {
        id: donee.donee_id,
        phone: donee.phone,
        firstName: donee.first_name,
        lastName: donee.last_name,
        type: donee.type
      }
    });

  } catch (error) {
    console.error('Donee login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

console.log('✅ Donee login endpoint registered');

app.post('/api/login', async (req, res) => {
  try {
    console.log('Donor login request received:', req.body);
    
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required'
      });
    }

    // Check if user exists in database
    const userResult = await pool.query(
      'SELECT donor_id, email, password_hash, first_name, last_name FROM donors WHERE email = $1',
      [email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.donor_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });

  } catch (error) {
    console.error('Donor login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Replace the entire server startup section (from line 400 onwards) with this:

// =================== ERROR HANDLING ===================

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    message: 'Server error',
    error: error.message 
  });
});

// 404 handler - must be last
app.use((req, res) => {
  console.log('404 - Route not found:', req.originalUrl);
  res.status(404).json({ 
    message: 'Route not found',
    requestedUrl: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`  ✅ GET  http://localhost:${PORT}/api/health`);
  console.log(`  📝 POST http://localhost:${PORT}/api/donor_reg`);
  console.log(`  👤 POST http://localhost:${PORT}/api/donee_ind_reg`);
  console.log(`  🏢 POST http://localhost:${PORT}/api/donee_rep_reg`);
  console.log(`  🔐 POST http://localhost:${PORT}/api/donee_login`);
  console.log(`  🔑 POST http://localhost:${PORT}/api/login`);
  console.log(`\n🔧 Backend ready for connections!`);
});
  
