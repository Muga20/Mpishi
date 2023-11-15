import axios from "axios";
import "../resources/css/userblog.css";
import Navbar from "../layouts/Navbar";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Footer from "../Views/Footer";
import { api } from "../middleware/Api";

function DisplayBlogs() {
  const [blogs, setBlogs] = useState([]);

  const getBlog = async () => {
    try {
      const response = await api(`/blogs/member/`, "GET", {}, {});
      setBlogs(response.listAllBlogs);

      console.log(response.listAllBlogs);
    } catch (error) {
      console.log(error);
    }

  };

  try {
    const deleteBlog = async (id) => {
      const response = await api(`/blogs`, "DELETE", {}, { id });
      getBlog();
    };
  } catch (error) {
    console.log(error);
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
              { blogs.map((My_blog) => (
                  <div class="user-blogs-widget">
                    <h2> {My_blog.blog_title} </h2>
                    <Link
                      to={`/my-blogs/${My_blog.member.id}`}
                      className="continue-lendo"
                    >
                      Read more →
                    </Link>
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

                    <img
                      className="post-info-image"
                      src={`http://localhost:5000/${blog.blog_image}`}
                    />

                    <h1> {blog.blog_title}</h1>
                    <hr />

                    <Link
                      to={`/read-blog/${blog.id}`}
                      className="continue-lendo"
                    >
                      Read more →
                    </Link>
                    <br />
                    <br />
                    <Link
                      className="user-delete-blogs"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayBlogs;
