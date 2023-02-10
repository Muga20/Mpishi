import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import "../resources/css/readrecipe.css";
import Navbar from "../layouts/Navbar";
import WriteComment from "./WriteComment";
import cooking from "../resources/images/cooking.png";
import '../resources/css/recipecomments.css';
import NavbarTwo from "../Views/Navbar";
import Drinks from "../resources/images/menu-3.jpg";



function ReadRecipe() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [cook_time, setCook_time] = useState("");
  const [about_the_recipe, setAbout_the_recipe] = useState("");
  const [instructions, setInstructions] = useState("");
  const [comments, setComments] = useState([]);
  const [serves, setServes] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { first_name , email} = JSON.parse(localStorage.getItem("user"));
      setFirst_name(first_name);
      setEmail(email);
    };
    fetchData();

  }, []);

  const geAllRecipe = async () => {
    const recipe = await axios.get(`http://localhost:5000/recipe/${id}`);
    setName(recipe.data.name);
    setImage(recipe.data.image);
    setIngredients(recipe.data.ingredients);
    setInstructions(recipe.data.instructions);
    setCook_time(recipe.data.cook_time);
    setAbout_the_recipe(recipe.data.about_the_recipe);
    setServes(recipe.data.serves);
    setComments(recipe.data.comments);
  };
  useEffect(() => {
    geAllRecipe();
  });

  return (
    <div className="">
       {!email && (
         <div>
           <NavbarTwo />
          </div>
        )}

        { email && (
          <div>
         <Navbar />
          </div>
        )}

        <div className="recipe-top-div"> 
        <div class="read-recipe-content">
        <div class="recipe-name-section">
            <h1 className="recipe-name-section-name"> Hello {first_name} </h1>
        </div>
       
        <article>
            <div className="recipe-about ">
            <p><span className="recipe-about-span">{name},</span> {about_the_recipe}.</p>
            </div>
         
            <p><img src={`http://localhost:5000/${image}`}/></p>
 
            <br/>
         
            <h1>Ingredients</h1>
            <p className="recipe-ingredients">{ingredients}.</p>

            <br/>

            <h1>Steps</h1>
            <p className="recipe-steps"><span className="steps-span">First </span>{instructions}.</p>
            <br/>
            <p><img className="cooking" src={cooking}/></p>


            {! email && (
              <div>
              <p className="see-comments-error">Please Finish Account SetUp See Comments</p>
              </div>
           )}
           
            {email && (
            <div class="comments-container">
            <h1> Comments on this Recipes</h1>
 
               {comments.map((comment, id) => (
            <ul id="comments-list" class="comments-list" key={comment.id}>
              <li>
                <div class="comment-main-level">
                
                  <div class="comment-box">
                    <div class="comment-head">
                     {/** 
                     <h6 class="comment-name by-author"><a href="http://creaticode.com/blog"></a></h6>
                     */}               
                      <span>{(() => {
                        const now = new Date();
                        const today = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate()
                        ).getTime();
                        const yesterday = today - 86400000; // 24 hours in milliseconds
                        const commentDate = new Date(comment.createdAt).getTime();
                        if (commentDate >= today) {
                          return "Today";
                        } else if (commentDate >= yesterday) {
                          return "Yesterday";
                        } else if (commentDate < yesterday) {
                          return "Many Days Ago";
                        }else{
                          return comment.createdAt;
          
                        }
                      })()} </span>
                    </div>
                    <div class="comment-content">
                        {comment.text}
                    </div>
                  </div>
                </div>
              </li>
        
            </ul>
            ))}
          </div>
          )}
            
     
        </article>

        <aside>
        <img className="aside-image" src={Drinks}/>

        <div>
          <h1 className="aside-h1">Cooking Time</h1>
          <p className="aside-p">About {cook_time} </p>

          <h1 className="aside-h1">Serves</h1>
          <p className="aside-p">Up to {serves} Persons</p>
        
        </div>
        <br/>
       {! email && (
          <div>
          <p className="write-comments-error">Please Finish Account SetUp to comment</p>
          </div>
       )}
       

        {email && (
          <div>
         
          <WriteComment/>
          </div>
        )}
       


       </aside>
        </div>

      

        </div>
        <Footer />
      </div>


      
    
  );
}

export default ReadRecipe;
