import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react'
import Recipe from './client/ListRecipe';
import Home from './Views/Home';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import FinishAccountSetup from './authentication/FinishAccountSetup';
import ResetPassword from './authentication/ResetPassword';
import Reset from './authentication/Reset';
import Users from './client/Users';
import UserData from './client/UserData';
import EditProfile from './client/EditProfile';
import AboutUser from './client/AboutUser';
import UserBlogs from './client/UserBlogs';
import ReadRecipe from './client/ReadRecipe';

import AddRecipe from './Admin/AddRecipe';
import RecipeData from './Admin/RecipeData';
import EditRecipe from './Admin/EditRecipe';
import CreateCategory from './Admin/CreateCategory';
import EditCategory from './Admin/EditCategory';
import CategoryList from './Admin/CategoryList';
import NotFound from './Views/NotFound';
import {UseAuthContext} from './hooks/UseAuthContext'
import Comments from './Admin/Comments';
import About from './client/About';
import Contact from './HelpCenter/ContactUs';
import Blog from './Admin/Blog';
import BlogData from './Admin/BlogData';
import ReadBlog from './Admin/ReadBog';

import Reviews from './HelpCenter/Reviews';
import SubFooter from './Views/SubFooter';
import AddBlog from './client/AddBlog';
import WriteComment from './client/WriteComment';
import DisplayBlogs from './client/DisplayBlogs';
import HelpCenter from './client/HelpCenter';
import Notification from './client/Notification';
import Reply from './Admin/Reply';
import ListCategory from './Admin/ListCategory';
import ShowCategory from './Admin/ShowCategory';



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
      <Route path= '/user-data' element={ <UserData/>} />
      <Route path='/edit_profile' element={user ? <EditProfile/>:<Navigate to="/login" />} />
      <Route path= '/about-user' element={user ?  <AboutUser/> :<Navigate to="/login" /> } />
      <Route path= '/user-blogs' element={ user ? <UserBlogs/>:<Navigate to="/login" /> } />
      




      {/** Authentication Routes  */}
      <Route path='/signup' element={!user ? <Signup/>:<Navigate to ="/" /> } />
      <Route path='/resetPassword/:id' element={!user ? <ResetPassword />  :<Navigate to ="/" /> } />
      <Route path='/reset' element={!user ? <Reset /> :<Navigate to ="/" /> } />
      <Route path='/login' element={!user ? <Login/>:<Navigate to ="/" /> } />
      <Route path='/finish_account_setup/' element={ <FinishAccountSetup />} />
      <Route path='/login' element={!user ? <FinishAccountSetup />:<Navigate to ="/" /> } />



       {/** Recipe Routes  */}
      <Route path="/recipes" element={ user ? <Recipe/> :<Navigate to="/login" /> }/>
      <Route path="/read_recipe/:id" element={<ReadRecipe/> }/>
      <Route path='/add_recipe' element={ user ? <AddRecipe/> :<Navigate to="/login" /> }/>
      <Route path= '/recipe_data' element={ user ? <RecipeData /> :<Navigate to="/login" />} />
      <Route path= '/edit_recipe/:id' element={ <EditRecipe />} />



       {/** Category Routes  */}
       <Route path= '/create_category' element={ user ?  <CreateCategory /> :<Navigate to="/login" /> } />
       <Route path= '/edit_category/:id' element={ user ?  <EditCategory /> :<Navigate to="/login" /> } />
       <Route path='/category-list' element={user ? <CategoryList /> :<Navigate to="/login" /> } />
       <Route path='/list-category' element={user ? <ListCategory/> :<Navigate to="/login" /> } />
       <Route path='/show-category/:id' element={<ShowCategory /> } />



    

       {/** Comments Routes  */}
      <Route path='/comments' element={ user ? <Comments/> :<Navigate to="/login" /> }/>
      <Route path='/about' element={ user ?  <About/> :<Navigate to="/login" />  }/>
      <Route path='/contact' element={ <Contact/>  }/>
      <Route path='/comment-on-a-recipe' element={ <WriteComment/>  }/>

      {/** Blogs Routes  */}

      <Route path='/blog' element={ user ?  <Blog/> :<Navigate to="/login" />  }/>
      <Route path='/add-blog' element={ <AddBlog /> }/>
      <Route path='/blog-data' element={user ?   <BlogData/> :<Navigate to="/login" />  }/>
      <Route path='/read-blog/:id' element={ user ?  <ReadBlog/> :<Navigate to="/login" />  }/>
      <Route path='/display-blogs' element={ user ?  <DisplayBlogs/> :<Navigate to="/login" /> }/>

    
       {/** Reviews Routes  */} 
      <Route path='/reviews' element={ user ? <Reviews/> :<Navigate to="/login" /> }/>
      <Route path='/about' element={  <SubFooter/>  }/>
      <Route path='/help-center' element={ <HelpCenter />  }/>

      {/** Notification Routes  */}
      <Route path='/notification' element={ user ?  <Notification/> :<Navigate to="/login" /> }/>
      <Route path='/reply/:id' element={ user ?  <Reply/> :<Navigate to="/login" />}/>

      </Routes>
      </BrowserRouter>
    </div>
   );
 }


  export default App;

  
