import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editor = ({ onSave, book }) => {
  const [updateBook, setUpdateBook] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setPublishYear(book.publishYear);
  }, []);
  const handleSave = async () => {
    event.preventDefault();
    console.log("formdata:");
    console.log(title);
    console.log(author);
    console.log(publishYear);

    const updateBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };
    console.log(updateBook);
    onSave(updateBook);
    try {
      await axios
        .put(`http://localhost:3000/books/${id}`, updateBook)
        .then((res) => {
          alert(res.data.message);
        });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else console.log(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="author"
          name="author"
          value={author}
          onChange={(e) => {
            console.log("value", e.target.value);
            setAuthor(e.target.value);
            console.log("author", author);
          }}
        />
        <input
          type="text"
          value={publishYear}
          name="publishYear"
          placeholder="Publish Year"
          onChange={(e) => {
            setPublishYear(e.target.value);
          }}
        />

        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default Editor;
