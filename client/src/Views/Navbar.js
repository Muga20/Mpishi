import React from 'react'
import '../resources/css/styles.css'
import { Link } from 'react-router-dom'
import {UseAuthContext} from  '../hooks/UseAuthContext'
import {useNavigate} from 'react-router-dom'


export default function Navbar() {

  const  navigate = useNavigate();
  const {user} = UseAuthContext()
  const {dispatch} = UseAuthContext()

    const logout = () => {
        // remove use from localStorage 
         localStorage.removeItem('user')
        //  dispatch log out action 
        dispatch({type:'LOGOUT'})
    }

  const handleClick = () => {
    logout()
    navigate('/')
  }

  

  return (
  
    <div className='Top_padding'>

    <header className='main_header'>
    <Link className=" logo" to="/"><i className="fas fa-pot-food"></i>MPISHI</Link>
    <nav className="navbar">
       <Link className="a active" to="/">Home</Link>
       <Link className="a" to="/recipedata">Admin</Link>
       <Link className="a" to="/recipes">Recipes</Link>
       <Link className='a' to="/category">Categories</Link>
       <Link className='a' to="/contact">Contact</Link>

    </nav>

    <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
         
        {/**<a href="#" className="fas fa-heart"></a>*/}

         { user && (
          <Link className="logout-btn" type='submit' onClick={handleClick} >LogOut</Link>
          )}

          { user && (
            <Link  to="/users"  type='submit' className='user-profile'>
            <img className="user-profile-pic" src={`http://localhost:5000/${user.user.image}`}alt="" />
            </Link> 
          )}

         {!user && (  
         <Link className="" type='submit' to="/login"  onClick={handleClick} >LogIn</Link>
         )}
      
     </div>
    
</header>

<form action="" id="search-form">
    <input type="search" placeholder="search here..." id="search-box"/>
    <label htmlFor="search-box" className="fas fa-search"></label>
    <i className="fas fa-times" id="close"></i>
</form> 
    </div>
  )
}
