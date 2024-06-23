import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewBook = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    event.preventDefault();
    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };
    await axios
      .post("http://localhost:3000/books/new-book", newBook, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/books");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          alert(error.response.data.message);
        }
      });
  };

  return (
    <div>
      <form action="/new-book">
        <input
          type="text"
          value={title}
          name="title"
          defaultValue={"fadfasd"}
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          name="author"
          placeholder="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <input
          type="number"
          name="publishYear"
          placeholder="publishYear"
          value={publishYear}
          onChange={(e) => {
            setPublishYear(e.target.value);
          }}
        />

        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default NewBook;
