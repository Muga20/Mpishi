import Navbar from "../layouts/AdminNavbar";
import "../resources/css/userdata.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../pagination/Pagination";

function UserData() {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/members");
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

      <div class="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th></th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={users.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default UserData;
