import React from 'react'
import Navbar from '../Admin/Navbar'
import { useState, useEffect } from 'react'
import axios from "axios";


function Comments() {

  const [comments, setComments] = useState([]);
  
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

 <div className='flex-right-content'>


 <div class="table-wrapper" >
 <table className='fl-table'>
 <thead>
 <tr>
 <th></th>
 <th>Text</th>
 <th>From</th>


 
 </tr>
 </thead>
 <tbody>
 {comments.map((comment) => (
 <tr key={comment.id}>
 <td>{comment.id}</td>
 <td>{comment.text}</td>
 <td>{comment.member.first_name}</td> 
 
 </tr>
 ))}
 </tbody>
 </table>
</div>

    </div>
    </div>
  )
}

export default Comments