import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import Navbar from "../Views/Navbar";
import '../resources/css/styles.css'
import SubFooter from "../Views/SubFooter";
import RecipePagination from "../pagination/Pagination";



function ListRecipe() {
   
    const [recipe, setRecipe] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recipe.slice(indexOfFirstPost, indexOfLastPost);

    

    useEffect(() => {
      getRecipe();
    }, []);
  
    const getRecipe = async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      setRecipe(res.data);
 
    };
    
  return (
    <div>
      <Navbar />
      <div className="Top_padding" >
        <section className="menu  " id="menu">
          
        <h1 className="heading"> Recipes </h1>

          <h1 className="heading">  </h1>

          <div className="box-container">
            {currentPosts.map((recipe, id) => (
              <div className="box" key={recipe.id}>
                <div className="image">
                  <img src={`http://localhost:5000/${recipe.image}`} alt="" />
                 
                </div>
                <div className="content">
              
                  <h3>{recipe.name}</h3>

                  <Link
                    className="btn"
                    to={`/read_recipe/${recipe.id}`}
                    onClick={() => localStorage.setItem(recipe._id)}
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <RecipePagination postsPerPage={postsPerPage} totalPosts={recipe.length} paginate={paginate} currentPage={currentPage} />

        </section>
        </div>

     {/** Sub Footer is added here */}
     <SubFooter />

     {/** Footer is added here  */}  
      <Footer />

      </div>
    
  );
}

export default ListRecipe;