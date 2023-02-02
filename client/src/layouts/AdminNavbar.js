import "../resources/css/styles.css";
import React, { useState  ,useEffect} from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Modal from "../Views/Modal";


export default function Navbar() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);


  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const fetchData = async () => {
    const { email } = JSON.parse(localStorage.getItem("user"));
    setEmail(email );
    };
    fetchData();
    }, []);


  const handleClick = () => {
    logout();
    navigate("/");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className="Top_padding">
      <header className="main_header-admin">
        <Link className="logo" to="/">
          MPISHI
        </Link>

        <nav className="main-navbar">

        <Link className="a" onClick={() => window.history.back()}>
        Go Back
      </Link>
         
            <Link className="a" to="/recipe_data">
              Recipes
            </Link>
       
            <Link className="a" to='/category-list'>
              Categories
            </Link>
        
        
            <Link className="a" to="/comments">
              Comments
            </Link>
         
          {user && (
            <div>
              <Link className="a" onClick={openModal}>
                Search
              </Link>
              {showModal && <Modal closeModal={closeModal}></Modal>}
            </div>
          )}

      <div>
      <button className="select-btn" onClick={() => setOpen(!open)}>More Options</button>
      {open && (
        <ul className="drop-down-list">
          <li className="drop-down-li">
          <Link className="x" to='/'>
            Home
           </Link>
           </li>
           <li className="drop-down-li">
           <Link className="x" to='/blog-data'>
              Blogs
            </Link>
            </li>
            <li className="drop-down-li">
            <Link className="x" to="/reviews">
            Reviews
          </Link>
             </li>
             <li className="drop-down-li">
             <Link className="x" to='/add_recipe'>
               AddRecipe
              </Link>
              </li>
             <li className="drop-down-li">
             <Link className="x" to='/create_category'>
               CreateCategory
              </Link>
              </li>
              <li className="drop-down-li">
              {user && (
                <Link className="x" type="submit" onClick={handleClick}>
                  LogOut
                </Link>
              )}
               </li>
        </ul>
      )}
    </div>

        </nav>

        <div className="icons">
          <nav className="navigation-list">
            <div className="dropdown">
              <div className="list-all">
                <i className="fas fa-bars"></i>
              </div>

              <div className="dropdown-content">
              
              <Link className="b" to="/recipe_data">
              Recipes
            </Link>
       
            <Link className="b" to='/category-list'>
              Categories
            </Link>
        
        
            <Link className="b" to="/comments">
              Comments
            </Link>
         
          <Link className="b" to="/reviews">
            Reviews
          </Link>

          <Link className="b" to='/blog-data'>
          Blogs
           </Link>
              
              </div>
            </div>
          </nav>

          {/**<a href="#" className="fas fa-heart"></a>*/}

          <div className="auth-Credentials">

       

            {user &&  email && (
              <Link className="user-names " type="submit" to="/users">
                <h4> {user.username}</h4>
              </Link>
            )}

          </div>

          {!user && (
            <Link className="loginUser" type="submit" to="/login">
              LogIn
            </Link>
          )}

        </div>
      </header>

    </div>
  );
}
