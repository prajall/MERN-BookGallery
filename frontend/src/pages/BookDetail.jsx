import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [editor, setEditor] = useState(false);
  const navigate = useNavigate();

  const getBookDetail = async () => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        const data = res.data.data;
        setBook(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.data.message);
        }
      });
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    navigate("/books");
  };

  const handleEditor = (updateBook) => {
    console.log(updateBook);
    setBook(updateBook);
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  return (
    <div>
      <h2>Book detail of "{book.title}"</h2>
      <h3>Title:</h3>
      <p>{book.title}</p>
      <h4>Author</h4>
      <p>{book.author}</p>
      <h4>Published Year</h4>
      <p>{book.publishYear}</p>
      <button onClick={handleDelete}>Delete Book</button>
      <button
        onClick={() => {
          if (editor) setEditor(false);
          else setEditor(true);
        }}
      >
        Edit Book
      </button>
      {editor && <Editor onSave={handleEditor} book={book} />}
    </div>
  );
};

export default BookDetail;
