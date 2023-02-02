import Navbar from '../User/Navbar';
import '../resources/css/blogscomments.css';
import axios from 'axios';
import '../resources/css/userblog.css';
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CommentList() {
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
      <div className="flex-right-content">
        <div className="comments-container">
          <h1>Comentarios <a href="http://creaticode.com">creaticode.com</a></h1>
          <ul id="comments-list" className="comments-list">
            <li>
              {blogs.map(blog => (
                <div className="comment-main-level" key={blog.id}>
                  <div className="comment-avatar">
                    <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
                  </div>
                  <div className="comment-box">
                    <div className="comment-head">
                      <h6 className="comment-name by-author">
                        <a href="http://creaticode.com/blog">{blog.member} </a>
                      </h6>
                      <span>hace 20 minutos</span>
                      <span></span>
                      <i className="fa fa-reply"></i>
                      <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">{blog.blog_title}</div>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
