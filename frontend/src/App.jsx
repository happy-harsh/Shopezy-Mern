import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Product from "./components/Product";
import { useSelector } from "react-redux";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/adminLogin" element={<AdminLogin/>} />
          <Route exact path="/adminDashBoard" element={<AdminDashboard/>} />
        </Routes>

    </Router>
  );
}

export default App;
