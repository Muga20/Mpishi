import { UseAuthContext } from "../hooks/UseAuthContext";
import React from "react";
import "../resources/css/notification.css";
import Navbar from "../layouts/Navbar";
import "../resources/css/userdata.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Response() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { user } = UseAuthContext();

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/contact/response/${user.id}`
        );

        setMessages(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMessage();
  }, []);


    

  return (
    <div>
    <Navbar />

    <div className="top-notification-panel">
    {currentPosts.map((message) => (
    <div class="notification-container-admin" key={message.id}>
      <div class="notification-container">
        <img src={`http://localhost:5000/${message.member.image}`} alt="Avatar" />
        <h1>Name {message.member.first_name}</h1>
        <p> Message {message.message}</p>
        <span class="Reply-message">Reply</span>
        <span class="time-right">11:00</span>
      </div>
    </div>
    ))}
    </div>

    <Pagination
    postsPerPage={postsPerPage}
    totalPosts={messages.length}
    paginate={paginate}
    currentPage={currentPage}
  />
    
    
    
    </div>
  )
}

export default Response