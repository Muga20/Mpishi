import React from "react";
import Navbar from "../layouts/AdminNavbar";
import "../resources/css/userdata.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import Pagination from "../pagination/Pagination";

function BlogData() {
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />

      <div id="top_space">
        <div class="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Writer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.blog_title}</td>
                  <td>{blog.blog_category}</td>
                  <td>{blog.member.first_name}</td>

                  <div className="actions">
                    <td className="delete-button">
                      <button
                        className="links-to-recipe-"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        {" "}
                        Remove{" "}
                      </button>
                    </td>
                    {/* 
  <td className="delete-button">
  <Link  to={`/read-blog/${blog.id}`} > Read </Link>
  </td>
*/}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={blogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogData;
