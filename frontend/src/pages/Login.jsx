import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    event.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      await axios
        .post("http://localhost:3000/user/login", user, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <div>
      <div>
        <h2>Login </h2>
        <form>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
