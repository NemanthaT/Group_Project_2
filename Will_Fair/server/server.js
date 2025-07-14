// server.js
import express from "express";
import cors from "cors";
import donorRoutes from "./routes/donorRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/donors", donorRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});