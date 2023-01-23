import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Recipes',
    path: '/recipedata',
    icon: <GiIcons.GiHotMeal />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/categorylist',
    icon:  <BiIcons.BiCategory />,
    cName: 'nav-text'
  },
  {
    title: 'Comments',
    path: '/comments',
    icon: <FaIcons.FaRegComments />,
    cName: 'nav-text'
  },
  {
    title: 'Reviews',
    path: '/reviews',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/userdata',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
 
 
];