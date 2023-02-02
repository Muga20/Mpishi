import "../resources/css/styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import  "./usernav.css";
import Modal from "../Views/Modal";


export default function Navbar() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);


  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { first_name, id } = JSON.parse(localStorage.getItem("user"));
      setFirst_name(first_name);
      setId(id);
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
      <header className="main_header-user">
        <Link className="logo" to="/">
          MPISHI
        </Link>

        <nav className="main-navbar">
          <Link className="a" onClick={() => window.history.back()}>
            Go Back
          </Link>
          <Link className="a" to="/users">
            {first_name}
          </Link>

          {/* 
            <Link className="a" to='/comment-list'>
              Comments
            </Link>
        */}

          <Link className="a" to="/user-blogs">
            Blogs
          </Link>

          <Link className="a" to="/my-blogs/">
            MyPost's
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
               <Link className="x" to="/about-user">
               About
             </Link>
                </li>
               
                 <li className="drop-down-li">
                 <Link className="x" to='/add-blog'>
                  CreateBlog
                  </Link>
                  </li>
                  <li className="drop-down-li">
                  <Link className="x" to={`/edit_profile/${user.id}`}>
                   Edit Details 
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
                <Link className="b active" to="/">
                  Home
                </Link>

                <Link className="b" to="/users">
                  {user.first_name}
                </Link>

                {/* 
            <Link className="a" to='/comment-list'>
              Comments
            </Link>
        */}

                <Link className="b" to="/user-blogs">
                  Blogs
                </Link>

                <Link className="b" to="/my-blogs/:id">
                  MyPost's
                </Link>

                <Link className="b" to="/about-user">
                  About
                </Link>
              </div>
            </div>
          </nav>

          {/**<a href="#" className="fas fa-heart"></a>*/}

        </div>
      </header>
    </div>
  );
}
