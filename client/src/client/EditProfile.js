import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/css/userinfo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../middleware/Api";
import { accessToken } from "../config/AccessToken";
import Navbar from "../layouts/Navbar";

function EditProfile() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate();
  const token = accessToken();

  const updateMembers = async (e) => {
    e.preventDefault();
    // Validate data before making the API request
    if (!token) {
      // Handle the case when the token is missing or invalid
      // You can redirect the user to the login page or show an error message
      return;
    }

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("image", image);

    try {
      const response = await api(
        `/members/update/${token}`,
        "PATCH",
        {},
        formData
      );

      getUsersData();

      // Redirect the user after a successful update
      navigate("/users");
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Error updating member:", error);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await api(
        `/members/get_single_user/${token}`,
        "GET",
        {},
        {}
      );

      setFirst_name(response.user.first_name);
      setLast_name(response.user.last_name);
      setEmail(response.user.email);
      setPhone(response.user.phone);
      setGender(response.user.gender);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getUsersData();
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

                  <select
                    id="gender"
                    className="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
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
