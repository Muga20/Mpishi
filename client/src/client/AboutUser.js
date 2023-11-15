import "../resources/css/userinfo.css";
import React, { useState, useEffect } from "react";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Navbar from "../layouts/Navbar";

function AboutUser() {
  const { user } = UseAuthContext();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { first_name, last_name, username, email, phone, gender } =
        JSON.parse(localStorage.getItem("user"));
      setFirstName(first_name);
      setLastName(last_name);
      setUserName(username);
      setPhone(phone);
      setGender(gender);
      setEmail(email);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="top_space2">
        <div className="user-info-body">
          <div class="user-container">
            <div className="user-container-div-2">
              <div class="About">
                <ul>
                  <h1>about</h1>
                </ul>

                <ul>
                  <h3>Your User Name </h3>
                  <p> @ {username}</p>
                </ul>
                <ul>
                  <h3>Names</h3>
                  <li>
                    {first_name} {last_name}
                  </li>
                </ul>

                <ul>
                  <h3>Gender</h3>
                  <li>{gender}</li>
                </ul>

                <ul>
                  <h3>Contact</h3>
                  <li>{phone}</li>
                </ul>

                <ul>
                  <h3>Email</h3>
                  <li>{email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUser;
