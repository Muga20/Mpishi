import express from "express";
import http from "http"; // Import the http module
import db from "./config/config.js";
import BlogRoutes from "./routes/blog.js";
import UsersRoutes from "./routes/members.js";
import RecipeRoutes from "./routes/recipe.js";
import CategoryRoutes from "./routes/category.js";
import CommentsRoutes from "./routes/comments.js";
import ContactRoutes from "./routes/feedback.js";
import AuthRoutes from "./routes/auth.js";
import cors from "cors";
import bodyParser from "body-parser";

// Create an Express application
const app = express();

// Provide a default port (e.g., 3000) if EXP_PORT is not defined
const PORT = process.env.EXP_PORT || 5000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Test DB connection
db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Serve static files from the React app
app.use("/Images", express.static("./Images"));

// Serve static files from the React app
app.use("/Images", express.static("./Images"));

app.use(cors());
app.use(bodyParser.json());
app.use("/members", UsersRoutes);
app.use("/blogs", BlogRoutes);
app.use("/recipe", RecipeRoutes);
app.use("/category", CategoryRoutes);
app.use("/comments", CommentsRoutes);
app.use("/contact", ContactRoutes);
app.use("/auth", AuthRoutes);
