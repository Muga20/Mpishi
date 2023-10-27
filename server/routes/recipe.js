import express from "express";
import upload from "../middleware/imageUpload.js";

import {
  getAllRecipes,
  createRecipes,
  getRecipesById,
  updateRecipes,
  deleteRecipes,
} from "../controllers/recipe.js";

const RecipeRoutes = express.Router();

RecipeRoutes.get("/get_all_recipe", getAllRecipes);
RecipeRoutes.get("/get_all_recipe_by_id/:id", getRecipesById);
RecipeRoutes.post("/create_recipe", upload, createRecipes);
RecipeRoutes.patch("/update_recipe/:id", upload, updateRecipes);
RecipeRoutes.delete("/delete_recipe/:id", deleteRecipes);

export default RecipeRoutes;
