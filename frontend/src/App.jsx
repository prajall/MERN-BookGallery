import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import NewBook from "./pages/NewBook";
import Homepage from "./pages/Homepage";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/">
          <h1>Book Gallery</h1>
        </Link>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/new-book" element={<NewBook />}></Route>
          <Route path="/books/:id" element={<BookDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
