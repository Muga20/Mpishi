import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react'
import Recipes from './client/Recipes';
import Home from './Views/Home';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Users from './client/Users';
import ReadRecipe from './client/ReadRecipe';
import AddRecipe from './pages/AddRecipe';
import {UseAuthContext} from './hooks/UseAuthContext'
import NotFound from './Views/NotFound';
import Comments from './pages/Comments';
import RecipeData from './pages/RecipeData';
import Reviews from './pages/Reviews';
import UserData from './pages/UserData';
// import Admin from './Admin/Admin';
import EditRecipe from './pages/EditRecipe';
import CreateCategory from './pages/CreateCategory';
import EditCategory from './pages/EditCategory';
import Search from './pages/Search';
import Category from './client/Category';
import EditProfille from './client/EditProfille';
import About from './pages/About';
import SubFooter from './Views/SubFooter';
import ResetPassword from './authentication/ResetPassword';
import Contact from './pages/Contact';




 function App() {
  const {user} = UseAuthContext();

  return (
    <div className="App">

    <BrowserRouter>
     <Routes>
      {/**  page not found Routes  */}
      <Route path='*' element={<NotFound />}/>

      {/** Landing page Routes  */}
      <Route path="/" element={<Home/>}/>

      {/** user page Routes  */}
      <Route path="/users" element={user ? <Users/> :<Navigate to="/login" /> } />
      <Route path= '/userdata' element={ <UserData /> } />
      <Route path='edit_profile/:id' element={user ? <EditProfille /> :<Navigate to="/login" />} />


      {/** Authentication Routes  */}
      <Route path='/login' element={!user ? <Login /> :<Navigate to="/" /> }/>
      <Route path='/signup' element={!user ? <Signup/>:<Navigate to ="/" /> } />
      <Route path='/signup' element={!user ? <ResetPassword /> :<Navigate to ="/" /> } />



       {/** Recipe Routes  */}
      <Route path="/recipes" element={ user ? <Recipes/> :<Navigate to="/login" /> }/>
      <Route path="/read_recipe/:id" element={<ReadRecipe/> }/>
      <Route path='/add_recipe' element={ user ? <AddRecipe/> :<Navigate to="/login" /> }/>
      <Route path= '/recipedata' element={ user ? <RecipeData /> :<Navigate to="/login" />} />
      <Route path= '/edit_recipe/:id' element={ <EditRecipe />} />


       {/** Category Routes  */}
       <Route path= '/create_category' element={  <CreateCategory />} />
       <Route path= '/edit_category/:id' element={  <EditCategory />} />
       <Route path='/category' element={ user ? <Category /> :<Navigate to="/login" /> }/>

       <Route path='/search' element={<Search />} />

    

       {/** Comments Routes  */}
      <Route path='/comments' element={ user ? <Comments /> :<Navigate to="/login" /> }/>
      <Route path='/about' element={  <About />   }/>
      <Route path='/contact' element={  <Contact/>   }/>


      

    
       {/** Reviews Routes  */} 
      <Route path='/reviews' element={ user ? <Reviews /> :<Navigate to="/login" /> }/>


      <Route path='/about' element={  <SubFooter/>   }/>

  
   
    
   
    
   
      </Routes>
      </BrowserRouter>
    </div>
   );
 }


  export default App;

  
