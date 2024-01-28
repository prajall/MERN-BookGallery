import express from "express";
import { Book } from "../models/book.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allBooks = await Book.find();
  return res.send(apiResponse("200", "Retrieved all books", allBooks));
});

router.post("/new-book", async (req, res) => {
  const { title, author, publishYear } = req.body;

  try {
    if (publishYear && isNaN(publishYear)) {
      throw new Error("Invalid Publish Year");
    }
    if (!title || !author || !publishYear)
      throw new Error("Required Informations incomplete");

    const book = await Book.create({ title, author, publishYear });

    return res
      .status(201)
      .send(apiResponse("201", "new book created successfully", book));
  } catch (error) {
    if (error.message === "Invalid Publish Year") {
      return res
        .status(400)
        .send(apiError("400", "Publish Year must be a number"));
    } else if (error.message === "Required Informations incomplete") {
      return res.status(400).send(apiError("400", "All fields are required"));
    } else
      return res.status(500).send(apiError("500", "Internal Server Error"));
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const book = await Book.findById(id);

    if (!book) {
      console.log("no book");
    }
    return res.send(apiResponse("200", "Book found successfully", book));
  } catch (error) {
    if (error.message === "book not found")
      return res.status(404).send(apiError("404", "Book not found"));
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear } = req.body;

  try {
    if (!title || !author || !publishYear) {
      // return res.status(400).send(apiError("400", "Book details are required"));
      throw new Error("Informations are required");
    }
    const book = await Book.findById(id);
    if (!book) {
      // return res.status(400).send(apiError("404", "Book not found"));
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body).lean();
    return res.send(
      apiResponse("200", "Book updated successfully", updatedBook)
    );
  } catch (error) {
    return res.send(apiError("400", "Couldn't update Book details"));
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      throw apiError("404", "Book not found");
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    return res
      .status(200)
      .send(apiResponse("200", "Book deleted successfully", deletedBook));
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(apiError("404", "Cannot delete the book"));
  }
});

export default router;
