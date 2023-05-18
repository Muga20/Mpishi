import React from "react";
import "../resources/css/userdata.css";
import Navbar from '../layouts/AdminNavbar'
import { useState, useEffect } from "react";
import axios from "axios";
// import Pagination from "../pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";

function Reply() {
    const { id } = useParams();
    const [message, setMessage] = useState([]);
    const [member_id, setMemberId] = useState(null);
    const [feedback_id, setFeedbackId] = useState(id);
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();
  

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setMemberId(user.id);
      }, []);
    
      const createReply = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post("http://localhost:5000/contact/response", {
            message: message,
            member_id: member_id,
            feedback_id: feedback_id,
          });
           //navigate("notification");
            setMessage(data);
        } catch (e) {
            setErrors(e.response.data);
        }
        };
    
    
    
  return (
    <div>
    
    <div>
    <Navbar />

    <div id="top_space2">
      <div className="user-info-body">
        <form method="post" onSubmit={createReply}>
          <div className="user-container-div-2">
            <div className="About">
              <ul>
                <h1>Replying</h1>
              </ul>

              <ul>
                <input
                  type="text"
                  className="user-inputs"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </ul>
              <ul>
                <button className="button-add-recipe" type="submit">
                  Send message to user
                </button>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
    
    
    </div>
  )
}

export default Reply