
import express from "express"; 
import upload from "../middleware/imageupload.js";

import { 
    getAllRecipes,
    createRecipes,
    getRecipesById,
    updateRecipes,
    deleteRecipes,
   
  
} from "../controllers/recipe.js";
import  useRole from "../middleware/middleware.js";
 
const RecipeRoutes = express.Router();
 
RecipeRoutes .get('/', getAllRecipes);
RecipeRoutes .get('/:id', getRecipesById);
RecipeRoutes .post('/', upload,createRecipes);
RecipeRoutes .patch('/:id',upload,updateRecipes);
RecipeRoutes .delete('/:id', deleteRecipes);

export default RecipeRoutes;
