import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to= "dashboard" />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          }/>
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;