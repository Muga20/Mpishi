import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; //import useNavigate

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  let navigate = useNavigate(); //initialize useNavigate
  const [error, setError] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:5000/members/reset/${id}`, {
          newPassword,
          confirmPassword,
        })

        .then((res) => {
          console.log(res.data);
          toast.success("Check your email for further instructions");
          navigate("/login");
        });
     

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(" Error ");
      } else if (error.response?.status === 401) {
        toast.error(" Password Doesn't match");  
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Top_padding">
        <section className="login-container ">
          <form onSubmit={resetPassword}>
            <div>
              <center>
                <h1 className="login_h1">
                  {" "}
                  <span className="login_span">
                    {" "}
                    Recover your Account{" "}
                  </span>{" "}
                </h1>
              </center>
              <br />
              <input
                className="inputs"
                type="password"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <br />
              <input
                className="inputs"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {error && <p className="loginError">{error}</p>}

              <br />
              <button className="login_btn_" type="submit">
                Update
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
export default ResetPassword;
