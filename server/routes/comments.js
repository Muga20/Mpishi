
import express from "express"; 

import { 
    getAllComments,
    createComments,
    getCommentsById,
    updateComments,
    deleteComments,
   
  
} from "../controllers/comments.js";
 
const CommentsRoutes = express.Router();
 
CommentsRoutes .get('/',   getAllComments);
CommentsRoutes .get('/:id', getCommentsById);
CommentsRoutes .post('/', createComments);
CommentsRoutes .patch('/:id', updateComments);
CommentsRoutes .delete('/:id', deleteComments);
 
export default CommentsRoutes;
