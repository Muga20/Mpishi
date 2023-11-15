import express from "express";
import upload from "../middleware/imageUpload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getAllRecipes,
  createRecipes,
  getRecipesById,
  updateRecipes,
  deleteRecipes,
} from "../controllers/recipe.js";

const RecipeRoutes = express.Router();

RecipeRoutes.get("/", getAllRecipes);
RecipeRoutes.get("/:id", getRecipesById);
RecipeRoutes.post("/", verifyToken, upload, createRecipes);
RecipeRoutes.patch("/:id", upload, updateRecipes);
RecipeRoutes.delete("/:id", deleteRecipes);


export default RecipeRoutes;
