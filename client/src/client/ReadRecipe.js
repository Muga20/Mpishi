import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import "../resources/css/recipe.css";
import Navbar from "../Views/Navbar";
import Comment from  "../Admin/Comments";




function ReadRecipe() {
  const { id } = useParams();
  const [name, setName] = useState("");
 //const [cat_name, setCategory] = useState();
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [cook_time, setCook_time] = useState("");
  const [about_the_recipe, setAbout_the_recipe] = useState("");
  const [serves, setServes] = useState("");

  const [errors, setErrors] = useState(false); //in



  const geAllRecipe = async () => {
    const recipe = await axios.get(`http://localhost:5000/recipe/${id}`);
    
    setName(recipe.data.name);
    setImage(recipe.data.image);
    setIngredients(recipe.data.ingredients);
    setSteps(recipe.data.steps.split(',')); // split the steps by ',' 
    setCook_time(recipe.data.cook_time);
    setAbout_the_recipe(recipe.data.about_the_recipe);
    setServes(recipe.data.serves);
 

  };
  useEffect(() => {
    geAllRecipe();
  });

  // function refreshPage() {
  //   window.location.reload(false);
  // }



  return (
    <div className="yy">
      <Navbar />

        <section className="read-about">
          <h1 className="heading"> {name}</h1>


          <div className="read-row" key={id}>


            <div className="recipe-read-image">
              <img
                className="read-recipe-image"
                src={`http://localhost:5000/${image}`}
                alt=""
                loading="lazy"
              />
            </div>

            <div className="list-content">
             
            {/* 
          
        
                <p className="category-paragraph">
                  <span className="SpanHeader">Category</span>
                  <br />
                  {cat_name}
                </p>
          
          
          */}
            

          <div className="category-and-cook">
          
          <div className="cook-paragraph-div">
            <p className="cook-paragraph-">
              <span className="SpanHeader">Cook_time</span>
              <br />
              <h2> {cook_time} </h2>
             
            </p>
          </div>

          <div className="cook-paragraph-div">
          <p className="cook-paragraph">
            <span className="SpanHeader">Serves</span>
            <br />
            <h2>  {serves} </h2>
          
          </p>
        </div>

        </div>

            </div>
          </div>
        </section>

        <div className="back-ground-col">    
         <div className="ingredients-div-start ">
          <div className="content-body">
            <p className="Paragraph">
              <span className="SpanHeader">Ingredients</span>
              <br />
              <p>{ingredients}</p>
            </p>
          </div>
        </div>

        <div className="ingredients-iv-start-two">
          <div className="content-body">
            <div>
              <p className="Paragraph">
                <span className="SpanHeader">Steps</span>
                <br />
                  <p> {  steps  }</p>
               
              </p>
            </div>
          </div>
        </div>


        <div className="abuts-iv-start ">
        <div className="content-body">
          <div>
            <p className="Paragraph">
              <span className="SpanHeader">About the Recipe</span>
              <br />
              <p>{about_the_recipe}</p>
              
            </p>
          </div>
        </div>
      </div>


       <Comment />
         </div>

       

        <Footer />
      </div>
    
  );
}

export default ReadRecipe;
