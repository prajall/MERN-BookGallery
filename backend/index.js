import express from "express";
import mongoose from "mongoose";
import { mongoDbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "*",
    credentials: true,
  })
);
app.use(cookieParser());

// ========= ROUTE =========
app.use("/books", booksRoute);
app.use("/user", userRoute);

app.listen(4000, () => {
  console.log("Server running in port 3000");
});

app.get("/", (req, res) => {
  res.send("This is homepage");
});
