import React, { useEffect, useState } from "react";
import "../resources/css/blog.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    setBlogs(response.data);
  };

  return (
    <div>
      <div class="blog-body-background ">
        <div className="blog-body">
          <h1 class="heading"> Blogs </h1>
          <div class="blog-container">
            {blogs.slice(0, 3).map((blog) => (
              <div class="blog-card" key={blog.id}>
                <Link to={`/read-blog/${blog.id}`} class="blog-image">
                  <img src={blog.blog_image} alt="image" class="blog-image" />
                </Link>

                <div class="card__body">
                  <span class="card__body__category">{blog.blog_category}</span>
                </div>
                <div class="card__footer">
                  <div class="user">
                    {/**  
                  <img  src={`http://localhost:5000/${blog.member.image}`} alt="user__image" class="user__image"/>
      */}

                    <div class="user__info">
                      <h5>
                        {" "}
                        <span className="user__info__span"> By : </span>
                        {blog.member.first_name}
                      </h5>
                      <small>
                        {(() => {
                          const now = new Date();
                          const today = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            now.getDate()
                          ).getTime();
                          const yesterday = today - 86400000; // 24 hours in milliseconds
                          const blogDate = new Date(blog.createdAt).getTime();
                          if (blogDate >= today) {
                            return "Today";
                          } else if (blogDate >= yesterday) {
                            return "Yesterday";
                          } else {
                            return blog.createdAt;
                          }
                        })()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
