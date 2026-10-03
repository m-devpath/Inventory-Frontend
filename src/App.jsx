import { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/categories", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzkxMDYyNDYwLCJleHAiOjE3OTE2NjcyNjB9.IWXYe6R4yj_oKiwz8ZNykFAZI3zkmvxZM4BC-4whYQc"
      }
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, []);

  return (
    <div>
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