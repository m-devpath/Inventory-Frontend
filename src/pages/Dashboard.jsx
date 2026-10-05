import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";

function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiRequest("/categories")
        .then((data) => setCategories(data.data))
        .then((err) => console.log(err.message));
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

export default Dashboard;