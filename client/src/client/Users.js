import "../resources/css/userinfo.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { api } from "../middleware/Api";
import { accessToken } from "../config/AccessToken";
import Navbar from "../layouts/Navbar";

function Users() {
  const { user } = UseAuthContext();
  const [users, setUserData] = useState("");

  const getUsersData = async () => {
    try {
      const token = accessToken();

      const response = await api(
        `/members/get_single_user/${token}`,
        "GET",
        {},
        {}
      );

      setUserData(response.user);
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
      <div id="top_space">
        <div className="user-info-body-user">
          <div class="user-container">
            <div className="user-container-div-1">
              <div class="box">
                <img src={users.image} alt=""></img>

                <ul className="unlist">
                  <li>{users.first_name}</li>
                  <li className="list-name-div">{users.last_name}</li>
                </ul>
              </div>
            </div>
            <div className="edit_profile">
              <Link to={`/edit_profile`} className="edit_profile">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
