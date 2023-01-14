import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/css/login.css";

import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";

import axios from 'axios';



function Reset() {
    const [ email, setEmail ] = useState("")
    const [error, setError] = useState(false);
    let navigate = useNavigate() ; //initialize useNavigate



    const ResetPassword = async (e) => {
        e.preventDefault()
        try {
          await axios.post("http://localhost:5000/members/forgotpassword", {        
            email,
          })
        } catch (error) {
            if (error.response?.status === 400) {
              setError("Not yet a member consider opening an account "); //send errors if you have not sing in
            } else if (error.response?.status === 401) {
              setError("Check Email Again"); // /send errors if password and email does not much
            }
          }
      }

  return (
    <div>

    <Navbar />

    <div className="Top_padding">

      <section className="container">
        <form onSubmit={ResetPassword}>
     
          <div >
            <center>
           
              <h1 className="login_h1"> <span className="login_span"></span> RecoverAcc </h1>
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
            <button className="login_btn_" type="submit">Send</button>
          </div>
        </form>
       

      </section>
    </div>
    <Footer />
    </div>
  )
}

export default Reset