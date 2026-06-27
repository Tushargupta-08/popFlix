import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Router from "./routes/LoginRoutes.js";

const app = express();
const port = 3000;

try {
  await mongoose.connect("mongodb+srv://tushargupta2002mannu:Tushargupta08@firstdb.3vk1yud.mongodb.net/Movies");
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