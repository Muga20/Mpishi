import express from "express";
import upload from "../middleware/imageUpload.js";
import { verifyToken } from "../middleware/auth.js";

import {
  getAllMembers,
  getMembersById,
  // updateMembers,
  deleteMembers,
  updatingMembersDetails,
  getPermissions,
} from "../controllers/members.js";

const UsersRoutes = express.Router();

UsersRoutes.get("/", getAllMembers);
UsersRoutes.get("/get_single_user/:id", verifyToken, getMembersById);
// UsersRoutes.patch("/:id", upload, updateMembers);
UsersRoutes.delete("/:id", verifyToken, deleteMembers);
UsersRoutes.patch("/update/:id", verifyToken, upload, updatingMembersDetails);
UsersRoutes.get("/get_permissions/:id", verifyToken, getPermissions);

export default UsersRoutes;
