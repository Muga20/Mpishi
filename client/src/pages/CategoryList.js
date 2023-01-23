import React, { useState ,useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "../resources/css/login.css";
import { UseAuthContext } from "../hooks/UseAuthContext";
import "../resources/css/userdata.css";
import Navbar from "../Admin/Navbar";




function CreateCategory() {

  const [category, setCategory] = useState([]);
  const [ setErrors] = useState(false); //initialize useNavigate
  const { user } = UseAuthContext();

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

      <div className="flex-right-content">
    
    <div className="table-wrapper" >
    <table className='fl-table'>
    <thead>
    <tr>
    <th></th>
    <th>image</th>
    <th className="category-create">Category</th>
    <th>Action</th>
    <th>

    <Link to={'/create_category'} >AddCat</Link>
    </th>
    </tr>
    </thead>
    <tbody>
    { category.map((categories, index) => (
      <tr key={categories.id}>
      <td>{index + 1}</td>
      <td><img className="recipe-image-show" src={`http://localhost:5000/${categories.image}`} alt="recipe" width="100" height="100" /></td>
      <td>{categories.name}</td>
      <td className="actions-create">
      <div>
      <Link  to={`/edit_category/${categories.id}`} className="edit-button-create" type="submit"><i className="fa-solid fa-pen-to-square"></i></Link>
      </div>
       <div>
       <button onClick={ () => deleteCategory(categories.id) }  className="delete-button-create" type="submit"><i className="fa-solid fa-trash"></i></button>
      </div>
      </td>
    </tr>
    ))}
    </tbody>
    </table>

</div>
    </div>
    </div>
  );
}

export default CreateCategory;
