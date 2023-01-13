import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../resources/css/styles.css'

function Search() {

    const [fetchAPI, setApi] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
  
 
    const getRecipe = async () => {
      const res = await axios.get("http://localhost:5000/recipe");
      setApi(res.data);
    };
    
    useEffect(() => {
        
      const results = fetchAPI.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm)
      );
    
      setSearchResult(results);
      getRecipe();
    }, [fetchAPI]);


    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
  return (
    <div>
    <section className="menu  " id="menu">
    <input
      type="text"
      className="SearchButton "
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />
    <div className="flex_search">
    <div className="sujested_searches"><span className="sujested" >Sujested</span></div>
    <div  className="serach_list">
       {searchResult.slice(0,2).map((recipe, id) => (
      <div key={id}>
      <ul><li className="list_name">
      <Link  to={`/read_recipe/${recipe.id}`}onClick={() => localStorage.setItem(recipe._id)}>
      <span className="recipe_span">{recipe.name}</span> </Link>
      </li></ul>
     </div> ))}
    </div>
    
    </div>
    </section>
  </div>

  )
}

export default Search