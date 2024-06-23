import express from "express";

import {
  createBook,
  deleteBook,
  editBook,
  getBooks,
  searchBook,
} from "../controllers/bookController.js";
import { authorizedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authorizedUser, getBooks);

router.post("/new-book", authorizedUser, createBook);

router.get("/:id", searchBook);

router.put("/:id", editBook);

router.delete("/:id", deleteBook);

export default router;
