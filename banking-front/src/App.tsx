import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginRegister from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/dashboard");
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} />}
      />
      <Route
        path="/login"
        element={<LoginRegister onLogin={handleLogin} />}
      />

      <Route element={<ProtectedRoute token={token} />}>
        <Route
          path="/dashboard"
          element={<Sidebar onLogout={handleLogout} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
