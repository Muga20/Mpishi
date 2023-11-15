import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "../resources/css/comments.css";

function CommentsModal({ closeComment, children }) {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [comment_text, setCommentText] = useState("");
  const [member_id, setMemberId] = useState("");
  const [comment_id, setCommentId] = useState("");
  const [blog_id, setBlogId] = useState(id);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setMemberId(user.id);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/blogs/comment", {
        comment_text: comment_text,
        member_id: member_id,
        blog_id: blog_id,
        comment_id: comment_id,
      });
      toast.success("Comment created successfully");
      if (data) {
        setErrors(false);
        setCommentText("");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Failed to create comment");
      }
    }
  };

  return (
    <div>
      <div className="modal-body">
        <div className="modal-content">
          <button className="modal-content-button" onClick={closeComment}>
            {" "}
            <AiOutlineCloseCircle />{" "}
          </button>
          {children}
        </div>

        <h1>
          Write your comment
          <br />
          toward {blogs.member && blogs.member.first_name}'s Article
        </h1>

        <form onSubmit={createComment}>
          <label className="comments-label">
            Write your views toward this article{" "}
          </label>

          <div className="comments-form-control-div">
            <textarea
              class="comments-form-control"
              rows="5"
              cols="60"
              placeholder="Enter text to comment"
              value={comment_text}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>

          <div className="comments-form-control-div-button">
            <button className="comments-form-control-button">Submit</button>
          </div>
        </form>
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
    </div>
  );
}

export default CommentsModal;
