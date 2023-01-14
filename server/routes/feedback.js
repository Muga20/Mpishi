
import express from "express"; 
import { 
   sendEmail
  
} from "../controllers/contact.js";

const ContactRoutes = express.Router();

ContactRoutes .post('/', sendEmail);

export default ContactRoutes;

