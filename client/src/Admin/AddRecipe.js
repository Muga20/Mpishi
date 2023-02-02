import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; //import useNavigate
import axios from "axios";
import "../resources/css/recipe.css";
import Navbar from "../layouts/AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddRecipe() {
  const [name, setName] = useState("");
  const [cat_id, setCategory] = useState();
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [member_id, setMemberId] = useState("");
  const [cook_time, setCook_time] = useState("");
  const [about_the_recipe, setAbout_the_recipe] = useState("");
  const [serves, setServes] = useState("");
  const navigate = useNavigate(); //initialize useNavigate
  const inputRef = useRef(null);
  const [categories, setCategories] = useState([]); //initialize useRef

  //initialize useState

  function handleClick() {
    console.log(inputRef.current.value); //get value from inputRef
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setMemberId(user.id);
  }, []);

  useEffect(() => {
    // fetch the categories from an API or a database
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const recipe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cat_id", cat_id);
    formData.append("image", image);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("cook_time", cook_time);
    formData.append("about_the_recipe", about_the_recipe);
    formData.append("serves", serves);
    formData.append("member_id", member_id);

    await axios
      .post("http://localhost:5000/recipe", formData)

      .then((response) => {
        navigate("/recipe_data");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error("Missing Image which is a must  ");
        }
      });
  };
  return (
    <div>
      <Navbar />
   
      <div id="top_space2">
        <div className="user-info-body">
          <form method="post" onSubmit={recipe}>
            <div className="user-container-div-2">
              <div className="About">
                <ul>
                  <h1>Add Recipes </h1>
                </ul>

                <ul>
                  <h3>Names</h3>
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="Recipe Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <br />
                  <textarea
                    rows="4" 
                    cols="76" 
                    type="text"
                    className="user-inputs"
                    placeholder="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                <br/>
                  <select
                    className="gender"
                    onChange={(e) => setCategory(e.target.value)}
                    value={cat_id}
                  >
                    <option>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <br />
                  <textarea 
                    rows="4" 
                    cols="76" 
                    type="text"
                    className="user-inputs"
                    placeholder="Steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="cook_time"
                    value={cook_time}
                    onChange={(e) => setCook_time(e.target.value)}
                  />
                  <br />
                  <textarea
                    rows="4" 
                    cols="76" 
                    type="text"
                    className="user-inputs"
                    placeholder="about_the_recipe"
                    value={about_the_recipe}
                    onChange={(e) => setAbout_the_recipe(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    className="user-inputs"
                    placeholder="serves"
                    value={serves}
                    onChange={(e) => setServes(e.target.value)}
                  />

                </ul>
             

                <ul>
                  <h3>Image</h3>
                  <input
                    className="inputFile"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </ul>
                <ul>
                  <button className="button-add-recipe" type="submit">
                     Submit Details 
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
}

export default AddRecipe;
