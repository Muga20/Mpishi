import React, { useState, useEffect } from "react";
import axios from "axios";
import "../resources/css/listcategory.css";
import Navbar from "../layouts/Navbar";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import NavbarTwo from "../Views/Navbar";

function ListCategory() {
  const [category, setCategory] = useState([]);
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = category.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      const { email } = JSON.parse(localStorage.getItem("user")) || {};
      setEmail(email);
    };
    fetchData();
  }, []);

  const getCategory = async () => {
    const response = await axios.get("http://localhost:5000/category");
    setCategory(response.data);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/category/${id}`);
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      {!email && (
        <div>
          <NavbarTwo />
        </div>
      )}
      {email && (
        <div>
          <Navbar />
        </div>
      )}
      <div className="list-category-top">
        <h1 class="heading"> Categories </h1>
        <div class="flex-container">
          {currentPosts.map((categories) => (
            <div class="flex-item" key={categories.id}>
              <div className="flex-item-image">
                <img className="flex-item-image" src={categories.image} />
              </div>
              <div className="">
                <Link
                  className="class-name-link"
                  to={`/show-category/${categories.id}`}
                  onClick={() => localStorage.setRecipe(categories._id)}
                >
                  <span className="">{categories.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={category.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default ListCategory;
