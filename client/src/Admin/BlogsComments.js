import Navbar from '../User/Navbar'
import '../resources/css/readblog.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from '../client/CommentsModal';
import { FaRegCommentAlt } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

function BlogsComments() {

  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [showComment, setShowComment] = useState(false);

   useEffect(() => {
    const fetchBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/blogs/comment/${id}`);
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchBlog();
}, [id]);


  return (
    <div>BlogsComments</div>
  )
}

export default BlogsComments