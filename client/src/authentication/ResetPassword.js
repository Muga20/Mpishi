import React, { useState } from "react";
//import {  } from "react-ify";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";
import { useNavigate } from 'react-router-dom';  //import useNavigate



function ResetPassword() {
  
    const [oldPassword, setOldPassword] =useState("")
    const [newPassword, setNewPassword] =useState("")
    const [confirmPassword, setConfirmPassword] =useState("")
    const { id } = useParams();
    let navigate = useNavigate() ; //initialize useNavigate
    const [error, setError] = useState(false);

     

    const resetPassword = async (e) => {

      e.preventDefault();
      try {
          await axios.patch(`http://localhost:5000/members/reset/${id}`, {
          oldPassword,
          newPassword,
          confirmPassword
        })

        .then((res)=> {
          console.log(res.data)

          navigate('/login')
        })
       }  catch (error) {
        if (error.response?.status === 400) {
          setError(" Error "); //send errors if you have not sing in
        } else if (error.response?.status === 401) {
          setError(" Password Doesn't match"); // /send errors if password and email does not much
        }
      }
    };

  return (
  <div>
  <Navbar />
  <div className="Top_padding">

  <section className="container">
    <form onSubmit={resetPassword}>
 
      <div >
        <center>
       
          <h1 className="login_h1"> <span className="login_span"> Recover your Account </span>  </h1>
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
        <button className="login_btn_" type="submit">Update</button>
      </div>
   
    </form>
  </section>
</div>
<Footer />
  </div>
  )
}
export default ResetPassword