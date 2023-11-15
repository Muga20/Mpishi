import React, { useState, useEffect } from "react";
import axios from "axios";
import "../resources/css/login.css";
import "../resources/css/userdata.css";
import Navbar from "../layouts/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HelpCenter() {
  const [setErrors] = useState(false); //initialize useNavigate
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [member_id, setMemberId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setMemberId(user.id);

    return () => {
      setMessage("");
      setImage(null);
    };
  }, []);

  const createMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);
    formData.append("member_id", member_id);

    try {
      const response = await axios.post(
        "http://localhost:5000/contact/help",
        formData
      );

      toast.success(
        "Your issue has been sent to the admin. We will get back to you as soon as possible. Thank you for your patience."
      );

      if (response.status === 200) {
        setMessage("");
        setImage(null);
        setErrors(false);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Try again later.");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div id="top_space2">
        <div className="user-info-body">
          <form method="post" onSubmit={createMessage}>
            <div className="user-container-div-2">
              <div className="About">
                <ul>
                  <h1>Whats your issue</h1>
                </ul>

                <ul>
                  <textarea
                    rows="4"
                    cols="76"
                    type="text"
                    className="user-inputs"
                    placeholder="Add your issue in this field and we will get back to you as soon as possible. you can also add a screenshot of the issue you are facing."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </ul>
                <ul>
                  <h3>Image</h3>
                  <input
                    className="inputFile"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </ul>
                <ul>
                  <button className="button-add-recipe" type="submit">
                    Submit
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default HelpCenter;
