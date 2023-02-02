import React from 'react'
import image from "../resources/images/about-img.png";
import "../resources/css/styles.css";
import { Link } from 'react-router-dom';


function About() {
  return (
    <div>
    
    <section class="about" id="about">

    <h3 class="sub-heading"></h3>
    <h1 class="heading"> why choose us? </h1>

    <div class="row">

        <div class="image">
            <img src={image} alt=""/>
        </div>

        <div class="content">
            <h3>Discover the world of cooking with Mpishi</h3>

            <p>Mpishi is a recipe website that offers a wide variety of delicious and easy-to-follow recipes for people of all cooking abilities. Our site features a wide range of cuisines from around the world, including African, Asian, European, and American dishes. Whether you're a beginner cook or a seasoned pro, you'll find something to love on our site.</p>

            <p>We understand that people have different dietary needs and preferences, so we've made sure to include a variety of recipes to suit everyone. You'll find options for vegetarians, vegans, and people with food allergies, as well as recipes that are gluten-free, low-carb, and low-fat.</p>
            
           <p>In addition to our recipe collection, we also offer cooking tips, food news, and other resources to help you become a better cook. Our team of experienced chefs and food writers are always on the lookout for the latest trends and techniques to share with our readers.
           </p>
            
            <p>At Mpishi, our goal is to make cooking fun, easy, and accessible for everyone. We hope that you'll find inspiration in our recipes and that they'll become a staple in your kitchen.</p>
           
            <Link to="/contact" class="btn">Contact Us </Link>
        </div>

    </div>

</section>
    
    
    
    </div>
  )
}

export default About