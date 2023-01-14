import "../resources/css/userinfo.css";
import Navbar from "../Views/Navbar";
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Footer from "../Views/Footer";

function Users() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [image, setImage] = useState("");
  const { id } = useParams();

  const logout = () => {
    // remove use from localStorage
    localStorage.removeItem("user");
    //  dispatch log out action
    dispatch({ type: "LOGOUT" });
  };

  const createProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    await axios.post("http://localhost:5000/members", formData);
  };

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="body">
        <div class="user-container">
          <div className="user-container-div-1">
            <div class="box">
              <img
                src={`http://localhost:5000/${user.user.image}`}
                alt=""
              ></img>
              <form method="post" onSubmit={createProfile}>
                <input
                  className="inputFile"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <button type="submit">add</button>
              </form>
              <ul className="unlist">
                <li>{user.user.first_name}</li>
                <li className="list-name-div">{user.user.last_name}</li>
              </ul>
            </div>
          </div>
          <div className="user-container-div-2">
            <div class="About">
              <ul>
                <h1>about</h1>
              </ul>
              <ul>
                <h3>Gender</h3>
                <li>male</li>
              </ul>

              <ul>
                <h3>More Info</h3>
                <p>(injected humour and the like).</p>
              </ul>
              <ul>
                <h3>Contact</h3>
                <li>{user.user.email}</li>
              </ul>
              <ul>
                <Link
                  to={`/edit_profile/${user.user.id}`}
                  className="edit_profile"
                >
                  Edit Profile
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Users;
