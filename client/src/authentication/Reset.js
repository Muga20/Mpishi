import React, { useState } from "react";
import "../resources/css/login.css";
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Reset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/forgotpassword", {
        email,
      });
      toast.success("Check your email for further instructions");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Not yet a member consider opening an account ");
      } else if (error.response?.status === 401) {
        toast.error("Check Email Again");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="Top_padding">
        <section className="login-container">
          <form onSubmit={ResetPassword}>
            <div>
              <center>
                <h1 className="login_h1">
                  {" "}
                  <span className="login_span"></span> RecoverAcc{" "}
                </h1>
              </center>
              <br />
              <input
                className="inputs"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              {error && <p className="loginError">{error}</p>}
              <br />
              <button className="login_btn_" type="submit">
                Send
              </button>
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

export default Reset;
