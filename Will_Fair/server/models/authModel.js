import pool from "../db.js";
import bcrypt from "bcrypt";

// Unified login function that checks all tables
export const authenticateUser = async (email, password) => {
  try {
    // Define all user types and their tables
    const userTypes = [
      { table: 'donors', idField: 'donor_id', role: 'donor' },
      { table: 'donees', idField: 'donee_id', role: 'donee' },
      { table: 'authentication_managers', idField: 'auth_manager_id', role: 'auth_manager' },
      { table: 'regional_managers', idField: 'regional_manager_id', role: 'regional_manager' },
      { table: 'system_admins', idField: 'admin_id', role: 'system_admin' }
    ];

    // Search through all tables for the user
    for (const userType of userTypes) {
      const query = {
        text: `SELECT ${userType.idField} as id, first_name, last_name, email, password_hash 
               FROM ${userType.table} 
               WHERE email = $1`,
        values: [email]
      };

      const result = await pool.query(query);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        //const passwordMatch = password === user.password_hash; // Use plain password for now
        
        if (passwordMatch) {
          return { 
            success: true, 
            userId: user.id, 
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: userType.role,
            userType: userType.table
          };
        }
      }
    }

    return { success: false, message: "Invalid credentials" };
  } catch (err) {
    console.error("Authentication error:", err);
    return { success: false, message: "Authentication error" };
  }
};

export const authenticateDonee = async (phone, password) => {
  try {
      const userType = { table: 'donees', idField: 'donee_id', role: 'donee' };

      const query = {
        text: `SELECT ${userType.idField} as id, first_name, last_name, password_hash 
               FROM ${userType.table} 
               WHERE phone = $1`,
        values: [phone]
      };

      const result = await pool.query(query);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];

        //const passwordMatch = password === user.password_hash;
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (passwordMatch) {
          return { 
            success: true, 
            userId: user.id, 
            phone: user.phone,
            name: `${user.first_name} ${user.last_name}`,
            role: userType.role,
            userType: userType.table
          };
        }
      }

      return { success: false, message: "Invalid credentials from model" };
  } catch (err) {
    console.error("Authentication error:", err);
    return { success: false, message: "Authentication error" };
  }
};

export async function getNameById(userId, role, userType) {
  const result = await pool.query(
    `SELECT first_name, last_name FROM ${userType} WHERE ${role}_id = $1`,
    [userId]
  );
  if (result.rows.length > 0) {
    const { first_name, last_name } = result.rows[0];
    return `${first_name} ${last_name}`;
  }
  return null;
}