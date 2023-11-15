import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; //import useNavigate
import axios from "axios";
import "../resources/css/recipe.css";
import "../resources/css/navbar.css";
import Navbar from "../layouts/Navbar";

import { api } from "../middleware/Api";

function AddBlog() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate(); //initialize useNavigate
  const inputRef = useRef(null); //initialize useRef

  function handleClick() {
    console.log(inputRef.current.value); //get value from inputRef
  }

  const createBlogs = async (e) => {
    e.preventDefault();
    if (!image || !image[0]) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("text", text);
    formData.append("image", image[0]); // Assuming you want to handle only the first file if multiple are selected

    try {
      const response = await api(
        `/blogs`,
        "POST",
        {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
        formData
      );

      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="top_space2">
        <div className="user-info-body">
          <form method="post" onSubmit={createBlogs}>
            <div className="user-container-div-2">
              <div className="About">
                <ul>
                  <h1>Add a Blog </h1>
                </ul>

                <ul>
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  <br />

                  <br />
                </ul>
                <h3>Please consider uploading a quality picture</h3>
                <ul>
                  <h3>Image</h3>
                  <input
                    className="inputFile"
                    type="file"
                    onChange={(e) => setImage(e.target.files)}
                    multiple
                  />
                </ul>
                <ul>
                  <button className="button-add-recipe" type="submit">
                    PostBlog
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

export default AddBlog;
