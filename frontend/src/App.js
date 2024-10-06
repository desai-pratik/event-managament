import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./components/Dashboard/Dashboard";
import "./style.css";
import Login from "./components/auth/Login";
import Error from "./pages/Error";
import Hero from "./pages/Hero";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Hero /> : <Login />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={token ? <Dashboard /> : <Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default App;
