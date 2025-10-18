// Donee Model
const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerIndividual = async (req, res) => {
  try {
    const { fullName, contactno, password, category } = req.body;
    if (!fullName || !category || !contactno || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { fullName: !!fullName, category: !!category, contactno: !!contactno, password: !!password }
      });
    }
    if (!/^\d{10}$/.test(contactno)) {
      return res.status(400).json({ message: 'Please enter a valid phone number (10 digits)' });
    }
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    const existingUser = await pool.query('SELECT phone FROM donees WHERE phone = $1', [contactno]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const documentPath = req.file ? req.file.path : null;
    const result = await pool.query(
      'INSERT INTO donees (password_hash, first_name, last_name, phone, category, type, proof_document_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING donee_id',
      [hashedPassword, firstName, lastName, contactno, category, 'individual', documentPath]
    );
    res.status(201).json({ 
      message: 'Individual donee created successfully', 
      doneeId: result.rows[0].donee_id,
      documentUploaded: !!req.file
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.registerRepresentative = async (req, res) => {
  try {
    const { fullName, contactno, password, category } = req.body;
    if (!fullName || !category || !contactno || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { fullName: !!fullName, category: !!category, contactno: !!contactno, password: !!password }
      });
    }
    if (!/^\d{10,15}$/.test(contactno)) {
      return res.status(400).json({ message: 'Please enter a valid phone number (10-15 digits)' });
    }
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';
    const existingUser = await pool.query('SELECT phone FROM donees WHERE phone = $1', [contactno]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const documentPath = req.file ? req.file.path : null;
    const result = await pool.query(
      'INSERT INTO donees (password_hash, first_name, last_name, phone, category, type, proof_document_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING donee_id',
      [hashedPassword, firstName, lastName, contactno, category, 'representative', documentPath]
    );
    res.status(201).json({ 
      message: 'Representative donee created successfully', 
      doneeId: result.rows[0].donee_id,
      documentUploaded: !!req.file
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { contactno, password } = req.body;
    if (!contactno || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }
    if (!/^\d{10,15}$/.test(contactno)) {
      return res.status(400).json({ message: 'Please enter a valid phone number (10-15 digits)' });
    }
    const doneeResult = await pool.query(
      'SELECT donee_id, phone, password_hash, first_name, last_name, type FROM donees WHERE phone = $1',
      [contactno]
    );
    if (doneeResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }
    const donee = doneeResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, donee.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }
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
    res.status(500).json({ message: 'Server error' });
  }
};
