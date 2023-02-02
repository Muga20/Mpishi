import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../resources/css/userinfo.css'

import Navbar from "../Views/Navbar.js";

function FinishAccountSetup() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirst_name(user.first_name);
      setLast_name(user.last_name);
      setEmail(user.email);
      setPassword(user.password);
      setGender(user.gender);
      setPhone(user.phone);
      setImage(user.image);
    }
  }, []);


  const updateMembers = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("image", image);

    await axios.patch(`http://localhost:5000/members/update/${id}`, formData );

    const  user = JSON.parse(localStorage.getItem("user"));
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.gender = gender;
    user.phone = phone;
    user.image = image;
    user.password = password;
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/users");
  };
  
  return (
    <div>
    <Navbar />
    <div className="user-info-background">

        <form method="post" onSubmit={updateMembers}>
          <div className="user-container-div-2">
            <div className="About">
              <ul>
                <h1>Update Profile </h1>
              </ul>

              <ul>
                <h3>Names</h3>
                <input
                  type="text"
                  className="user-inputs"
                  placeholder="FirstName"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />

                <br />
                <input
                  type="text"
                  className="user-inputs"
                  placeholder="LastName"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />

                <br />
                <input
                  type="text"
                  className="user-inputs"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <br />

              
                <select id="gender" className="gender" 
                onChange={(e) => setGender(e.target.value)}>
                  <option value="">Choose a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                
              </ul>
              <ul>
                <h3>Email</h3>
                <input
                  type="text"
                  className="user-inputs"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ul>

              <ul>
                <h3>Image</h3>
                <input
                  className="inputFile"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </ul>
              <ul>
                <button className="button-add-recipe" type="submit">
                  Update
                </button>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  

  );
}

export default FinishAccountSetup;



