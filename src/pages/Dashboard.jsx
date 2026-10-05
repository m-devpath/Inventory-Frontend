import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        apiRequest("/categories")
        .then((data) => setCategories(data.data))
        .catch((err) => console.log(err.message));
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
    );
}

export default Dashboard;