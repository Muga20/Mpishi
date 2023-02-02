import express from "express"; 
import upload from "../middleware/imageupload.js";
import { 
    getAllBlogs,
    createBlogs,
    getBlogsById,
    updateBlogs,
    deleteBlogs,
    createBlogsComment,
    getEachMembersBlogs,
    getCommentsInBlogs
    
} from "../controllers/blog.js";
 
const BlogRoutes = express.Router();
 
BlogRoutes.get('/', getAllBlogs);
BlogRoutes.get('/:id',  getBlogsById);
BlogRoutes.post('/', upload,createBlogs);
BlogRoutes.patch('/:id', updateBlogs);
BlogRoutes.delete('/:id', deleteBlogs);
BlogRoutes.post('/comment', createBlogsComment);
BlogRoutes.get('/member/:id', getEachMembersBlogs);
BlogRoutes.get('/comment/:id', getCommentsInBlogs);

 
export default BlogRoutes;
