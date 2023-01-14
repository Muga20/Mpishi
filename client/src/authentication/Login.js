import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/css/login.css";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Navbar from "../Views/Navbar";
import Footer from "../Views/Footer";
import { setHeaders } from "../headers/header";
import axios from 'axios';
import ResetPassword from "./ResetPassword";


function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const  navigate = useNavigate();
  const { dispatch } = UseAuthContext();

    const LoginUser = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:5000/members/login',{
            email: email,
            password: password  

          },setHeaders())
            .then((res)=> {
              localStorage.setItem("user", JSON.stringify(res.data));
              dispatch({ type: "LOGIN", payload: res.data });
            })

            navigate('/login')
  
      } catch (error) {
        if (error.response?.status === 400) {
          setError("not yet sign in"); //send errors if you have not sing in
        } else if (error.response?.status === 401) {
          setError("email and password doesn't much"); // /send errors if password and email does not much
        }
      }



    
    };

   


  return (
    <div>

    <Navbar />

    <div className="Top_padding">

      <section className="container">
        <form onSubmit={LoginUser}>
     
          <div >
            <center>
           
              <h1 className="login_h1"> <span className="login_span">Welcome,Please</span> Login </h1>
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

            <input
              className="inputs"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="loginError">{error}</p>}

            <br />
            <button className="login_btn_" type="submit">Login</button>

            <p>
              <Link className="registrationLink" to="/Signup">Create account if Not a User</Link>
            </p>
            <p>
            <Link className="registrationLink" to="/reset">Recover Account</Link>
          </p>
            <p>
         
          </p>
          </div>
        </form>
       
      </section>
    </div>
    <Footer />
    </div>
   
  );
}

export default Login;
