import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import Navbar from "../Views/Navbar";
import '../resources/css/styles.css'
import Search from "../pages/Search";
import SubFooter from "../Views/SubFooter";


function Recipes() {
   
    const [fetchAPI, setApi] = useState([]);
  

    useEffect(() => {
      getRecipe();
    }, [fetchAPI]);
  
    const getRecipe = async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      setApi(res.data);
    };
    
  return (
    <div>
      <Navbar />
      <div className="Top_padding" >
        <section className="menu  " id="menu">
           <Search />
        <h1 className="heading"> Recipes </h1>

          <h1 className="heading">  </h1>

          <div className="box-container">
            {fetchAPI.slice(0,9).map((recipe, id) => (
              <div className="box" key={fetchAPI.id}>
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
        </section>
        </div>

     {/** Sub Footer is added here */}
     <SubFooter />

     {/** Footer is added here  */}  
      <Footer />

      </div>
    
  );
}

export default Recipes;