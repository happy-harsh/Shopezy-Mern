import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";
import UserLogin from "./screens/UserLogin";
import UserSignUp from "./screens/UserSignUp";
import Cart from "./screens/Cart";
import Electronic from "./categories/Electronic";
import Household from "./categories/Household";
import Medicine from "./categories/Medicine";
import Fashion from "./categories/Fashion";
import Beauty from "./categories/Beauty";
// import Medicine from "./components/categories/Medicine";

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
          <Route exact path="/electronics" element={<Electronic/>} />
          <Route exact path="/medicine" element={<Medicine/>} />
          <Route exact path="/household" element={<Household/>} />
          <Route exact path="/fashion" element={<Fashion/>} />
          <Route exact path="/beauty" element={<Beauty/>} />
          
        </Routes>

    </Router>
  );
}

export default App;
