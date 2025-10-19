import fs from "fs";
import path from "path";
import pool from "../db.js";

async function createMonetoryDonation(donationData) {
  try {
    const getCategoryIdQuery = `
      SELECT category_id FROM donation_categories
      WHERE category_name = $1 AND is_monetary = true
    `;
    const categoryResult = await pool.query(getCategoryIdQuery, [
      donationData.category,
    ]);
    if (categoryResult.rows.length === 0) {
      return {
        success: false,
        message: "Invalid category for monetary donation",
      };
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
        donationData.status,
      ]
    );
    const donationId = result.rows[0].request_id;

    // Handle file storage if files exist (match donee model logic)
    let imagePath = null;
    let documentPath = null;
    const donationDir = path.join(
      "uploads",
      "donations",
      donationId.toString()
    );
    if (!fs.existsSync(donationDir)) {
      fs.mkdirSync(donationDir, { recursive: true });
    }

    // Image: can be a temp filepath string or a multer file object
    if (donationData.imagePath) {
      if (typeof donationData.imagePath === "string") {
        const ext = path.extname(donationData.imagePath);
        const newImagePath = path.join(donationDir, `image${ext}`);
        try {
          fs.renameSync(donationData.imagePath, newImagePath);
          imagePath = newImagePath;
        } catch (e) {
          console.error("Failed moving image file:", e);
        }
      } else if (
        donationData.imagePath.path &&
        donationData.imagePath.originalname
      ) {
        const ext = path.extname(donationData.imagePath.originalname);
        const newImagePath = path.join(donationDir, `image${ext}`);
        try {
          fs.renameSync(donationData.imagePath.path, newImagePath);
          imagePath = newImagePath;
        } catch (e) {
          console.error("Failed moving image file:", e);
        }
      }
    }

    // Documents: donationData.documentPaths may be an array of multer file objects
    const proofDoc = donationData.documentPaths;
    if (Array.isArray(proofDoc) && proofDoc.length > 0) {
      const file = proofDoc[0];
      if (file && file.path && file.originalname) {
        const fileExt = path.extname(file.originalname);
        const fileName = `proof${fileExt}`;
        documentPath = path.join(donationDir, fileName);
        try {
          fs.renameSync(file.path, documentPath);
          console.log("Proof Doc path after: ", documentPath);
        } catch (e) {
          console.error("Failed moving document file:", e);
        }
      }
    } else if (proofDoc && proofDoc.path) {
      // single file object
      const file = proofDoc;
      const fileExt = path.extname(file.originalname || "");
      const fileName = `proof${fileExt}`;
      documentPath = path.join(donationDir, fileName);
      try {
        fs.renameSync(file.path, documentPath);
        console.log("Proof Doc path after: ", documentPath);
      } catch (e) {
        console.error("Failed moving document file:", e);
      }
    }

    // If no image uploaded, use category's default image_path
    if (!imagePath) {
      const categoryImageResult = await pool.query(
        "SELECT image_path FROM donation_categories WHERE category_id = $1",
        [categoryId]
      );
      if (categoryImageResult.rows.length > 0) {
        imagePath = categoryImageResult.rows[0].image_path || null;
      }
    }
    // Update the donation record with file paths
    await pool.query(
      `UPDATE donation_requests SET image_path = $1, document_path = $2 WHERE request_id = $3`,
      [
        imagePath ? imagePath : null,
        documentPath ? documentPath : null,
        donationId,
      ]
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
    const categoryResult = await pool.query(getCategoryIdQuery, [
      donationData.category,
    ]);
    if (categoryResult.rows.length === 0) {
      return {
        success: false,
        message: "Invalid category for monetary donation",
      };
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
        status,
        type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING request_id`,
      [
        donationData.doneeId,
        categoryId,
        donationData.itemQuantity,
        donationData.requestName,
        donationData.description,
        donationData.dropoffDate,
        donationData.status,
        "Non Monetary",
      ]
    );
    const donationId = result.rows[0].request_id;
    // Handle file storage if files exist
    let imagePath = null;
    let documentPath = null;
    const donationDir = path.join(
      "uploads",
      "donations",
      donationId.toString()
    );
    if (!fs.existsSync(donationDir)) {
      fs.mkdirSync(donationDir, { recursive: true });
    }

    // Image: can be a temp filepath string or a multer file object
    if (donationData.imagePath) {
      if (typeof donationData.imagePath === "string") {
        const ext = path.extname(donationData.imagePath);
        const newImagePath = path.join(donationDir, `image${ext}`);
        try {
          fs.renameSync(donationData.imagePath, newImagePath);
          imagePath = newImagePath;
        } catch (e) {
          console.error("Failed moving image file:", e);
        }
      } else if (
        donationData.imagePath.path &&
        donationData.imagePath.originalname
      ) {
        const ext = path.extname(donationData.imagePath.originalname);
        const newImagePath = path.join(donationDir, `image${ext}`);
        try {
          fs.renameSync(donationData.imagePath.path, newImagePath);
          imagePath = newImagePath;
        } catch (e) {
          console.error("Failed moving image file:", e);
        }
      }
    }

    // Documents: donationData.documentPaths may be an array of multer file objects
    const proofDoc = donationData.documentPaths;
    if (Array.isArray(proofDoc) && proofDoc.length > 0) {
      const file = proofDoc[0];
      if (file && file.path && file.originalname) {
        const fileExt = path.extname(file.originalname);
        const fileName = `proof${fileExt}`;
        documentPath = path.join(donationDir, fileName);
        try {
          fs.renameSync(file.path, documentPath);
          console.log("Proof Doc path after: ", documentPath);
        } catch (e) {
          console.error("Failed moving document file:", e);
        }
      }
    } else if (proofDoc && proofDoc.path) {
      // single file object
      const file = proofDoc;
      const fileExt = path.extname(file.originalname || "");
      const fileName = `proof${fileExt}`;
      documentPath = path.join(donationDir, fileName);
      try {
        fs.renameSync(file.path, documentPath);
        console.log("Proof Doc path after: ", documentPath);
      } catch (e) {
        console.error("Failed moving document file:", e);
      }
    }

    // If no image uploaded, use category's default image_path
    if (!imagePath) {
      const categoryImageResult = await pool.query(
        "SELECT image_path FROM donation_categories WHERE category_id = $1",
        [categoryId]
      );
      if (categoryImageResult.rows.length > 0) {
        imagePath = categoryImageResult.rows[0].image_path || null;
      }
    }
    // Update the donation record with file paths
    await pool.query(
      `UPDATE donation_requests SET image_path = $1, document_path = $2 WHERE request_id = $3`,
      [
        imagePath ? imagePath : null,
        documentPath ? documentPath : null,
        donationId,
      ]
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
      categories: results.rows.map((row) => row.category_name),
    };
  } catch (err) {
    console.error(
      "Database error during getMonetaryDonationCategories():",
      err
    );
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
      categories: results.rows.map((row) => row.category_name),
    };
  } catch (err) {
    console.error(
      "Database error during getNonMonetaryDonationCategories():",
      err
    );
    return { success: false, message: "Database error" };
  }
}

//getDonationById function:
async function getDonationById(id) {
  try {
    const result = await pool.query(
      `SELECT 
        dr.*, 
        dc.category_name AS category,
        (SELECT COUNT(DISTINCT donor_id) FROM donations WHERE request_id = dr.request_id) AS donor_count
       FROM donation_requests dr 
       LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
       WHERE dr.request_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return { success: false, message: "Donation not found" };
    }

    return { success: true, donation: result.rows[0] };
  } catch (err) {
    console.error("Database error during getDonationById():", err);
    return { success: false, message: "Database error" };
  }
}

