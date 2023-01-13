import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';  //import useNavigate
import axios from 'axios';
// import { Link } from 'react-router-dom'
import "../resources/css/login.css"
import Navbar from '../Views/Navbar';
import Footer from '../Views/Footer';



function Signup() {

     const [first_name , setFirst_name ] = useState('');   
     const [last_name , setLast_name ] = useState('') ;
     const [email , setEmail ] = useState('') ;    
     const [password , setPassword ] = useState('') ;
     const [image , setImage] = useState();
     const [errors, setErrors] = useState(false) ;  
     let navigate = useNavigate() ; //initialize useNavigate


     const register = async(e)=>{
        e.preventDefault();
        try{ 

        const formData = new FormData()
        formData.append('first_name',first_name)
        formData.append('last_name',last_name)
        formData.append('email',email)
        formData.append('password',password) 
        formData.append('image', image)
    
         await axios.post('http://localhost:5000/members', formData)
         navigate('/login')
                        
        }
         catch(error){
         if(error.response?.status === 401){
            setErrors("Email Already Registered With us ") //send errors if email already exist
             } 
             if(error.response?.status === 402){
                setErrors(" Not A Valid email ") //send errors if email already exist
                 } 
                 if(error.response?.status === 403){
                    setErrors("Password MUIST be more than FOUR charactors  ") //send errors if email already exist
                     }
                     
            }   
           
        }
  return (
    <div>
      <Navbar />
       <div className="Top_padding">
            <section className="container">
            <center> <h1 className="login_h1" > Signup </h1> </center>   
            <form onSubmit={register}>  
                <div >  
                    <br/> 
                    <input type="text"    className="inputs" placeholder="first name" value={first_name} onChange={(e)=> setFirst_name (e.target.value)} required/> 
                    
                  
                    <br/> 
                    <input type="text"    className="inputs" placeholder="last name"  value={last_name} onChange={(e) =>  setLast_name(e.target.value)}  required/> 
                   
                    <br/> 
                    <input type="text" className="inputs" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> 
                 
                    <br/>   
                    <input type="password"    className="inputs"  placeholder="Enter Password" value={password}  onChange={(e)=>setPassword(e.target.value)} required /><br />
                    {errors && <p className='loginError'>{errors}</p>}
                     <br/>


                    <br/> 
                    <button  className="login_btn_"  type="submit" >Signup</button>
                </div>   
            </form>     
          
            </section>
            <Footer />
            </div>
    </div>
  )
}

export default Signup