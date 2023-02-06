import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";
import "../resources/css/readrecipe.css";
import Navbar from "../layouts/Navbar";
import '../resources/css/recipecomments.css';
import NavbarTwo from "../Views/Navbar";
import SubFooter from "../Views/SubFooter";
import { UseAuthContext } from "../hooks/UseAuthContext";

function ShowCategory() {
    const { user } = UseAuthContext();
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [email, setEmail] = useState("");
    

    useEffect(() => {
        const fetchData = async () => {
            const { email } = JSON.parse(localStorage.getItem("user")) || {};
            setEmail(email);
        };
        fetchData();
    }, []);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        const res = await axios.get(`http://localhost:5000/category/${id}`);
        setCategory(res.data.category);
    };

    return (
        <div>
            {!email && (
                <div>
                    <NavbarTwo />
                </div>
            )}
            {email && (
                <div>
                    <Navbar />
                </div>
            )}
            <div className="Top_padding">
                <div className="recipe-read-menu">
                    <h1 className="heading"> Recipes </h1>
                    <div className="recipe-read-box-container">
                        {category.recipes &&
                            category.recipes.map((recipe, id) => (
                                <div className="recipe-read-box" key={id}>
                                    <div className="recipe-read-image">
                                        <img
                                            className="recipe-read-image"
                                            src={`http://localhost:5000/${recipe.image}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="recipe-content">
                                        {user && (
                                            <Link
                                                className="recipe-read-link"
                                                to={`/read_recipe/${recipe.id}`}
                                                onClick={() => localStorage.setItem("recipe", JSON.stringify(recipe))}
                                            >
                                                <span className="name-span">{recipe.name}</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <SubFooter />
            <Footer />
        </div>
    );
}

export default ShowCategory;


