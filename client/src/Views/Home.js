import React, { useEffect, useState } from "react";
import "../resources/css/styles.css";
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
  const { user, dispatch } = UseAuthContext();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const { email } = JSON.parse(userData);
        setEmail(email);
      }

      const res = await axios.get("http://localhost:5000/recipe");
      const shuffledData = res.data.sort(() => 0.5 - Math.random());
      setData(shuffledData);
    };

    fetchData();
    const interval = setInterval(fetchData, 180000); // 180000 milliseconds = 3 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      <section className="home" id="home">
        <div class="swiper-container home-slider">
          <div class="swiper-wrapper wrapper">
            <div class="swiper-slide slide">
              <div class="content">
                <h3>Mpishi Recipe</h3>
                <p>
                  Mpishi is a recipe website that offers a wide variety of
                  delicious and easy-to-follow recipes for people of all cooking
                  abilities. Whether you're a beginner cook or a seasoned pro,
                  you'll find something to love on our site
                </p>
              </div>
              <div class="image"></div>
            </div>
          </div>
        </div>
      </section>

      <About />

      <section className="dishes" id="dishes">
        <h1 className="heading">Recipe</h1>
        <div className="box-container">
          {data.slice(0, 12).map((recipeItem, id) => (
            <div className="image-box" key={id}>
              <img src={recipeItem.image} alt="recipe" />
              <div className="content">
                <h3>{recipeItem.title}</h3>
                <p>{recipeItem.description}</p>
                <Link to={`/read_recipe/${recipeItem.id}`} className="btn">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Blog />

      <SubFooter />
      <Footer />
    </div>
  );
}

export default Home;
