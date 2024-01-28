import express from "express";
import mongoose from "mongoose";
import { mongoDbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

app.use(express.json());
app.use(cors());

// ========= ROUTE =========
app.use("/books", booksRoute);

app.listen(3000, () => {
  console.log("Server running in port 3000");
});

app.get("/", (req, res) => {
  res.send("This is homepage");
});
