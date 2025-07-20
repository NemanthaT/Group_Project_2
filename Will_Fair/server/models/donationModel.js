import fs from 'fs';
import path from 'path';
import pool from "../db.js";

async function createMonetoryDonation(donationData) {
  try {
    const getCategoryIdQuery = `
      SELECT category_id FROM donation_categories
      WHERE category_name = $1 AND is_monetary = true
    `;
    const categoryResult = await pool.query(getCategoryIdQuery, [donationData.category]);
    if (categoryResult.rows.length === 0) {
      return { success: false, message: "Invalid category for monetary donation" };
    }
    const categoryId = categoryResult.rows[0].category_id;
    const result = await pool.query(
      `INSERT INTO donation_requests (
        donee_id,
        category_id, 
        quantity_needed, 
        title,
        description, 
        due_date,  
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING request_id`,
      [
        donationData.doneeId,
        categoryId,
        donationData.targetAmount,
        donationData.requestName,
        donationData.description,
        donationData.urgentDate,
        donationData.status
      ]
    );
    const donationId = result.rows[0].request_id;

    // Handle file storage if files exist
    let imagePath = null;
    let documentPath = null;
    if (donationData.imagePath) {
      const donationDir = path.join('uploads', 'donations', donationId.toString());
      if (!fs.existsSync(donationDir)) {
        fs.mkdirSync(donationDir, { recursive: true });
      }
      const ext = path.extname(donationData.imagePath);
      const newImagePath = path.join(donationDir, `image${ext}`);
      fs.renameSync(donationData.imagePath, newImagePath);
      imagePath = newImagePath;
    }
    if (donationData.documentPaths) {
      const donationDir = path.join('uploads', 'donations', donationId.toString());
      if (!fs.existsSync(donationDir)) {
        fs.mkdirSync(donationDir, { recursive: true });
      }
      let docPath = null;
      if (Array.isArray(donationData.documentPaths)) {
        docPath = donationData.documentPaths[0];
      } else if (typeof donationData.documentPaths === 'string') {
        docPath = donationData.documentPaths;
      } else if (donationData.documentPaths.path) {
        docPath = donationData.documentPaths.path;
      }
      if (docPath && typeof docPath === 'string') {
        const ext = path.extname(docPath);
        const newDocPath = path.join(donationDir, `document${ext}`);
        fs.renameSync(docPath, newDocPath);
        documentPath = newDocPath;
      }
    }
    // If no image uploaded, use category's default image_path
    if (!imagePath) {
      const categoryImageResult = await pool.query(
        'SELECT image_path FROM donation_categories WHERE category_id = $1',
        [categoryId]
      );
      if (categoryImageResult.rows.length > 0) {
        imagePath = categoryImageResult.rows[0].image_path || null;
      }
    }
    // Update the donation record with file paths
    await pool.query(
      `UPDATE donation_requests SET image_path = $1, document_path = $2 WHERE request_id = $3`,
      [imagePath ? imagePath : null, documentPath ? documentPath : null, donationId]
    );
    return { success: true, donationId };
  } catch (err) {
    console.error("Database error during createMonetoryDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function createNonMonetoryDonation(donationData) {
  try {
    const getCategoryIdQuery = `
      SELECT category_id FROM donation_categories
      WHERE category_name = $1 AND is_monetary = false
    `;
    const categoryResult = await pool.query(getCategoryIdQuery, [donationData.category]);
    if (categoryResult.rows.length === 0) {
      return { success: false, message: "Invalid category for monetary donation" };
    }
    const categoryId = categoryResult.rows[0].category_id;
    const result = await pool.query(
      `INSERT INTO donation_requests (
        donee_id, 
        category_id, 
        request_name, 
        description, 
        quantity_needed, 
        dropoff_date, 
        image_path, 
        document_paths, 
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING request_id`,
      [
        donationData.doneeId,
        categoryId,
        donationData.requestName,
        donationData.description,
        donationData.targetAmount,
        donationData.dropoffDate,
        null, // image_path
        null, // document_paths
        donationData.status
      ]
    );
    const donationId = result.rows[0].request_id;
    // Handle file storage if files exist
    let imagePath = null;
    let documentPath = null;
    if (donationData.imagePath) {
      const donationDir = path.join('uploads', 'donations', donationId.toString());
      if (!fs.existsSync(donationDir)) {
        fs.mkdirSync(donationDir, { recursive: true });
      }
      const ext = path.extname(donationData.imagePath);
      const newImagePath = path.join(donationDir, `image${ext}`);
      fs.renameSync(donationData.imagePath, newImagePath);
      imagePath = newImagePath;
    }
    if (donationData.documentPaths) {
      const donationDir = path.join('uploads', 'donations', donationId.toString());
      if (!fs.existsSync(donationDir)) {
        fs.mkdirSync(donationDir, { recursive: true });
      }
      let docPath = null;
      if (Array.isArray(donationData.documentPaths)) {
        docPath = donationData.documentPaths[0];
      } else if (typeof donationData.documentPaths === 'string') {
        docPath = donationData.documentPaths;
      } else if (donationData.documentPaths.path) {
        docPath = donationData.documentPaths.path;
      }
      if (docPath && typeof docPath === 'string') {
        const ext = path.extname(docPath);
        const newDocPath = path.join(donationDir, `document${ext}`);
        fs.renameSync(docPath, newDocPath);
        documentPath = newDocPath;
      }
    }
    // If no image uploaded, use category's default image_path
    if (!imagePath) {
      const categoryImageResult = await pool.query(
        'SELECT image_path FROM donation_categories WHERE category_id = $1',
        [categoryId]
      );
      if (categoryImageResult.rows.length > 0) {
        imagePath = categoryImageResult.rows[0].image_path || null;
      }
    }
    // Update the donation record with file paths
    await pool.query(
      `UPDATE donation_requests SET image_path = $1, document_path = $2 WHERE request_id = $3`,
      [imagePath ? imagePath : null, documentPath ? documentPath : null, donationId]
    );
    return { success: true, donationId };
  } catch (err) {
    console.error("Database error during createNonMonetoryDonation():", err);
    return { success: false, message: "Database error" };
  }
}

async function getDonationsByDoneeId(doneeId) {
  try {
    const query = `
      SELECT 
        dr.*, 
        dc.category_name AS category
      FROM 
        donation_requests dr
      LEFT JOIN 
        donation_categories dc ON dr.category_id = dc.category_id
      WHERE 
        dr.donee_id = $1
    `;
    const result = await pool.query(query, [doneeId]);
    return { success: true, donations: result.rows };
  } catch (err) {
    console.error("Database error during getDonationsByDoneeId():", err);
    return { success: false, message: "Database error" };
  }
}

async function getMonetaryDonationCategories() {
  try {
    const results = await pool.query(
      `SELECT category_name FROM donation_categories WHERE is_monetary = true`
    );
    return {
      success: true,
      categories: results.rows.map((row) => row.category_name)
    };
  } catch (err) {
    console.error("Database error during getMonetaryDonationCategories():", err);
    return { success: false, message: "Database error" };
  }
}

async function getNonMonetaryDonationCategories() {
  try {
    const results = await pool.query(
      `SELECT category_name FROM donation_categories WHERE is_monetary = false`
    );
    return {
      success: true,
      categories: results.rows.map((row) => row.category_name)
    };
  } catch (err) {
    console.error("Database error during getNonMonetaryDonationCategories():", err);
    return { success: false, message: "Database error" };
  }
}

// Get a single donation by ID
async function getDonationById(id) {
  try {
    const result = await pool.query(
      `SELECT dr.*, dc.category_name AS category FROM donation_requests dr LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id WHERE dr.request_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return { success: false, message: 'Donation not found' };
    }
    return { success: true, donation: result.rows[0] };
  } catch (err) {
    console.error('Database error during getDonationById():', err);
    return { success: false, message: 'Database error' };
  }
}

// Update a donation by ID
async function updateDonationById(id, data) {
  try {
    // Only allow updating certain fields
    const allowedFields = ['title', 'description', 'quantity_needed', 'status', 'dropoff_date', 'due_date'];
    const setClauses = [];
    const values = [];
    let idx = 1;
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        setClauses.push(`${field} = $${idx}`);
        values.push(data[field]);
        idx++;
      }
    }
    if (setClauses.length === 0) {
      return { success: false, message: 'No valid fields to update' };
    }
    values.push(id);
    const query = `UPDATE donation_requests SET ${setClauses.join(', ')} WHERE request_id = $${values.length}`;
    await pool.query(query, values);
    return { success: true };
  } catch (err) {
    console.error('Database error during updateDonationById():', err);
    return { success: false, message: 'Database error' };
  }
}

export { 
  createMonetoryDonation, 
  createNonMonetoryDonation, 
  getDonationsByDoneeId, 
  getMonetaryDonationCategories, 
  getNonMonetaryDonationCategories,
  getDonationById,
  updateDonationById
};