import "../resources/css/userinfo.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";

import Navbar from "../layouts/Navbar";

function Users() {
  const { user } = UseAuthContext();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [image, setImage] = useState("");


  useEffect(() => {
    const fetchData = async () => {
    const { first_name, last_name ,image } = JSON.parse(localStorage.getItem("user"));
    setFirstName(first_name );
    setLastName(last_name);
    setImage(image);

    };
    fetchData();
    }, []);


  return (
    <div>
 
   <Navbar />
   <div id="top_space">
      <div className="user-info-body-user">
        <div class="user-container">
          <div className="user-container-div-1">
            <div class="box">
              <img
                src={`http://localhost:5000/${image}`}
                alt=""
              ></img>
        
              <ul className="unlist">
                <li>{first_name}</li>
                <li className="list-name-div">{last_name}</li>
              </ul>
            </div>
           
           
          </div>
          <div className="edit_profile">
            
            <Link
            to={`/edit_profile/${user.id}`}
            className="edit_profile"
          >
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
