
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
      getAdminResponseById,
      createResponse
} from "../controllers/feedback.js";


const ContactRoutes = express.Router();

ContactRoutes .post('/', sendEmail);
ContactRoutes .get('/', getAllFeedBack);
ContactRoutes .get('/:id', getFeedBackById);
ContactRoutes .post('/help/', upload,createFeedBack);
ContactRoutes .delete('/:id', deleteFeedBack);
ContactRoutes .post('/response/', createResponse);
ContactRoutes .get('/response/:id', getAdminResponseById);



export default ContactRoutes;

