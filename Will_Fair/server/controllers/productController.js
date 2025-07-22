import pool from "../db.js";

/**
 * GET /products
 * Optional query params:
 *   ?category=Textiles
 *   ?search=mat
 *   ?sort=price_asc|price_desc
 *   ?limit=12
 */
export async function getProducts(req, res) {
  const { category, search, sort, limit = 12 } = req.query;

  const params = [];
  const whereClauses = [];

  if (category) {
    params.push(category);
    whereClauses.push(`c.category_name = $${params.length}`);
  }

  if (search && search.trim() !== "") {
    params.push(`%${search.trim()}%`);
    whereClauses.push(`p.title ILIKE $${params.length}`);
  }

  const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  let orderBy = "p.created_at DESC NULLS LAST";
  if (sort === "price_asc") orderBy = "p.price ASC NULLS LAST";
  if (sort === "price_desc") orderBy = "p.price DESC NULLS LAST";

  params.push(limit);
  const limitParamIndex = params.length;

  const sql = `
    SELECT
      p.product_id AS id,
      p.title,
      p.description,
      p.price,
      p.quantity_available,
      c.category_name AS type,
      p.images[1] AS image
    FROM marketplace_products p
    JOIN product_categories c ON p.category_id = c.category_id
    ${where}
    ORDER BY ${orderBy}
    LIMIT $${limitParamIndex};
  `;

  try {
    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

/**
 * GET /products/:id
 */
export async function getProductById(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT
      p.product_id AS id,
      p.title,
      p.description,
      p.price,
      p.quantity_available,
      c.category_name AS type,
      p.images AS images
    FROM marketplace_products p
    JOIN product_categories c ON p.category_id = c.category_id
    WHERE p.product_id = $1;
  `;

  try {
    const { rows } = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