// Update a donation by ID
async function updateDonationById(id, data) {
  try {
    // Only allow updating certain fields
    const allowedFields = [
      "title",
      "description",
      "quantity_needed",
      "status",
      "dropoff_date",
      "due_date",
    ];
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
      return { success: false, message: "No valid fields to update" };
    }
    values.push(id);
    const query = `UPDATE donation_requests SET ${setClauses.join(
      ", "
    )} WHERE request_id = $${values.length}`;
    await pool.query(query, values);
    return { success: true };
  } catch (err) {
    console.error("Database error during updateDonationById():", err);
    return { success: false, message: "Database error" };
  }
}

// Delete a donation by ID
async function deleteDonationById(id) {
  try {
    // Remove files if present
    const donation = await pool.query(
      "SELECT image_path, document_path FROM donation_requests WHERE request_id = $1",
      [id]
    );
    if (donation.rows.length > 0) {
      const { image_path, document_path } = donation.rows[0];
      if (image_path && fs.existsSync(image_path)) fs.unlinkSync(image_path);
      if (document_path && fs.existsSync(document_path))
        fs.unlinkSync(document_path);
      // Optionally remove the donation folder
      const donationDir = path.join("uploads", "donations", id.toString());
      if (fs.existsSync(donationDir))
        fs.rmSync(donationDir, { recursive: true, force: true });
    }
    await pool.query("DELETE FROM donation_requests WHERE request_id = $1", [
      id,
    ]);
    return { success: true };
  } catch (err) {
    console.error("Database error during deleteDonationById():", err);
    return { success: false, message: "Database error" };
  }
}

