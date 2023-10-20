import "../resources/css/styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import "../resources/css/mainnavbar.css";
import Modal from "./Modal";
import { getUsersProtectionData } from "../config/CheckProtection";
import { api } from "../middleware/Api";
import { accessToken } from "../config/AccessToken";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [mustHaveEmail, setMustHaveEmail] = useState(false); // Initialize to false
  const [users, setUserData] = useState("");

  useEffect(() => {
    const fetchUserRoles = async () => {
      const roles = await getUsersProtectionData(); // Assuming getUsersProtectionData fetches user roles
      setUserRoles(roles);
    };

    const checkMustHaveEmail = () => {
      setMustHaveEmail(userRoles.includes("email"));
    };

    fetchUserRoles();
    checkMustHaveEmail();
  }, []);

 
  const getUsersData = async () => {
    try {
      const token = accessToken();

      const response = await api(
        `/members/get_single_user/${token}`,
        "GET",
        {},
        {}
      );

      setUserData(response.user);

    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

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
      <header className="main_header">
        <Link className="logo" to="/">
          MPISHI
        </Link>

        <nav className="main-navbar">
          <Link className="a active" to="/">
            Home
          </Link>

          {user && (
            <Link className="a" to="/recipes">
              Recipes
            </Link>
          )}

          {user && (
            <Link className="a" to="/list-category">
              Categories
            </Link>
          )}

          {user && email && (
            <Link className="a" to="/user-blogs">
              Blog
            </Link>
          )}

          {user && (
            <div>
              <Link className="a" onClick={openModal}>
                Search
              </Link>
              {showModal && <Modal closeModal={closeModal}></Modal>}
            </div>
          )}

          <div>
            <button className="select-btn" onClick={() => setOpen(!open)}>
              More Options
            </button>
            {open && (
              <ul className="drop-down-list">
                {user && email && (
                  <li className="drop-down-li">
                    <Link className="x" to="/">
                      Home
                    </Link>
                  </li>
                )}
                {user && user.role && (
                  <li className="drop-down-li">
                    <Link className="x" to="/recipe_data">
                      Admin
                    </Link>
                  </li>
                )}

                {user && email && (
                  <li className="drop-down-li">
                    <Link className="x" to="/about-user">
                      About
                    </Link>
                  </li>
                )}

                {user && email && (
                  <li className="drop-down-li">
                    <Link className="x" to={`/edit_profile/${user.id}`}>
                      Edit Details
                    </Link>
                  </li>
                )}
                <li className="drop-down-li">
                  <Link className="x" to="/contact">
                    Contact
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

          {mustHaveEmail && (
            <Link
              className="red-button"
              type="submit"
              to="/finish_account_setup"
            >
              Finish Setup
            </Link>
          )}
        </nav>

        <div className="icons">
          <nav className="navigation-list">
            <div className="dropdown">
              <div className="list-all">
                <i className="fas fa-bars"></i>
              </div>

              <div className="dropdown-content">
                {!user && (
                  <Link className="b" type="submit" to="/">
                    Home
                  </Link>
                )}
                {user && user.role && (
                  <Link className="b" to="/recipe_data">
                    Admin
                  </Link>
                )}
                {user && (
                  <Link className="b" type="submit" to="/users">
                    {user.username}
                  </Link>
                )}
                <Link className="b" to="/recipes">
                  Recipes
                </Link>
                {user && (
                  <Link className="b" to="/user-blogs">
                    Blog
                  </Link>
                )}
                <Link className="b" to="/contact">
                  Contact
                </Link>
                {!user && (
                  <Link className="b" type="submit" to="/login">
                    LogIn
                  </Link>
                )}
              </div>
            </div>
          </nav>

          {/**<a href="#" className="fas fa-heart"></a>*/}

          <div className="auth-Credentials">
            {user &&  (
              <Link className="user-names " type="submit" to="/users">
                <h4> {users.username}</h4>
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
