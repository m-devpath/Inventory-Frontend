import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiRequest('/products')
        .then((data) => setProducts(data.data))
        .catch((err) => console.log(err.message))
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - Qty: {product.quantity}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Products;