// Get recent donations
async function getRecentDonations() {
  try {
    const result = await pool.query(`
      SELECT dr.*, dc.category_name AS category
      FROM donation_requests dr
      LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
      WHERE dr.status = 'active'
      ORDER BY dr.created_at DESC NULLS LAST, dr.request_id DESC
      LIMIT 3
    `);
    return { success: true, donations: result.rows };
  } catch (err) {
    console.error("Database error during getRecentDonations():", err);
    return { success: false, message: "Database error" };
  }
}

//my edits
// Get recent donations for admin dashboard
async function getRecentDonationsAdmin(limit = 5) {
  const res = await pool.query(
    `
    SELECT d.donation_id, d.amount, d.donation_date, d.description, d.payment_reference,
           donor.first_name AS donor_first, donor.last_name AS donor_last,
           dr.donee_id, donee.first_name AS donee_first, donee.last_name AS donee_last
    FROM donations d
    LEFT JOIN donors donor ON d.donor_id = donor.donor_id
    LEFT JOIN donation_requests dr ON d.request_id = dr.request_id
    LEFT JOIN donees donee ON dr.donee_id = donee.donee_id
    ORDER BY d.donation_date DESC
    LIMIT $1
  `,
    [limit]
  );

  return res.rows.map((r) => ({
    donationId: r.donation_id,
    donorName: `${r.donor_first || ""} ${r.donor_last || ""}`.trim(),
    doneeName: `${r.donee_first || ""} ${r.donee_last || ""}`.trim(),
    amount: r.amount,
    date: r.donation_date,
    description: r.description,
    paymentReference: r.payment_reference,
  }));
}
// my edits end

// Add donation amount to a donation
async function addDonationAmount(id, amount, donorId) {
  try {
    // Get current received amount
    const result = await pool.query(
      "SELECT quantity_received FROM donation_requests WHERE request_id = $1",
      [id]
    );
    // Update the donation
    console.log("Adding donation amount:", { id, donorId, amount });
    await pool.query(
      "INSERT INTO donations (request_id, donor_id, amount) VALUES ($1, $2, $3)",
      [id, donorId, amount]
    );

    if (result.rows.length === 0) {
      return { success: false, message: "Donation not found" };
    }
    const current = Number(result.rows[0].quantity_received) || 0;
    const newAmount = current + amount;
    await pool.query(
      "UPDATE donation_requests SET quantity_received = $1 WHERE request_id = $2",
      [newAmount, id]
    );
    return { success: true };
  } catch (err) {
    console.error("Database error during addDonationAmount():", err);
    return { success: false, message: "Database error" };
  }
}

