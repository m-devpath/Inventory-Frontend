import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5500/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if(!data.success){
                setError(data.message);
                return;
            }
            
            localStorage.setItem("token", data.token);
            console.log("Logged in! Token saved.");

        }catch(err){
            setError("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;