import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { apiRequest } from "./api/client";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiRequest("/categories")
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err.message));
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