// Get active donations with pagination
async function getActiveDonations(page = 1, limit = 6) {
  try {
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const countResult = await pool.query(`
      SELECT COUNT(*) as total
      FROM donation_requests dr
      LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
      WHERE dr.status = 'active'
    `);

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    // Get donations with pagination
    const result = await pool.query(
      `
      SELECT dr.*, dc.category_name AS category
      FROM donation_requests dr
      LEFT JOIN donation_categories dc ON dr.category_id = dc.category_id
      WHERE dr.status = 'active'
      ORDER BY dr.created_at DESC NULLS LAST, dr.request_id DESC
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );

    return {
      success: true,
      donations: result.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (err) {
    console.error("Database error during getActiveDonations():", err);
    return { success: false, message: "Database error" };
  }
}

// Get aggregated stats for hero section and dashboard
async function getDonationStats() {
  try {
    // Total raised across all donations
    const totalRes = await pool.query(
      `SELECT COALESCE(SUM(quantity_received), 0) AS total_raised FROM donation_requests WHERE type = 'Monetary'`
    );

    const sentMonetaryAmount = await pool.query(
      `SELECT COALESCE(SUM(quantity_received), 0) AS sent_amount FROM donation_requests WHERE status = 'sent' AND type = 'Monetary'`
    );

    // Raised this month
    const monthRes = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS raised_this_month
       FROM donations
       WHERE date_trunc('month', donation_date) = date_trunc('month', current_date)`
    );

    // Number of unique donors
    const donorsRes = await pool.query(
      "SELECT COUNT(DISTINCT donor_id) AS active_donors FROM donors"
    );

    // Active campaigns (donation requests with status = 'active')
    const campaignsRes = await pool.query(
      "SELECT COUNT(*) AS active_campaigns FROM donation_requests WHERE status = 'active'"
    );

    // Complete campaigns
    const campaignsCom = await pool.query(
      "SELECT COUNT(*) AS complete_campaigns FROM donation_requests WHERE status = 'completed'"
    );

    // Sent campaigns
    const campaignsSent = await pool.query(
      "SELECT COUNT(*) AS sent_campaigns FROM donation_requests WHERE status = 'sent'"
    );

    // Lives impacted: use number of distinct donees that have received > 0 (proxy)
    const livesRes = await pool.query(
      "SELECT COUNT(DISTINCT donee_id) AS lives_impacted FROM donation_requests WHERE COALESCE(quantity_received,0) > 0"
    );

    const stats = {
      totalRaised: Number(totalRes.rows[0].total_raised) || 0,
      raisedThisMonth: Number(monthRes.rows[0].raised_this_month) || 0,
      activeDonors: Number(donorsRes.rows[0].active_donors) || 0,
      activeCampaigns: Number(campaignsRes.rows[0].active_campaigns) || 0,
      completeCampaigns: Number(campaignsCom.rows[0].complete_campaigns) || 0,
      sentCampaigns: Number(campaignsSent.rows[0].sent_campaigns) || 0,
      livesImpacted: Number(livesRes.rows[0].lives_impacted) || 0,
      sentMonetaryAmount: Number(sentMonetaryAmount.rows[0].sent_amount) || 0,
    };

    return { success: true, stats };
  } catch (err) {
    console.error("Database error during getDonationStats():", err);
    return { success: false, message: "Database error" };
  }
}

async function getDonationsForReg(type) {
  try {
    const dbType = type === "monetary" ? "Monetary" : "Non Monetary";
    const query = `
      SELECT dr.*, d.first_name, d.last_name
      FROM donation_requests dr
      LEFT JOIN donees d ON dr.donee_id = d.donee_id
      WHERE dr.status != 'pending' AND dr.type = $1
    `;
    const result = await pool.query(query, [dbType]);
    for (const row of result.rows) {
      if (row.first_name && row.last_name) {
        row.doneeName = `${row.first_name} ${row.last_name}`;
      }
    }
    return { success: true, donations: result.rows };
  } catch (err) {
    console.error("Database error during getDonationsForReg():", err);
    return { success: false, message: `Database error ${err.message}` };
  }
}

// Mark donation as completed
async function markDonationCompleted(id) {
  try {
    const result = await pool.query(
      "UPDATE donation_requests SET status = 'completed' WHERE request_id = $1 RETURNING request_id, status",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error("Database error during markDonationCompleted():", err);
    return null;
  }
}

// Mark donation as sent
async function markDonationSent(id) {
  try {
    const result = await pool.query(
      "UPDATE donation_requests SET status = 'sent' WHERE request_id = $1 RETURNING request_id, status",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error("Database error during markDonationSent():", err);
    return null;
  }
}

// Get contributors for a donation (donors and amounts)
async function getContributorsByDonationId(donationId) {
  console.log("Fetching contributors for donation ID:", donationId);
  try {
    const res = await pool.query(
      `SELECT ds.amount, d.first_name, d.last_name
        FROM donations ds
        LEFT JOIN donors d ON ds.donor_id = d.donor_id
        WHERE ds.request_id = $1
        ORDER BY ds.amount DESC`,
      [donationId]
    );
    console.log("Contributors fetched:", res.rows);
    // Map to expected frontend format
    return res.rows.map((row) => ({
      name:
        row.first_name && row.last_name
          ? `${row.first_name} ${row.last_name}`
          : "Anonymous",
      amount: Number(row.amount),
    }));
  } catch (err) {
    console.error("Error in getContributorsByDonationId:", err);
    return [];
  }
}

export {
  createMonetoryDonation,
  createNonMonetoryDonation,
  getDonationsByDoneeId,
  getMonetaryDonationCategories,
  getNonMonetaryDonationCategories,
  getDonationById,
  updateDonationById,
  deleteDonationById,
  getRecentDonations,
  // my edits
  getRecentDonationsAdmin,
  // my edits end
  addDonationAmount,
  getActiveDonations,
  getDonationStats,
  getDonationsForReg,
  markDonationCompleted,
  markDonationSent,
  getContributorsByDonationId,
};
