import React, { useEffect, useState } from "react";
import "../resources/css/styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import "../resources/css/recipe.css";
import Navbar from "../Views/Navbar";




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
  const [member_id , setMember_id] = useState()
 
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(false); //in

  const getComments = async () => {
    let comments = await axios.get(`http://localhost:5000/comments/${id}`);
  };
  
  const createComment = async (e) => {
    e.preventDefault();
    try {
      if (
        await axios.post("http://localhost:5000/comments", {
          text: text,
           member_id:13
        })

      ) {
        setErrors(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors("Failed"); //send errors if email already exist
      }
    }
  };


  const geAllRecipe = async () => {
    const recipe = await axios.get(`http://localhost:5000/recipe/${id}`);
    setName(recipe.data.name);
    //setCategory(recipe.data.cat_name);
    setImage(recipe.data.image);
    setIngredients(recipe.data.ingredients);
    setSteps(recipe.data.steps);
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
    <div>
      <Navbar />

      <div className="Top_padding">
        <section className="about" id="about">
          <h1 className="heading"> {name}</h1>

          <div className="row" key={id}>
            <div className="image">
              <img
                className="recipe-image"
                src={`http://localhost:5000/${image}`}
                alt=""
                loading="lazy"
              />
            </div>

            <div className="content">
             
            {/* 
          
        
                <p className="category-paragraph">
                  <span className="SpanHeader">Category</span>
                  <br />
                  {cat_name}
                </p>
          
          
          */}
              <div className="category-and-cook">
                <div className="cook-paragraph-div">
                  <p className="cook-paragraph">
                    <span className="SpanHeader">Cook_time</span>
                    <br />
                    {cook_time}
                  </p>
                </div>

                <div className="cook-paragraph-div">
                <p className="cook-paragraph">
                  <span className="SpanHeader">Serves</span>
                  <br />
                  {serves}
                </p>
              </div>

              </div>
            </div>
          </div>
        </section>

        <div className="ingredients-div-start ">
          <div className="content-body">
            <p className="Paragraph">
              <span className="SpanHeader">Ingredients</span>
              <br />
              {ingredients}
            </p>
          </div>
        </div>

        <div className="ingredients-iv-start ">
          <div className="content-body">
            <div>
              <p className="Paragraph">
                <span className="SpanHeader">Steps</span>
                <br />
                {steps}
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
              {about_the_recipe}
            </p>
          </div>
        </div>
      </div>


        <form onSubmit={createComment}> 
        <div className="input-for-comments-div">
        <h2 className="comments">Leave a comments about this meal </h2>
         <div className="input-for-comments-div-two">
        <textarea rows="4" cols="78.5" className="input-for-Comment"   type="text"  placeholder="Type here" 
         value={text}  onChange={(e) => setText(e.target.value)}/>
         </div>
          <div className="input-for-comments-div-three">
          <button className="button-for-comments" >Submit</button>
          </div>
        </div>
        </form>


        <Footer />
      </div>
    </div>
  );
}

export default ReadRecipe;
