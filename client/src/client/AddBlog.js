import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';  //import useNavigate
import axios from 'axios';
import "../resources/css/recipe.css";
import '../resources/css/navbar.css'
import Navbar from "../layouts/Navbar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AddBlog() {

    const [blog_title , setBlogTitle] = useState('')
    const [blog_category , setBlogCategory] = useState('')
    const [blog_text , setBlogText] = useState('')
    const [image , setImage] = useState('')
    const [user_id , setUserId] = useState('')
    
    const navigate = useNavigate(); //initialize useNavigate
    const inputRef = useRef(null);  //initialize useRef


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setUserId(user.id);
    }, []);


    function handleClick() {
      console.log(inputRef.current.value);   //get value from inputRef
    }
    


    const createBlogs = async (e) => {
        e.preventDefault()
        toast.success("Comment created successfully");
        const formData = new FormData()
        formData.append('blog_title', blog_title)
        formData.append('blog_category', blog_category)
        formData.append('blog_text', blog_text)
        formData.append('image', image)
        formData.append('user_id', user_id);
       
        try {
            await axios.post('http://localhost:5000/blogs', formData,)
             
            navigate('/user-blogs')
           
        } catch (error) {
            console.log(error)

            toast.error("Comment not created");
        }
    }
  return (
    <div>
    <Navbar />
    <div id="top_space">
      <div className=".user-info-body">
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
                  placeholder="Blog Title"
                  value={ blog_title}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                <br />
                <input
                type="text"
                className="user-inputs"
                placeholder="Blog Category"
                value={blog_category}
                onChange={(e) => setBlogCategory(e.target.value)}
              />

                <br />
                <textarea
                  rows="4" 
                  cols="76" 
                  type="text"
                  className="user-inputs"
                  placeholder="Blog Text"
                  value={blog_text}
                  onChange={(e) => setBlogText(e.target.value)}
                />
              <br/>

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
                   PostBlog
                </button>
              </ul>
            </div>
          </div>
        </form>
    
    </div>

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
  )
}

export default AddBlog