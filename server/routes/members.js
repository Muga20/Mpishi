import express from "express";
import upload from "../middleware/imageupload.js";


import { 
    getAllMembers,
    getMembersById,
    updateMembers,
    deleteMembers,
    createMembers,
    logInMembers,
  
} from "../controllers/members.js";
 
const UsersRoutes = express.Router();
 
UsersRoutes.get('/', getAllMembers);
UsersRoutes.get('/:id', getMembersById);
UsersRoutes.post('/', upload,createMembers);
UsersRoutes.post('/login',logInMembers);
UsersRoutes.patch('/:id',upload, updateMembers);
UsersRoutes.delete('/:id', deleteMembers);
 
export default UsersRoutes;
