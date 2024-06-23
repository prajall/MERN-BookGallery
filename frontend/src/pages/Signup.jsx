import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    event.preventDefault();

    const newUser = {
      username,
      password,
    };

    try {
      await axios
        .post("http://localhost:3000/user/signup", newUser)
        .then((res) => {
          console.log(res);
          navigate("/");
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h2>Register </h2>
      <form action="">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPasword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
