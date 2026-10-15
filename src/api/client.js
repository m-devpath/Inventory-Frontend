const BASE_URL = 'http://localhost:5500/api';

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    const isAuthRequest = endpoint.startsWith("/auth");

    if(res.status === 401 && !isAuthRequest) {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }

    const data = await res.json();

    if(!data.data){
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}