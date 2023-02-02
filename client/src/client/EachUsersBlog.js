import axios from 'axios';
import '../resources/css/userblog.css'
import Navbar from '../layouts/Navbar'
import React, { useEffect, useState } from "react";
import { Link , useParams} from "react-router-dom";

function EachUsersBlog() {
  const [memberId, setMemberId] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setMemberId(user.id);
  }, []);

  useEffect(() => {
    if (memberId) getBlog();
  }, [memberId]);

  const getBlog = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/member/${memberId}`);
    setBlogs(response.data);
  };

  return (
    <div>
      <Navbar />
      <div className='flex-right-content'>
        <header className="user-blogs-header">
          <ul>
            <li className="cor-1"></li>
            <li className="cor-2"></li>
            <li className="cor-3"></li>
            <li className="cor-4"></li>
            <li className="cor-5"></li>
          </ul>
        </header>
        <div className="wrap">
          <div className="user-blogs-content-publish">
            <button className="user-blogs-button">
              <Link to={"/post-blog"} >Publish yours Now  </Link>
            </button>
          </div>
          {blogs.length > 0 && 
            blogs.map((blog, index) => (
              <div className="users-blog-dis" key={`blog-${index}`}>
                <div className="conteudo">
                  <div className="post-info">
                    Auther : {blog.member.first_name} 
                  </div>
                  <img className='post-info-image' src={`http://localhost:5000/${blog.blog_image}`}/>
                  <h1> {blog.blog_title}</h1>
                  <hr/>
                  <Link to={`/read-blog/${blog.id}`} className="continue-lendo">Read more →</Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default EachUsersBlog;
