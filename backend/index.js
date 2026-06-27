import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Router from "./routes/LoginRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

app.use(express.json());
app.use(cors());

app.use("/api/auth", Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});