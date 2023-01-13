import React, { useState ,useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "../resources/css/login.css";
import Navbar from "../Admin/Navbar";
import {  useParams , useNavigate } from 'react-router-dom';



function EditCategory() {
  const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [ image, setImage] = useState('')


    useEffect(() => {
      getCategoryById();
  }, []);

  const getCategoryById = async () => {
      const response = await axios.get(`http://localhost:5000/category/${id}`);
      setName(response.data.name);
  
  }

  
 
    const updateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('image', image)

        await axios.patch(`http://localhost:5000/category/${id}`, formData);
        navigate('/create_category');

      
 

    }
  return (
    <div>
    <Navbar />
    <section  className="flex-right-content">
      <center>
     
        <h1> Edit CreateCategory </h1>
      </center>
      <form onSubmit={updateCategory}>
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
          <button  type="submit" className="login_btn_" >Edit Category </button>
       
       </div>
      </form>
    </section>

    </div>
  )
}

export default EditCategory