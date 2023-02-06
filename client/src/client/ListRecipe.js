import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import Navbar from "../Views/Navbar";

import '../resources/css/recipemenu.css'
import SubFooter from "../Views/SubFooter";
import RecipePagination from "../pagination/Pagination";
import { UseAuthContext } from "../hooks/UseAuthContext";



function ListRecipe() {
    const { user } = UseAuthContext();
    const [recipe, setRecipe] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [email, setEmail] = useState("");

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recipe.slice(indexOfFirstPost, indexOfLastPost);


    useEffect(() => {
      const fetchData = async () => {
      const { email } = JSON.parse(localStorage.getItem("user"));
      setEmail(email );
      };
      fetchData();
      }, []);

    useEffect(() => {
      getRecipe();
    }, []);
  
    const getRecipe = async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      const shuffledData = res.data.sort(() => 0.5 - Math.random());
      setRecipe(shuffledData);
 
    };
    
  return (
    <div>
      <Navbar />
      <div className="Top_padding" >
        <div className="recipe-read-menu">
          
        <h1 className="heading"> Recipes </h1>


          <div className="recipe-read-box-container">
            {currentPosts.map((recipe, id) => (
              <div className="recipe-read-box" key={recipe.id}>

                 <div className="recipe-read-image">
                  <img className="recipe-read-image" src={`http://localhost:5000/${recipe.image}`} alt="" />
                 
                </div>
                <div className="recipe-content">   
                {user && (
                  <Link
                    className="recipe-read-link"
                    to={`/read_recipe/${recipe.id}`}
                    onClick={() => localStorage.setRecipe(recipe._id)}
                  >
                    <span className="name-span">{recipe.name}</span>
                  </Link>
                )}
                
                </div>
              </div>
            ))}
          </div>

          <RecipePagination postsPerPage={postsPerPage} totalPosts={recipe.length} paginate={paginate} currentPage={currentPage} />

        </div>
        </div>

     {/** Sub Footer is added here */}
     <SubFooter />

     {/** Footer is added here  */}  
      <Footer />

      </div>
    
  );
}

export default ListRecipe;