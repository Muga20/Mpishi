import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../resources/css/search.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ closeModal, children }) => {
  const [fetchAPI, setApi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      setApi(res.data);
    };
    getRecipe();
  }, []);

  useEffect(() => {
    const results = fetchAPI.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm)
    );
    setSearchResult(results);
  }, [fetchAPI, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="search-div-con">
      <div className="search-div">
        <div className="modal-content">
          <button className="modal-content-button" onClick={closeModal}>
            {" "}
            <AiOutlineCloseCircle />{" "}
          </button>
          {children}
        </div>
        <div className="search-div-input">
          <input
            type="text"
            className="search-button"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        {searchTerm !== "" ? (
          <div className="suggested-searches">
          
            <div className="search-list">
              {searchResult.slice(0,5).map((recipe, id) => (
                <ul key={id}>
                  <li className="list-name">
                    <Link
                      className="search-link"
                      to={`/read_recipe/${recipe.id}`}
                      onClick={() => localStorage.setItem(recipe._id)}
                    >
                      <span className="recipe-span">{recipe.name}</span>
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <div className="suggested-searches">
            <span className="suggested">Type Something </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
