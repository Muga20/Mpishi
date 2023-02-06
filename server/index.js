import  express  from "express";
import  db  from "./config/config.js";
import  BlogRoutes from "./routes/blog.js";
import  UsersRoutes  from "./routes/members.js";
import  RecipeRoutes from "./routes/recipe.js";
import CategoryRoutes from "./routes/category.js"
import CommentsRoutes from "./routes/comments.js"
import ContactRoutes from "./routes/feedback.js";


import cors from 'cors'

// await db.sync()


const app = express();
try {
  db.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(5000, () => console.log('Example app listening on port 5000'));
} catch (error) {
   console.log("Unable to connect to the database:");
}

app.use(express.json());
app.use('/Images', express.static('./Images'))



  app.use(cors())
  app.use('/members', UsersRoutes);
  app.use('/blogs' , BlogRoutes);
  app.use('/recipe',RecipeRoutes );
  app.use('/category' , CategoryRoutes);
  app.use('/comments' , CommentsRoutes); 
  app.use('/contact' , ContactRoutes);



// app.use("/" ,(req,res) =>{
//   res.sendFile(__dirname + '/index.ejs')
// })