import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../resources/css/navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
 

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
      
        <nav className={'nav-menu active' }>
          <ul className='nav-menu-items' >
            <li className='admin-nav-toggle'>
              <Link to='#' className='menu-bars'>
               
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;