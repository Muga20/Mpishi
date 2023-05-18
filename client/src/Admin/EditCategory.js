import React, { useState ,useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom'
import "../resources/css/login.css";
import Navbar from '../layouts/AdminNavbar'
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
        navigate('/category-list');

      
 

    }
  return (
    <div>
    <Navbar />
   <div id="top_space2">
    <div className="user-info-body">
      <form method="post" onSubmit={updateCategory}>
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
                Update
              </button>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>


  )
}

export default EditCategory