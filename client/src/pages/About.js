import React from 'react'
import image from "../resources/images/about-img.png";
import "../resources/css/styles.css";


function About() {
  return (
    <div>
    <section class="about" id="about">

    <h3 class="sub-heading"> about us </h3>
    <h1 class="heading"> why choose us? </h1>

    <div class="row">

        <div class="image">
            <img src={image} alt=""/>
        </div>

        <div class="content">
            <h3>best food in the country</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
           
            <a href="#" class="btn">Contact Us </a>
        </div>

    </div>

</section>
    
    
    
    </div>
  )
}

export default About