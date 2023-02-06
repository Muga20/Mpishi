import React from 'react'
import { Link } from 'react-router-dom';
import "../resources/css/styles.css";


function SubFooter() {
  return (
    <div>
    
    <section class="sub-footer">

    <div class="box-container">

        <div class="box">
            <h3>quick links</h3>
            <Link className='a' to="/" ></Link>
            <Link className='a' to="/recipes" >Recipe</Link>
            <Link className='a' to="/contact" >Contact</Link>
            <Link className='a' to="/list-category" >Category</Link>
            <Link className='a' to="/user-blogs" >Blogs</Link>
          


          
        </div>

        <div class="box">
            <h3>contact info</h3>
            <Link className='a' to="" >Not yet Hosted</Link>
           
        </div>

        <div class="box">
            <h3>follow us</h3>
            <Link className='a' to="" >Twitter</Link>
            <Link className='a' to="" >LinkedIn</Link>
            <Link className='a' to="" >Instagram</Link>

          
        </div>

    </div>

</section>

    
    
    </div>
  )
}

export default SubFooter