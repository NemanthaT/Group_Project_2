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

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Donor registration route (MVC)
const donorRoutes = require('./routes/donorRoutes');
const doneeRoutes = require('./routes/doneeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const donationRoutes = require('./routes/donationRoutes'); // <-- add this line
app.use('/api', donorRoutes);
app.use('/api', doneeRoutes);
app.use('/api', categoryRoutes);
app.use('/api', volunteerRoutes);
app.use('/api', eventRoutes);

// ...category endpoints moved to MVC routes...
app.use('/api', donationRoutes); // <-- add this line


// ...donee endpoints moved to MVC routes...

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



// ...volunteer endpoints moved to MVC routes...

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
  console.log(`  👤 POST http://localhost:${PORT}/api/volunteer_ind_reg`);
  console.log(`  🏢 POST http://localhost:${PORT}/api/volunteer_rep_reg`);
  console.log(`  🔐 POST http://localhost:${PORT}/api/volunteer_login`);
  console.log(`  📅 GET  http://localhost:${PORT}/api/events`);
  console.log(`  📋 GET  http://localhost:${PORT}/api/events/:id`);
  console.log(`\n🔧 Backend ready for connections!`);
});

