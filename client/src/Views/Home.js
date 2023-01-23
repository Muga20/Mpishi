
import "../resources/css/styles.css";
import image1 from "../resources/images/home-img-1.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Views/Navbar.js";
import Footer from "../Views/Footer.js";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import About from "../pages/About";
import SubFooter from "./SubFooter";

function Home() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [data, setData] = useState([]);


  const logout = () => {
    // remove use from localStorage
    localStorage.removeItem("user");
    //  dispatch log out action
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };


  useEffect(() => {
    getRecipe();
  }, [data]);

  const getRecipe = async () => {
    const res = await axios.get("http://localhost:5000/recipe");
    setData(res.data);
   
  };
  

  function onLinkClick(e) {
    e.preventDefault();
    // further processing happens here
 }
  return (
    <div>
      <Navbar />

      <section className="home" id="home">
        <div className="swiper-container home-slider">
          <div className="swiper-wrapper wrapper">
            <div className="swiper-slide slide">
              <div className="content">
               
                <h3>spicy noodles</h3>
                <p>
                  These spicy chili garlic noodles are ready in about 15 minutes
                  and FULL of flavor. They’re gluten free and vegan but
                  delicious with some extra stir fried veggies and your choice
                  of protein!
                </p>
              </div>
              <div className="image">
                <img src={image1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

    <section className="dishes" id="dishes">
    <h1 className="heading"> Recipe </h1>  
    <div className="box-container">

    {Array.isArray(data)

      ? data.slice(0, 3).map((recipeItem, id) => (

        <div className="image-box" key={id}>

        <img src={`http://localhost:5000/${recipeItem.image}`} alt="" />
          
        <h3>{recipeItem.name}</h3>
          <div className="rating">
            <h3 className="rating_text">Rating</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
          {user && (
            <Link
              className="btn"
            
              to={`/read_recipe/${recipeItem.id}`}
              onClick={() => localStorage.setItem(recipeItem._id)}
            >
            <i class="fa-solid fa-bowl-food"></i>
            </Link>
          )}
          

        </div>
       
      )):null}
    </div>
  </section>

  {/** About page is Added here */}
      <About />


  {/** Sub Footer is added here */}
     <SubFooter />

  {/** Footer is added here  */}  
      <Footer />


    </div>
  );
}

export default Home;


