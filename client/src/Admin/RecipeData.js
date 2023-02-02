import Navbar from "../layouts/AdminNavbar";
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from "axios"
import "../resources/css/userdata.css";
import RecipePagination from "../pagination/Pagination";

function RecipeData() {

  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);


  // Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getRecipe();
  }, []);
    
  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`);
    getRecipe();
}


const getRecipe = async () => {
  const response = await axios.get("http://localhost:5000/recipe");
  setRecipes(response.data);
};


  return (
    <div>

<Navbar/>


<div id="top_space">
<div class="table-wrapper" >
    <table className='fl-table'>
    <thead>
    <tr>
    <th></th>
    <th>Images</th>
    <th>Name</th>
    <th>Category</th>
    <th>Actions</th>

    </tr>
    </thead>
    <tbody>
    {currentPosts.map((recipe) => (
    <tr key={recipe.id}>
    <td>{recipe.id}</td>
    <td><img className="recipe-image-show" src={`http://localhost:5000/${recipe.image}`} alt="recipe" width="100" height="100" /></td>
    <td>{recipe.name}</td>
    <td>{recipe.category && recipe.category.name}</td>
   
    <div className="actions"> 
    <td  className="edit-button">
    <Link className="links-to-recipe"  to={`/edit_recipe/${recipe.id}`} >Edit</Link>

    </td>

    <td className="delete-button">
    <Link className="links-to-recipe"   onClick={ () => deleteRecipe(recipe.id) }  >Delete</Link>
    </td>
    
    
    </div>
   
    

    </tr>
    ))}
    </tbody>
    </table>

   <RecipePagination postsPerPage={postsPerPage} totalPosts={recipes.length} paginate={paginate} currentPage={currentPage} />

</div>

    </div>
   
</div>
  );
}

export default RecipeData;

