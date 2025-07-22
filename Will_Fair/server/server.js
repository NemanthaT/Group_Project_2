// server.js
import express from "express";
import cors from "cors";
import donorRoutes from "./routes/donorRoutes.js";
import authRoutes from  "./routes/authRoutes.js";
import doneeRoutes from "./routes/doneeRoute.js";
import donationRoutes from "./routes/donationRoutes.js";
import authManagerRoutes from "./routes/authManagerRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/donors", donorRoutes);
app.use("/donees", doneeRoutes);
app.use("/auth", authRoutes);
app.use("/donations", donationRoutes);
app.use("/authManager", authManagerRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});