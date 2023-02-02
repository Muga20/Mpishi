import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';  //import useNavigate
import axios from 'axios';
import "../resources/css/recipe.css";
import '../resources/css/navbar.css'
import Navbar from "../layouts/AdminNavbar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function PostBlog() {

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
    


    const blogs = async (e) => {
        e.preventDefault()
        toast.success("Comment created successfully");
        const formData = new FormData()
        formData.append('blog_title', blog_title)
        formData.append('blog_category', blog_category)
        formData.append('blog_text', blog_text)
        formData.append('image', image)
        formData.append('user_id', user_id)



       
        try {
            await axios.post('http://localhost:5000/blogs', formData,)
             
            navigate('/blog-data')
           
        } catch (error) {
            console.log(error)

            toast.error("Comment not created");
        }
    }
  return (
    <div>
    <div>
    <Navbar />

    <div className='admin-nav'>
    <div className="Add_Category_button">
         <i className="fa-duotone fa-plus"></i>
    </div>
 </div>

    <div  className="flex-right-content-">
    <div className='form-div'>

    <form action='/server/upload/image-upload.js' onSubmit={blogs} method="POST" encType='multipart/form-data'>

    <div className="image-Category">

    <input className="inputFile" ref={inputRef}  type="file" onChange={(e) => setImage(e.target.files[0])} />
    <br />

    </div>

    <div className='add-recipe-div'>

    <div className='add-recipe-div-one'>
    <input className="input-recipe"  ref={inputRef} type="text" cols="70" rows="3" placeholder='Title' defaultValue="Initial value"  value={blog_title} onChange={(e) => setBlogTitle(e.target.value)} />
    <br />
    
    </div>

    <div className='add-recipe-div-two'>
    <input className="input-recipe-time" ref={inputRef} type="text"   placeholder='Blog Category'  defaultValue="Initial value" value={blog_category} onChange={(e) => setBlogCategory(e.target.value)} />
    <br />
    
    </div>

    </div>
                        
        <textarea rows="4" cols="76" className="input-text-area"  ref={inputRef} type="text" placeholder='Write Your article'   defaultValue=""  value={blog_text} onChange={(e) => setBlogText(e.target.value)} />
        <br />
       
        <button className="button-add-recipe" onClick={handleClick} type="submit">Publish</button>
    </form>
    </div>
    
</div>
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
  )
}

export default PostBlog