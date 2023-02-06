
import axios from 'axios';
import '../resources/css/userblog.css'
import Navbar from '../layouts/Navbar'
import React, { useEffect, useState } from "react";
import { Link , useParams} from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Pagination from "../pagination/Pagination";
import Footer from '../Views/Footer';


function DisplayBlogs() {

    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
  
  
    // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  const { user } = UseAuthContext();

  const getBlog = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/member/${user.id}`);
    setBlogs(response.data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  const deleteBlog = async (id) => {

    await axios.delete(`http://localhost:5000/blogs/${id}`);
    getBlog();
  }
  
  useEffect(() => {
    getBlog();
  }, []);
  

  return (
    <div>
    
     <Navbar />
     <div className="user-blogs-body">
<div id="top_space">
<div class="wrap">
<aside class="user-blogs-sidebar">
<h2>Topics </h2>
{currentPosts.length>0 && blogs.map(My_blog => (
<div class="user-blogs-widget">
  <h2> {My_blog.blog_title} </h2>
  <Link to={`/my-blogs/${My_blog.member.id}`} className="continue-lendo">Read more →</Link>
</div>
  ))}

</aside>

<div class="user-blogs-content-publish">
{blogs.map((blog) => (
<div class="users-blog-dis" key={blog.id}>
<div class="conteudo">
<div class="post-info">
    Auther : {blog.member.first_name} 
</div>

<img className='post-info-image' src={`http://localhost:5000/${blog.blog_image}`}/>


<h1> {blog.blog_title}</h1>
<hr/>


    
  
<Link to={`/read-blog/${blog.id}`} className="continue-lendo">Read more →</Link>
<br/>
<br/>
<Link className="user-delete-blogs"   onClick={ () => deleteBlog(blog.id) }>Delete</Link>
</div>


</div>
))}
</div>


<div className='pagination'>

<Pagination postsPerPage={postsPerPage} totalPosts={blogs.length} paginate={paginate} currentPage={currentPage} />

</div>




</div>

</div>
</div>
<Footer />
</div>
     
   
  )
}

export default DisplayBlogs


