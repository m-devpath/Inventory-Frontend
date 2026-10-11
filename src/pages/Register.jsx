import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
            });

            localStorage.setItem("token", data.token);
            navigate("/Dashboard");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Register</button>
        
        </form>
    );
};

export default Register;