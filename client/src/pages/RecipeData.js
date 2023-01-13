import Navbar from "../Admin/Navbar";
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from "axios"
import "../resources/css/userdata.css";

function RecipeData() {

  const [recipes, setRecipes] = useState([]);

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
    <Navbar />

 <div className='flex-right-content'>

 <div className='admin-nav'>
    <div className="Add_Category_button">
         <i className="fa-duotone fa-plus"></i>
    </div>
 </div>

<div class="table-wrapper" >
    <table className='fl-table'>
    <thead>
    <tr>
    <th></th>
    <th>Images</th>
    <th>Name</th>
    <th>Category</th>
    <th>Actions</th>
    <th>
    
    <Link to={"/add_recipe"} >Add<i class="fa-solid fa-plus"></i></Link>
  
    </th>
  
    </tr>
    </thead>
    <tbody>
    {recipes.map((recipe) => (
    <tr key={recipe.id}>
    <td>{recipe.id}</td>
    <td><img className="recipe-image-show" src={`http://localhost:5000/${recipe.image}`} alt="recipe" width="100" height="100" /></td>
    <td>{recipe.name}</td>
    <td>{recipe.category.name}</td>
   
    <td className="actions">
    <div>
    <Link to={`/edit_recipe/${recipe.id}`} className="edit-button"><i class="fa-solid fa-pen-to-square"></i></Link>
    </div>
     <div>
    <Link onClick={ () => deleteRecipe(recipe.id) }  className="delete-button"><i class="fa-solid fa-trash"></i></Link>
    </div>
    </td>
    

    </tr>
    ))}
    </tbody>
    </table>

</div>

    </div>
    </div>

  );
}

export default RecipeData;

