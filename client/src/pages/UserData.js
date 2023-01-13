import Navbar from '../Admin/Navbar'
import "../resources/css/userdata.css";
import { useState, useEffect } from 'react'
import axios from "axios";


function UserData() {

  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
    
        const response = await axios.get(
          "http://localhost:5000/members"
        );
        setUsers(response.data);
      } catch (e) {
        console.log(e);
      }  
    };

    fetchUsers();
  }, []);

 
  return (
    <div>
    <Navbar />

 <div className='flex-right-content'>

<div class="table-wrapper" >
    <table className='fl-table'>
    <thead>
    <tr>
    <th></th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Email</th>
    
    </tr>
    </thead>
    <tbody>
    {users.map((user) => (
    <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.first_name}</td>
    <td>{user.last_name}</td>
    <td>{user.email}</td>
    </tr>
    ))}
    </tbody>
    </table>
</div>

    </div>
    </div>
    
  )
}

export default UserData