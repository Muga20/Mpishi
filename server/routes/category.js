
import express from "express"; 
import upload from "../middleware/imageupload.js";
import { 
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,

   
  
} from "../controllers/category.js";
 
const CategoryRoutes = express.Router();
 
CategoryRoutes .get('/',   getAllCategory);
CategoryRoutes .get('/:id', getCategoryById);
CategoryRoutes .post('/',upload,createCategory);
CategoryRoutes .patch('/:id',upload,updateCategory);
CategoryRoutes .delete('/:id', deleteCategory);



 
export default CategoryRoutes;
