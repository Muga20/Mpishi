// import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom';  //import useNavigate
// import axios from 'axios';
// import Footer from '../Views/Footer.js'
// import "../resources/css/recipe.css";
// import Navbar from '../Views/Navbar.js';


// function AddRecipe() {
//     const [name, setName] = useState('')
//     const [category, setCategory] = useState()
//     const [ image, setImage] = useState('')
//     const [ingredients, setIngredients] = useState('')
//     const [steps, setSteps] = useState('')
//     const [cook_time, setCook_time] = useState('')
//     const [about_the_recipe, setAbout_the_recipe] = useState('')
//     const [serves, setServes] = useState('')
//     const navigate = useNavigate(); //initialize useNavigate
//     const inputRef = useRef(null);  //initialize useRef

//     const [values, setValues] = useState([]); //initialize useState
//     const [options, setOptions] = useState(''); //initialize useState

//     function handleClick() {
//       console.log(inputRef.current.value);   //get value from inputRef
//     }
    
//     useEffect(() => {
//         fetch('http://localhost:5000/category').then((data)=>data.json()).then((val)=>setValues(val))
//         }, [])

//         console.log(values , "values")

//     const recipe = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('name', name)
//         formData.append('category', category)
//         formData.append('image', image)
//         formData.append('ingredients', ingredients)
//         formData.append('steps', steps)
//         formData.append('cook_time', cook_time)
//         formData.append('about_the_recipe', about_the_recipe)
//         formData.append('serves', serves)

//         try {
//             await axios.post('http://localhost:5000/recipe', formData)
            
//             navigate('/recipes')
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div>
//         <Navbar />
//         <form className='container' action='/server/upload/image-upload.js' onSubmit={recipe} method="POST" encType='multipart/form-data'>
          
//             <input className="inputFile" ref={inputRef}  type="file" onChange={(e) => setImage(e.target.files[0])} />
//             <br />
//              <br />
//             <input className="input"  ref={inputRef} type="text" cols="70" rows="3" placeholder='Name' defaultValue="Initial value"  value={name} onChange={(e) => setName(e.target.value)} />
//             <br />
            
//             <input className="input"  ref={inputRef} type="text" placeholder='Category'   defaultValue="Initial value"  value={category} onChange={(e) => setCategory(e.target.value)} />

//             <br />

//             <select onChange={(e) =>setOptions(e.target.value)}>
//             {
//                 values.map((opts, i)=><option key={i}>
//                 {opts.name}
//                 </option>)
//             }

//             <input className="input"  ref={inputRef} type="text" cols="70" rows="3" placeholder='Name' defaultValue="Initial value"  value={category} onChange={(e) => setName(e.target.value)} />
//             <br />
//             <h1>{options}</h1>
//             </select>

//             <br/>
            
//             <textarea rows="4" cols="76" className="input"  ref={inputRef} type="text" placeholder='Ingredients'   defaultValue="Initial value"  value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
//             <br />
           
//             <textarea rows="4" cols="76" className="input"  placeholder='Steps' ref={inputRef}  type="text"  defaultValue="Initial value"  value={steps} onChange={(e) => setSteps(e.target.value)} />
//             <br />
         
          
//             <input className="input"  ref={inputRef} type="text"   placeholder='Cook-Time'  defaultValue="Initial value" value={cook_time} onChange={(e) => setCook_time(e.target.value)} />
//             <br />
          
//             <textarea rows="4" cols="76" className="input"  ref={inputRef} type="text"  placeholder='About'   defaultValue="Initial value" value={about_the_recipe} onChange={(e) => setAbout_the_recipe(e.target.value)} />
//             <br />
             
//             <input className="input"  ref={inputRef} type="text"   placeholder='Serves'  defaultValue="Initial value" value={serves} onChange={(e) => setServes(e.target.value)} />
//             <br />

//             <br />
//             <button className="button" onClick={handleClick} type="submit">Add Recipe</button>
//         </form>
//         <Footer/>
//     </div>
//     )
// }


// export default AddRecipe

