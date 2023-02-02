import React from 'react'
import '../resources/css/pagination.css'

function RecipePagination({postsPerPage, totalPosts, paginate ,currentPage}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  return (
    <div className=''>


    <div className='wrapper'>
   
  <div class="b-pagination-outer">
  <ul className='border-pagination' >

  {pageNumbers.map(number => (
      <li className='pagination-li' key={number}>
         <a className='pagination-a' onClick={() => paginate(number)} >
           {number}
          </a>
      </li>
  ))}
  </ul> 
</div>
  
</div>
    </div>
 
   )
}

export default RecipePagination