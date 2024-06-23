import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h2>This is homepage of books.</h2>
      <div>
        <Link to="/books">View book collection</Link>
      </div>
      <div>
        <Link to="/new-book">Create new book</Link>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Homepage;
