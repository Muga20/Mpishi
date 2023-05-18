import Navbar from '../layouts/Navbar'
import '../resources/css/readblog.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Comments from '../client/CommentsModal';
// import { FaRegCommentAlt } from 'react-icons/fa';
// import { AiOutlineHeart } from 'react-icons/ai';




function ReadBog() {

  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [showComment, setShowComment] = useState(false);

   useEffect(() => {
    const fetchBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/blogs/${id}`);
            console.log(res.data);
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchBlog();
}, [id]);



// const openComment = () => {
//   setShowComment(true);
// }

// const closeComment = () => {
//   setShowComment(false);
// }


  return (
    <div>
     <Navbar />
    

    <header className='user-blog-header'>

    <div class="header-banner">
       <img src={`http://localhost:5000/${blogs.blog_image}`}/>
    </div>

    <div class="clear"></div>
    <nav className='user-bog-nav'>
    
     {/**  
         <div className='user-blog-nav-left'>
         <button  className='user-blog-nav-left-button' onClick={openComment}><FaRegCommentAlt/></button>
         {showComment && <Comments closeComment={closeComment}></Comments>}
         </div>

         <div className='user-blog-nav-right'>
         <button  className='user-blog-nav-right-button'><AiOutlineHeart className='heart'/></button>
         </div>
    */}
     


        <ul>
            <li><h3>Published .   
             <small>
            {(() => {
              const now = new Date();
              const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              ).getTime();
              const yesterday = today - 86400000; // 24 hours in milliseconds
              const blogDate = new Date(blogs.createdAt).getTime();
              if (blogDate >= today) {
                return "Today";
              } else if (blogDate >= yesterday) {
                return "Yesterday";
              } else if (blogDate < yesterday) {
                return "Many Days Ago";
              }else{
                return blogs.createdAt;

              }
            })()}
          </small> 
          </h3>
          </li>
            <li><h3>Written By :  {blogs.member && blogs.member.first_name}  </h3></li>
           
        </ul>
    </nav>
</header>
     
<h1 className='read-blog-h1'>{blogs.blog_title}</h1>

<div class="user-bog-content">

   
    <article>
        <p>
        {blogs.blog_text}
        </p>
    </article>
  
 
        
    <aside className='user-blog-aside'>
        
        <img className='' src={`http://localhost:5000/${blogs.blog_image}`}/>
 
    </aside>
</div> 
  
    </div>

  )
}

export default ReadBog