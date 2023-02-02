import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //import useNavigate
import axios from "axios";
import "../resources/css/login.css";
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  let navigate = useNavigate(); //initialize useNavigate

  const register = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await axios.post("http://localhost:5000/members", formData);
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Username Already Registered With us ");
        //send errors if email already exist
      }
      if (error.response?.status === 400) {
        toast.error(
          "Username must be at least 5 characters long consider adding more character's "
        );
      }
      if (error.response?.status === 402) {
        toast.error("Password must be at least 8 characters long ");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="Top_padding">
        <section className="login-container ">
          <center>
            {" "}
            <h1 className="login_h1"> Signup </h1>{" "}
          </center>
          <form onSubmit={register}>
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter Username "
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <br />
              <input
                type="password"
                className="inputs"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              {errors && <p className="loginError">{errors}</p>}
              <br />

              <br />
              <button className="login_btn_" type="submit">
                Signup
              </button>
            </div>
          </form>
        </section>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
