import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    
    const handleAdd = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const result = await apiRequest("/categories", {
                method: "POST",
                body: JSON.stringify({ name }),
            });
            setName("");
            setCategories([...categories, result.data]);
            
        } catch (err) {
            setError(err.message)
        }
    
    }

    const handleDelete = async (id) => {
        setError("");

        
        try {
            await apiRequest(`/categories/${id}`, 
                {method: "DELETE"}
            );
            setCategories(categories.filter((category) => 
                category.id !== id
            ));


        } catch (err) {
            setError(err.message);
        }
      
    }

    const handleSave = async (id) => {
        setError("");
    
        try {
            const result = await apiRequest(`/categories/${id}`, {
                method: "PUT",
                body: JSON.stringify({ name: editName }),
            });

            setCategories(categories.map((c) => c.id === id ? result.data : c));
            setEditingId(null);

        } catch (err) {
            setError(err.message);
        }
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
                    <li key={category.id}>
                        {editingId === category.id ? (
                            <span>
                                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                                <button onClick={() => handleSave(category.id)}>Save</button>
                            </span>
                            ) : (
                            <span>
                                {category.name}
                                <button onClick={() => {
                                setEditingId(category.id);
                                setEditName(category.name);
                                }}>
                                Edit
                                </button>
                            </span>
                            )}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAdd}>
                <input type="text" value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="New category"
                />
                <button type="submit">Add</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogout}>Logout</button>
            <Link to="/products">Products</Link>
        </div>
        
    );
}

export default Dashboard;