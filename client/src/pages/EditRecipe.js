import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import '../resources/css/profile.css';
import Navbar from "../Admin/Navbar";
import { useHistory, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




function EditRecipe() {

  const [name, setName] = useState('')
  const [cat_id, setCategory] = useState()
  const [ image, setImage] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [cook_time, setCook_time] = useState('')
  const [about_the_recipe, setAbout_the_recipe] = useState('')
  const [serves, setServes] = useState('')
  const inputRef = useRef(null); 

  const [values, setValues] = useState([]); //initialize useState
  const [options, setOptions] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    function handleClick() {
      console.log(inputRef.current.value);   //get value from inputRef
    }
  
    useEffect(() => {
      fetch('http://localhost:5000/category').then((data)=>data.json()).then((val)=>setValues(val))
      }, [])

      console.log(values , "values")



 

  const getRecipeById = async () => {
      const response = await axios.get(`http://localhost:5000/recipe/${id}`);
      setName(response.data.name);
      setCategory(response.data.category);
      setImage(response.data.image);
      setSteps(response.data.setSteps);
      setIngredients(response.data.ingredients);
      setCook_time(response.data.cook_time);
      setAbout_the_recipe(response.data.about_the_recipe);
      setServes(response.data.serves);
  
  }

  
 
    const updateRecipe = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', name)
        formData.append('cat_id', cat_id)
        formData.append('image', image)
        formData.append('ingredients', ingredients)
        formData.append('steps', steps)
        formData.append('cook_time', cook_time)
        formData.append('about_the_recipe', about_the_recipe)
        formData.append('serves', serves)

        await axios.patch(`http://localhost:5000/recipe/${id}`, formData);

        navigate('/recipedata');   
    }

    useEffect(() => {
      getRecipeById();
  }, []);
  
  return (
    <div>
    <Navbar />

    <div className='admin-nav'>
    <div className="Add_Category_button">
         <i className="fa-duotone fa-plus"></i>
    </div>
 </div>

    <div  className="flex-right-content-">
    <div className='form-div'>

    <form action='/server/upload/image-upload.js' onSubmit={updateRecipe} method="POST" encType='multipart/form-data'>

    <div className="image-Category">

    <input className="inputFile" ref={inputRef}  type="file" onChange={(e) => setImage(e.target.files[0])} />
    <br />

    <div  className='category-' >
    
    <select className='category-button'  onChange={(e) =>setCategory(e.target.value)}  value={cat_id}  >
    <option>Category</option>
    {
        values.map((category, i)=>
            <option key={i}>
           {category.id},{category.name}
            </option>)  
    }
         <h1>{options}</h1>

    </select>
    </div>

    </div>

    <div className='add-recipe-div'>

    <div className='add-recipe-div-one'>
    <input className="input-recipe"  ref={inputRef} type="text" cols="70" rows="3" placeholder='Name' defaultValue="Initial value"  value={name} onChange={(e) => setName(e.target.value)} />
    <br />
    
    </div>

    <div className='add-recipe-div-two'>
    <input className="input-recipe-time" ref={inputRef} type="text"   placeholder='Cook-Time'  defaultValue="Initial value" value={cook_time} onChange={(e) => setCook_time(e.target.value)} />
    <br />
    
    </div>

    <div className='add-recipe-div-three'>
    <input className="input-recipe-serves" ref={inputRef} type="text"   placeholder='Serves'  defaultValue="Initial value" value={serves} onChange={(e) => setServes(e.target.value)} />
    <br />
    
    </div>
    </div>
                              
        <textarea rows="4" cols="76" className="input-text-area"  ref={inputRef} type="text" placeholder='Ingredients'   defaultValue="Initial value"  value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <br />
       
        <textarea rows="4" cols="76"  className="input-text-area"  placeholder='Steps' ref={inputRef}  type="text"  defaultValue="Initial value"  value={steps} onChange={(e) => setSteps(e.target.value)} />
        <br />         
      
        <textarea rows="4" cols="76"  className="input-text-area"  ref={inputRef} type="text"  placeholder='About'   defaultValue="Initial value" value={about_the_recipe} onChange={(e) => setAbout_the_recipe(e.target.value)} />
        <br />
         
        <button className="button-add-recipe" onClick={handleClick} type="submit">Add Recipe</button>
    </form>
    </div>
    
</div>
</div>
)
}

export default EditRecipe