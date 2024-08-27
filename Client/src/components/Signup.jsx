import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validation from "./SignupValidation";
import fetchClient from "../Services/Instance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const Navigate = useNavigate();
  const axiosInstance = fetchClient();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      Navigate("/");
    }
  }, []);

  const [errors, setErrors] = useState({});
  function handleInput(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(values));
    axiosInstance
      .post("signup", values)
      .then((res) => {
        alert("Sign-up Done Successfully");
        Navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
        if (error.response.data.status === 401) {
          Navigate("/signup");
        }
      });
  }
  return (
    <div className="main-signup-div">
      <div className="inner-signup-div">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="heading">Sign-Up</h1>
          <div className="signup-input-div">
            <div className="name-input">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                placeholder="Enter Name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="email-input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                placeholder="Enter Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="pass-input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                placeholder="Enter Password"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <button className="sign-up-btn" type="submit">
            Sign-up
          </button>
        </form>
        <div className="login">
          <label>(For Login Click Below Button)</label>
          <Link to={"/login"}>
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
