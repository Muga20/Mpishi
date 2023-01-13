import "../resources/css/userinfo.css";
import Navbar from "../Views/Navbar";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {UseAuthContext} from  '../hooks/UseAuthContext'
import Footer from "../Views/Footer";

function Users() {

  const  navigate = useNavigate();
  const {user} = UseAuthContext()
  const {dispatch} = UseAuthContext()
  const [image , setImage] =useState('')
  const { id } = useParams();

    const logout = () => {
        // remove use from localStorage 
         localStorage.removeItem('user')
        //  dispatch log out action 
        dispatch({type:'LOGOUT'})
    }

    const createProfile = async (e) => {
      e.preventDefault();
      const formData = new FormData()
  
      formData.append('image', image)
  
          await axios.post("http://localhost:5000/members", formData)
  
    };

  const handleClick = () => {
    logout()
    navigate('/')
  }

  return(
    <div>
    <Navbar />
   <div className="body">
    <div class="user-container">
       <div className="user-container-div-1">
       <div class="box">
       <img src={`http://localhost:5000/${user.user.image}`} alt="" ></img>
       <form method="post" onSubmit={createProfile}>
       <input className="inputFile" type="file" onChange={(e) => setImage(e.target.files[0])} />
       <br/>
       <button type="submit" >add</button>
       </form>
       <ul className="unlist">
           <li>{user.user.first_name}</li>
           <li>{user.user.last_name}</li>
       </ul>
       </div>
       </div>
       <div className="user-container-div-2">
       <div class="About">
       <ul>
           <h1>about</h1>
       </ul>
       <ul>
           <h3>Gender</h3>
           <li>male</li>
       </ul>
     
       <ul>
           <h3>More Info</h3>
           <p>
               (injected humour and the like).</p>
       </ul>
       <ul>
           <h3>Contact</h3>
           <li>{user.user.email}</li>
       </ul>
       <ul>
       <Link to= {`/edit_profile/${user.user.id}`} className="edit_profile">
       <i class="fa-solid fa-user-pen">
       </i></Link> 
       </ul>
   </div>
       
       </div>
       
    </div>
    </div>

    <Footer />
    </div>
  )

  // return (
  //   <div>
  //    
  //     <div className="review-profile">
  //       <section class="review-profile">
  //         <div class="swiper-wrapper-">
  //           <div class="user-info-image">
  //             <img className="user-info-image-pic" src={`http://localhost:5000/${user.user.image}`}alt="" />
  //           </div>
  //           <br/>
  //           <div class="user-info-name">
  //             <h3>{user.user.first_name}</h3>
  //             <h3>{user.user.last_name} </h3>
  //           </div>
  //           <div className="user-email">
  //              <h3>{user.user.email}</h3>
  //           </div>
  //           <div className="user-info-button">
  //           {/*
  //            <Link to="/delete_account" className="delete_account"><i class="fa-solid fa-trash"></i></Link>
  //            <Link to="/change_password" className="change_password"><i class="fa-solid fa-key"></i></Link>
  //           */}
          
  //           <Link to= {`/edit_profile/${user.user.id}`} className="edit_profile"><i class="fa-solid fa-user-pen"></i></Link>  
         
            
  //         </div>
  //         </div>
  //       </section>
  //     </div>
  //   </div>
  //);
}

export default Users;
