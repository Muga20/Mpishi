
import express from "express"; 
import upload from "../middleware/imageupload.js";
import { 
   sendEmail,
} from "../controllers/contact.js";

import {
      getAllFeedBack,
      getFeedBackById,
      createFeedBack,
      deleteFeedBack,
} from "../controllers/feedback.js";


const ContactRoutes = express.Router();

ContactRoutes .post('/', sendEmail);
ContactRoutes .get('/', getAllFeedBack);
ContactRoutes .get('/:id', getFeedBackById);
ContactRoutes .post('/', upload,createFeedBack);
ContactRoutes .delete('/:id', deleteFeedBack);



export default ContactRoutes;

