import React from 'react'
import Navbar from '../layouts/AdminNavbar'
import { useState, useEffect } from 'react'
import axios from "axios";
import Paginate from '../pagination/Pagination.js';


function Comments() {

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  // Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = comments.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
const paginate = pageNumber => setCurrentPage(pageNumber);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
    
        const response = await axios.get(
          "http://localhost:5000/comments"
        );
    
        setComments(response.data);
      } catch (e) {
        console.log(e);
      }  
    };

    fetchUsers();
  }, []);

 
  return (
    <div>
    <Navbar />


    <div id="top_space">

 <div class="table-wrapper" >
 <table className='fl-table'>
 <thead>
 <tr>
 <th></th>
 <th>Text</th>
 <th>Recipe</th>
 <th>From</th>

 </tr>
 </thead>
 <tbody>

{
   currentPosts.map((comment) => (
    <tr key={comment.id}>
      <td>{comment.id}</td>
      <td>{comment.text}</td>
      <td>{comment.recipe.name}</td>
      <td>{comment.member.first_name}</td> 
    </tr>
   ))
}

 </tbody>
 </table>

  <Paginate 
  postsPerPage={postsPerPage} totalPosts={comments.length} paginate={paginate}  />

</div>

    </div>
    </div>
  
  )
}

export default Comments