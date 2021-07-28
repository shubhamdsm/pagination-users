import "./styles.css";
import { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  async function getUsers() {
    setLoading(true);
    let res = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
    let user = await res.json();
    setUsers(user.data);
    setTotalPages(user.total_pages);
    setCurrentPage(user.page);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, [currentPage]);
  return (
    <div className="App">
      <h1>list of users</h1>
      {loading ? "loading...." : ""}
      {users.map((item) => (
        <li key={item.id}>{item.first_name}</li>
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />
    </div>
  );
}
