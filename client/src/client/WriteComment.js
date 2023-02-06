import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../resources/css/recipe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../resources/css/readrecipe.css";

function WriteComment() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [member_id, setMemberId] = useState("");
  const [recipe_id, setRecipeId] = useState(id);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setMemberId(user.id);
  }, []);

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/comments", {
        text: text,
        member_id: member_id,
        recipe_id: recipe_id,
      });
      toast.success("Comment created successfully");
      if (data) {
        setErrors(false);
        setText("");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors("Failed to create comment");
      }
    }
  };

  return (
    <div>
      <form onSubmit={createComment}>
          <textarea
            rows="4"
            cols="78.5"
            className="input-for-recipe-Comment"
            type="text"
            placeholder="Leave a comment about this recipe here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

     
            <button className="button-for-recipe-comments">Submit</button>
        
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default WriteComment;
