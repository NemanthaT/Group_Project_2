// doneeModel.js
import pool from "../db.js";
import fs from 'fs';
import path from 'path';

//my edits
// Get total number of donees
async function getTotalDonees() {
  const res = await pool.query('SELECT COUNT(*) AS total FROM donees');
  return Number(res.rows[0].total);
}

// Get all donees with summary info and totalReceived per donee
async function getAllDonees() {
  try {
    const res = await pool.query(`
      SELECT d.donee_id, d.first_name, d.last_name, d.email, d.phone, d.verification_status, d.proof_document_path,
        COALESCE(SUM(n.quantity_received),0) AS totalReceived
      FROM donees d
      LEFT JOIN donation_requests n ON d.donee_id = n.donee_id
      GROUP BY d.donee_id, d.first_name, d.last_name, d.email, d.phone, d.verification_status, d.proof_document_path
      ORDER BY d.donee_id
    `);
    res.rows.forEach(row => {
      row.name = row.first_name + ' ' + row.last_name;
      row.totalReceived = Number(row.totalreceived || row.totalReceived || 0);
      row.status = row.verification_status === 'accepted' ? 'Accepted' : 'Pending';
      row.verified = row.verification_status === 'accepted';
      // Attach documents array with the saved file path if available
      const docPath = "server/"+row.proof_document_path;
      row.documents = docPath ? [docPath] : [];
      row.id = row.donee_id;
    });
    return res.rows;
  } catch (err) {
    console.error("Error in getAllDonees:", err);
    return [];
  }
}

// Get number of donees pending verification
async function getPendingVerifications() {
  const res = await pool.query('SELECT COUNT(*) AS pending FROM donees WHERE verification_status = $1', ['pending']);
  return Number(res.rows[0].pending);
}

// Get donee stats for admin dashboard
async function getDoneeStats() {
  const totalDonees = await getTotalDonees();
  const pendingVerifications = await getPendingVerifications();
  return { totalDonees, pendingVerifications };
}
//my edits end

async function registerDonee(fullName, phoneNo, password, type, proofDocument = null) {
  try {
    // First check if phone number already exists
    const phoneCheck = await pool.query(
      `SELECT donee_id FROM donees WHERE phone = $1`,
      [phoneNo]
    );

    if (phoneCheck.rows.length > 0) {
      return { success: false, message: "Phone number already exists" };
    }

    // Proceed with registration if phone number doesn't exist
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ") || "";

    // Start transaction
    await pool.query('BEGIN');

    const result = await pool.query(
      `INSERT INTO donees (first_name, last_name, phone, password_hash, type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING donee_id`,
      [first_name, last_name, phoneNo, password, type]
    );

    const doneeId = result.rows[0].donee_id;
    let documentPath = null;

    // If there's a proof document, handle file storage
    if (proofDocument) {
      // Create directory for donee
      const doneeDir = path.join('uploads', 'donees', doneeId.toString());
      if (!fs.existsSync(doneeDir)) {
        fs.mkdirSync(doneeDir, { recursive: true });
      }
      console.log("Proof Doc: ", proofDocument);
      // Save file with original name in the donee's directory
      const fileExt = path.extname(proofDocument.originalname);
      const fileName = `proof${fileExt}`;
      documentPath = path.join(doneeDir, fileName);

      // Move the file from temp location to donee's directory
      fs.renameSync(proofDocument.path, documentPath);

      // Update the donee record with document path
      await pool.query(
        `UPDATE donees SET proof_document_path = $1 WHERE donee_id = $2`,
        [documentPath, doneeId]
      );
    }

    // Commit transaction
    await pool.query('COMMIT');

    return { success: true, userId: doneeId };
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error("Database error during registerDonee():", err);
    return { success: false, message: "Database error" };
  }
}

function getProofDocumentPath(doneeId) {
  return pool.query(
    `SELECT proof_document_path FROM donees WHERE donee_id = $1`,
    [doneeId]
  ).then(result => {
    if (result.rows.length > 0) {
      return result.rows[0].proof_document_path;
    }
    throw new Error("Donee not found");
  });
}

export { registerDonee, getProofDocumentPath, getTotalDonees, getAllDonees, getPendingVerifications, getDoneeStats };