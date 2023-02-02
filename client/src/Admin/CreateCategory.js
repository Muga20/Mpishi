import React, { useState } from "react";
import axios from "axios";
import "../resources/css/login.css";
import { UseAuthContext } from "../hooks/UseAuthContext";
import "../resources/css/userdata.css";
import Navbar from '../layouts/AdminNavbar'
import { useNavigate } from "react-router-dom"; //import useNavigate

function CreateCategory() {
  const [name, setName] = useState("");
  const [setErrors] = useState(false); //initialize useNavigate
  const [image, setImage] = useState("");
  const { user } = UseAuthContext();
  const navigate = useNavigate(); //initialize useNavigate

  const createCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      if (await axios.post("http://localhost:5000/category", formData))
        navigate("/category-list");
      {
        setErrors(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors("Failed"); //send errors if email already exist
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div id="top_space2">
        <div className="user-info-body">
          <form method="post" onSubmit={createCategory}>
            <div className="user-container-div-2">
              <div className="About">
                <ul>
                  <h1> Create Category </h1>
                </ul>

                <ul>
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    Add Category
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
