import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {login, logout} from "../redux/slices/authSlice"

const NavBar = () => {
  const navigate = useNavigate();

  const response = useSelector((state) => state.authCheck);
  const isLoggedIn = response.isAuthenticated;
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect( () => {
   axios.get('http://localhost:3001/api/user',{withCredentials:true}) 
     .then(response => {
      // console.log(response.data)
       setLoggedInUser(response.data); 
     })
     .catch(error => {
       navigate("/Login")
       
     });
 }, [isLoggedIn]);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get('http://localhost:3001/api/logoutUser',{withCredentials:true}).then((res)=>{
    if(res.status === 200){
      dispatch(logout());
    }
    navigate("/login")
    }).catch((err)=>{
      console.log(err);
    })
  };
  return (
    <nav className="bg-blue-1000 p-4 sm:h-24 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col sm:flex-row justify-between items-center" style={{backgroundColor:" #013952"}}>
      <div className="text-white  hover:border font-bold m-4 text-xl  sm:text-2xl sm:ml-4  ">
        <Link to="/">Shopezy.com</Link>
      </div>
      <div className="relative sm:flex-grow sm:mr-4">
        <input
          type="text"
          placeholder="Search Shopezy"
          className="pl-10 pr-4 py-2 w-72  border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 "
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-blue-600" />
        </div>
          {/* <Link to="/product">authclick</Link> */}
      </div>


      {!isLoggedIn ? (
        <div className="space-y-4 sm:space-x-4 sm:space-y-0">
          <div className="space-y-4 sm:space-y-0">
            {/* Login Button */}
            <Link to="/login">
              <button className="text-white m-2  bg-indigo-500 rounded-lg px-4 py-2 sm:m-2">
                Login
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/signup">
              <button className="text-white m-2 bg-green-500 rounded-lg px-4 py-2 sm:m-2">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      ) : (
<div className="flex flex-col sm:flex-row p-2 justify-center sm:justify-between items-center">
  <div className="text-white bg-blue-900 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2">
    Welcome {loggedInUser.email}
  </div>

  <button className="text-white bg-blue-500 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2">
    Cart
  </button>

  <button
    className="text-white bg-red-500 rounded-lg px-4 py-2"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

      )}
    </nav>
  );
};

export default NavBar;
