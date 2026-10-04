import { useEffect, useState } from "react";
import Login from "./pages/Login";


function App() {
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5500/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => setCategories(data.data));
  }, []);

  return (
    <div>
      <Login />
      <hr />
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;