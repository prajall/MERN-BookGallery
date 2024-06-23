import { Book } from "../models/book.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const getBooks = async (req, res) => {
  try {
    const user = res.userData;
    const allBooks = await Book.find({ user });
    return res.send(apiResponse("200", "Retrieved all books", allBooks));
  } catch (error) {
    return res.send(apiError("401", error.message));
  }
};

const createBook = async (req, res) => {
  const jwtUser = res.userData;

  const user = await User.findById(jwtUser);

  if (!user) {
    res.json({ message: "User not valid", success: false }).status(400);
  }
  console.log(user);
  const { title, author, publishYear } = req.body;

  try {
    if (publishYear && isNaN(publishYear)) {
      throw new Error("Invalid Publish Year");
    }
    if (!title || !author || !publishYear)
      throw new Error("Required Informations incomplete");

    const book = await Book.create({ title, author, publishYear, user });

    await book.save();
    console.log(book);

    return res
      .status(201)
      .send(apiResponse("201", "new book created successfully"));
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
};

const searchBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).catch((error) => {
      return;
    });

    if (!book) {
      throw new Error("book not found");
    }
    return res.send(apiResponse("200", "Book found successfully", book));
  } catch (error) {
    if (error.message === "book not found")
      return res.status(404).send(apiError("404", "Book not found"));
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear } = req.body;
  console.log("from put method: ", title, author, publishYear);

  try {
    if (!title || !author || !publishYear) {
      // return res.status(400).send(apiError("400", "Book details are required"));
      throw new Error("Informations are required");
    }
    const book = await Book.findById(id).catch((error) => {
      return;
    });

    if (!book) {
      throw new Error("book not found");
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body).lean();
    return res
      .status(200)
      .send(apiResponse("200", "Book updated successfully", updatedBook));
  } catch (error) {
    if (error.message === "Informations are required") {
      return res
        .status(404)
        .send(apiError("404", "All informations are required"));
    } else if (error.message === "book not found") {
      return res.status(404).send(apiError("404", "Book not found"));
    }
    return res
      .status(500)
      .send(
        apiError("500", "Internal server error. Couldn't update Book details")
      );
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).catch((error) => {
      return;
    });

    if (!book) {
      throw new Error("book not found");
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    return res
      .status(200)
      .send(apiResponse("200", "Book deleted successfully", deletedBook));
  } catch (error) {
    if (error.message === "book not found") {
      return res.status(404).send(apiError("404", "Book not found"));
    }
    console.log(error.message);
    return res.status(400).send(apiError("500", "Cannot delete the book"));
  }
};
export { getBooks, createBook, searchBook, editBook, deleteBook };
