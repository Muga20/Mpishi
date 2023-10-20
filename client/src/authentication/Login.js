import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/css/login.css";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { setHeaders } from "../headers/header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
      };
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        data,
        setHeaders()
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN", payload: res.data });
      const role = res.data.role;

      if (role === true) {
        navigate("/recipe_data");
        toast.success("Comment created successfully");
      } else if (role === false) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("not yet sign in");
      } else if (error.response?.status === 401) {
        toast.error("email and password doesn't much");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Top_padding">
        <section className="login-container">
          <form onSubmit={LoginUser}>
            <div>
              <center>
                <h1 className="login_h1">
                  {" "}
                  <span className="login_span">Welcome,Please</span> Login{" "}
                </h1>
              </center>
              <br />
              <input
                className="inputs"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <br />

              <input
                className="inputs"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="loginError">{error}</p>}

              <br />
              <button className="login_btn_" type="submit">
                Login
              </button>

              <p>
                <Link className="registrationLink" to="/Signup">
                  Create account if Not a User
                </Link>
              </p>
              <p>
                <Link className="registrationLink" to="/reset">
                  Recover Account
                </Link>
              </p>
              <p></p>
            </div>
          </form>
        </section>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </div>
  );
}

export default Login;
