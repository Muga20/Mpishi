import React, { useState ,useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "../resources/css/login.css";
import "../resources/css/userdata.css";
import Navbar from '../layouts/AdminNavbar'
import Pagination from "../pagination/Pagination";




function CreateCategory() {

  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);


  // Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = category.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

const getCategory = async () => {
    const response = await axios.get('http://localhost:5000/category');
    setCategory(response.data);
   
}

const deleteCategory = async (id) => {

  await axios.delete(`http://localhost:5000/category/${id}`);
  getCategory();
}

useEffect(() => {
  getCategory();
}, []);


  return (
    <div>

      <Navbar />

     

    
      <div id="top_space">
    <div className="table-wrapper" >
    <table className='fl-table'>
    <thead>
    <tr>
    <th></th>
    <th>image</th>
    <th className="category-create">Category</th>
    <th>Action</th>
   
    </tr>
    </thead>
    <tbody>
    { currentPosts.map((categories, index) => (
      <tr key={categories.id}>
      <td>{index + 1}</td>
      <td><img className="recipe-image-show" src={`http://localhost:5000/${categories.image}`} alt="recipe" width="100" height="100" /></td>
      <td>{categories.name}</td>



      <div className="actions"> 
      <td  className="edit-button">
      <Link className="links-to-recipe"  to={`/edit_category/${categories.id}`}  >Edit</Link>
  
      </td>
  
      <td className="delete-button">
      <Link className="links-to-recipe"   onClick={ () => deleteCategory(categories.id) }  >Delete</Link>
      </td>
  
      </div>


    </tr>
    ))}
    </tbody>
    </table>

    <Pagination postsPerPage={postsPerPage} totalPosts={category.length} paginate={paginate} currentPage={currentPage} />


</div>
    </div>
    </div>
   
  );
}

export default CreateCategory;
