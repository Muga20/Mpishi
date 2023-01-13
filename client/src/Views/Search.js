// import React from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'


// function Search () {

//   const [fetchAPI ,setApi ]=useState([]);
//   const [searchTerm ,setSearchTerm] = useState('')
//   const [searchResult, setSearchResult] =useState([]);

//   useEffect(()=>{
//     axios.get('http://localhost:5000/recipe')
//     .then((res)=>{
//         setApi(res.data)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
//     },[])
//     console.log(fetchAPI)

//     useEffect(()=>{
//         const results = fetchAPI.filter(recipe => recipe.name.toLowerCase().includes(searchTerm))
//         setSearchResult(results)
//     },[searchTerm])

//     const handleChange = (e) =>{
//         setSearchTerm(e.target.value)
//     }

//     return (
//         <div>

//             <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
//             <ul>
//                 {searchResult.map(recipe =>(

                 
//                     <li key={recipe._id}>{recipe.name} <img src={`http://localhost:5000/${recipe.image}`} /></li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default Search





