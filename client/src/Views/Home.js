
import "../resources/css/styles.css";
import image1 from "../resources/images/home-img-3.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Views/Navbar.js";
import Footer from "../Views/Footer.js";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import About from "../client/About";
import SubFooter from "./SubFooter";
import Blog from "../Admin/Blog";

function Home() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const logout = () => {
    // remove use from localStorage
    localStorage.removeItem("user");
    //  dispatch log out action
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
    const { email } = JSON.parse(localStorage.getItem("user"));
    setEmail(email );
    };
    fetchData();
    }, []);

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/recipe");
    const shuffledData = res.data.sort(() => 0.5 - Math.random());
    setData(shuffledData);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 180000); // 180000 milliseconds = 3 minutes
  
    return () => clearInterval(interval);
  }, []);
  


  return (
    <div>
      <Navbar />

      <section className="home" id="home">
        <div className="swiper-container home-slider">
          <div className="swiper-wrapper wrapper">
            <div className="swiper-slide slide">
              <div className="content">
               
                <h3>Mpishi Recipe</h3>
                <p>
                Mpishi is a recipe website that offers a wide variety of delicious and easy-to-follow recipes for people of all cooking abilities. Whether you're a beginner cook or a seasoned pro, you'll find something to love on our site
                </p>
              </div>
              <div className="image">
               
              </div>
            </div>
          </div>
        </div>
      </section>

    
    <section className="dishes" id="dishes">
    <h1 className="heading"> Recipe </h1>  
    <div className="box-container">

    {data.slice(0, 12).map((recipeItem, id) => (

        <div className="image-box" key={id}>

        <img src={`http://localhost:5000/${recipeItem.image}`} alt="" />
          
        <h3>{recipeItem.name}</h3>
        

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
       
      ))}
    </div>
  </section>

  {/** About page is Added here */}
      <About />

  {/** Blog page is added here */}
       <Blog />
       
  {/** Sub Footer is added here */}
     <SubFooter />

  {/** Footer is added here  */}  
      <Footer />


    </div>
  );
}

export default Home;


