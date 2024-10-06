import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./components/Dashboard/Dashboard";
import "./style.css";
import Login from "./components/auth/Login";
import Error from "./pages/Error";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default App;
