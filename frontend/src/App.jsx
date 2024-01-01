import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";
import UserLogin from "./screens/UserLogin";
import UserSignUp from "./screens/UserSignUp";
import Cart from "./screens/Cart";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userLogin" element={<UserLogin/>} />
          <Route exact path="/userSignUp" element={<UserSignUp/>} />
          <Route exact path="/adminLogin" element={<AdminLogin/>} />
          <Route exact path="/adminDashboard" element={<AdminDashboard/>} />
          <Route exact path="/userDashboard" element={<UserDashboard/>} />
          <Route exact path="/cart" element={<Cart/>} />
        </Routes>

    </Router>
  );
}

export default App;
