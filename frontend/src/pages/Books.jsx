import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    axios
      .get("http://localhost:3000/books", { withCredentials: true })
      .then((res) => {
        const books = res.data.data;
        setBooks(books);
      });
    console.log(books);
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div>
      {books.map((book, index) => {
        return (
          <div key={index}>
            <Link to={`/books/${book._id}`}>
              <h1>{book.title}</h1>
              <p>{book.author}</p>
              <p>{book.publishYear}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
