import React, { useState  } from "react";
import axios from "axios";
import "../resources/css/login.css";
import { UseAuthContext } from "../hooks/UseAuthContext";
import "../resources/css/userdata.css";
import Navbar from "../Admin/Navbar";
import { useNavigate } from 'react-router-dom';  //import useNavigate




function CreateCategory() {
  const [name, setName] = useState("");
  const [ setErrors] = useState(false); //initialize useNavigate
  const [ image, setImage] = useState('')
  const { user } = UseAuthContext();
  const navigate = useNavigate(); //initialize useNavigate


  const createCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    try {
      if (
        await axios.post("http://localhost:5000/category", formData,)) 
           navigate('/categorylist')
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

      <div className="flex-right-content">
      <section >
        <center>
       
          <h1> Add CreateCategory </h1>{" "}
        </center>
        <form onSubmit={createCategory}>
          <div className="container">
            <br />
            <input
              type="text"
              className="inputs"
              placeholder="Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />

            <input className="inputFile"   type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />

            <button type="submit" className="login_btn_">Add Category</button>
          </div>
        </form>
      </section>



    </div>
    </div>
  );
}

export default CreateCategory;
