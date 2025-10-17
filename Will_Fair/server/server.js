// server.js
import express from "express";
import cors from "cors";
import path from 'path';
import donorRoutes from "./routes/donorRoutes.js";
import authRoutes from  "./routes/authRoutes.js";
import doneeRoutes from "./routes/doneeRoute.js";
import donationRoutes from "./routes/donationRoutes.js";
import authManagerRoutes from "./routes/authManagerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Serve uploaded files (images/documents)
app.use('/uploads', express.static(path.join(globalThis.process.cwd(), 'uploads')));

// Routes
app.use("/donors", donorRoutes);
app.use("/donees", doneeRoutes);
app.use("/auth", authRoutes);
app.use("/donations", donationRoutes);
app.use("/authManager", authManagerRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});