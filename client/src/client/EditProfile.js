import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../resources/css/userinfo.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../layouts/Navbar";

function EditProfile() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const updateMembers = async (e) => {
    try {

    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("image", image);
  
    await axios.patch(`http://localhost:5000/members/${id}`, formData ,);

    
    const user = JSON.parse(localStorage.getItem("user"));
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.gender = gender;
      user.phone = phone;
      user.image = image;
      user.password = password;
      localStorage.setItem("user", JSON.stringify(user));


      //navigate("/user-profile");
      return toast.success("Updated Profile Successfully , Image will be updated after refresh ");
     

    } catch (error) {
      return toast.error(error.response.data);
    }
  };
  

  const getMemberById = async () => {
    const res = await axios.get(`http://localhost:5000/members/${id}`);
    setFirst_name(res.data.first_name);
    setLast_name(res.data.last_name);
    setEmail(res.data.email);
    setImage(res.data.image);
    setPhone(res.data.phone);
    setGender(res.data.gender);
   
  };

  useEffect(() => {
    getMemberById();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="top_space2">
      <div className="user-info-body">
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
                <h3>Password</h3>
                <input
                  type="password"
                  className="user-inputs"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
    </div>
  
  );
}

export default EditProfile;



