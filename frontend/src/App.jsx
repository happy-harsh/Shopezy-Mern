import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Product from "./screens/Product";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state=>state.authCheck)
  // console.log(isLoggedIn)
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/product" element={<Product/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
