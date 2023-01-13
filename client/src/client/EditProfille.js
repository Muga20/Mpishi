import "../resources/css/userinfo.css";
import Navbar from "../Views/Navbar";
import React, {useState } from "react";
import { useParams ,useNavigate,} from "react-router-dom";
import axios from "axios";
import Footer from "../Views/Footer";

function EditProfille() {

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ image, setImage] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();


    const updateMembers = async (e) => {
      e.preventDefault();

      const formData = new FormData()
      formData.append('first_name', first_name)
      formData.append('last_name', last_name)
      formData.append('email', email)
      formData.append('password',password)
      formData.append('image', image)
      
      await axios.patch(`http://localhost:5000/members/${id}`, formData); 
      
      navigate('/users');   
  }


  return (
    <div>
    <Navbar />
    <form method="post"  onSubmit={updateMembers}>
    <div className="user-container-div-2">
    <div class="About">
    <ul>
        <h1>Update Profile </h1>
    </ul>

    <ul>
        <h3>Names</h3>
        <input type="text"  className="user-inputs" placeholder="FirstName" value={first_name} onChange={(e)=> setFirst_name (e.target.value)} /> 
                            
        <br/> 
        <input type="text"    className="user-inputs" placeholder="LastName"  value={last_name} onChange={(e) =>  setLast_name(e.target.value)}  /> 

    </ul>
    <ul>
        <h3>Email</h3>
        <input type="text" className="user-inputs" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /> 

    </ul>
    <ul>
    <h3>Password</h3>
    <input type="password" className="user-inputs" placeholder="Password" value={password}
     onChange={(e)=> setPassword (e.target.value)} /> 
                        
     </ul>
    <ul>
        <h3>Image</h3>
        <input className="inputFile"   type="file" onChange={(e) => setImage(e.target.files[0])} />
    </ul>
    <ul>
  <button className="button-add-recipe"  type="submit">Update</button>

    
    </ul>
  </div>
    
    </div>

    </form>
    <Footer />
    </div>
  )
}

export default EditProfille