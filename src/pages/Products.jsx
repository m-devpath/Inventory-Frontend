import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");   
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editQuantity, setEditQuantity] = useState("");
    

   
    const handleAdd = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await apiRequest('/products', {
                method: "POST",
                body: JSON.stringify({ 
                    name, 
                    price: Number(price), 
                    quantity: Number(quantity) 
                })
            });
            setName("");
            setPrice("");
            setQuantity("");
            setProducts([...products, result.data]);

        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async (id) => {
        setError("");

        try {
            await apiRequest(`/products/${id}`, {method: "DELETE"});
           
            setProducts(products.filter((product) =>  product.id !== id ));

        } catch (err) {
            setError(err.message);
        }
    }

    const handleSave = async (id) => {
        setError("");

        try {
            const result = await apiRequest(`/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: editName,
                    price: Number(editPrice),
                    quantity: Number(editQuantity)
                }),
            });
            
            setProducts(products.map((p) => p.id === id ? result.data : p));
            setEditingId(null)

        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        apiRequest('/products')
        .then((data) => setProducts(data.data))
        .catch((err) => console.log(err.message))
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => 
                <li key={product.id}>
                    {editingId === product.id ? (
                        <span>
                            <input type= "text" value={editName} onChange= {(e) => setEditName(e.target.value)} />
                            <input type= "number" value={editPrice} onChange= {(e) => setEditPrice(e.target.value)} />
                            <input type= "number" value={editQuantity} onChange= {(e) => setEditQuantity(e.target.value)} />

                            <button onClick={() => handleSave(product.id)}>Save</button>
                        </span>
                    ):(
                        <span>
                            {product.name} - ${product.price} - Qty: {product.quantity}
                            <button onClick={() => {
                                setEditingId(product.id);
                                setEditName(product.name);
                                setEditPrice(product.price);
                                setEditQuantity(product.quantity);
                            }}>
                                Edit
                            </button>
                            
                        </span>
                    )}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                 )} </ul>
            <form onSubmit={handleAdd}>
                <input type="text" value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input type="number" value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <input type="number" value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                />
                <button type="submit">Add</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
}

export default Products;