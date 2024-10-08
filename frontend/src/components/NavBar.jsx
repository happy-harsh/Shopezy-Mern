import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "../redux/slices/authSlice";
import { adminLogin, adminLogout } from "../redux/slices/adminAuthSlice";

const NavBar = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );
  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});

  // used for displaying the user email on navbar

  // const fetchId = async () => {
  //   await axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/authStatusRole`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       if (response.data.role === "admin") {
  //         setAdmin(response.data);
  //         dispatch(adminLogin());
  //       } else {
  //         setUser(response.data);
  //         dispatch(login());
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   fetchId();
  // }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios
      .get(`${import.meta.env.VITE_API_URL}/api/logoutUser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userId");
          dispatch(logout());
          dispatch(adminLogout());
        }
        navigate("/userLogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav
      className="bg-blue-1000  flex flex-col wrap justify-between items-center md:flex-row  text-black w-full"
      style={{ backgroundColor: "#013952" }}
    >
      <div className="text-white m-2 p-2 flex flex-col">
        <div className=" text-3xl font-bold">
          <Link to="/">Shopezy</Link>
        </div>
        <p className=" italic text-xs">
          Simplified Ecommerce
        </p>
      </div>
      <div className="relative sm:flex-grow sm:mr-4">
        <input
          type="text"
          placeholder="Search Shopezy"
          className="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-blue-600" />
        </div>
      </div>

      {(isUserLoggedIn || isAdminLoggedIn) && (
        <div className="flex flex-col sm:flex-row p-2 justify-center sm:justify-between items-center">
          <div className="text-white bg-blue-900 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2">
            Welcome {user.userEmail || admin.adminEmail}
          </div>

          {isUserLoggedIn && (
            <>
              <Link
                to="/UserDashboard"
                className="text-white bg-blue-500 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2"
              >
                User all Product DashBoard
              </Link>
              <Link
                to="/cart"
                className="text-white bg-blue-500 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2"
              >
                Cart
              </Link>
              <button className="text-white bg-yellow-800 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2">
                Order History
              </button>
            </>
          )}
          {isAdminLoggedIn && (

            <>
                        <Link
              to="/AdminDashboard"
              className="text-white bg-blue-500 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2"
            >
              Admin DashBoard
            </Link>
                        <Link
              to="/addProduct"
              className="text-white bg-green-500 rounded-lg px-4 py-2 mb-2 sm:mb-0 sm:mr-2"
            >
              Add Product
            </Link>
            </>
          )}

          <button
            className="text-white bg-red-500 rounded-lg px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {!isUserLoggedIn && !isAdminLoggedIn && (
        <div className="m-4 space-y-4 sm:space-x-4 sm:space-y-0">
          <div className="space-y-4 sm:space-y-0">
            <Link to="/userLogin">
              <button className="text-white m-2 bg-indigo-500 rounded-lg px-4 py-2 sm:m-2">
                Login
              </button>
            </Link>
            <Link to="/adminLogin">
              <button className="text-white m-2 bg-red-500 rounded-lg px-4 py-2 sm:m-2">
                Admin Login
              </button>
            </Link>

            <Link to="/userSignUp">
              <button className="text-white m-2 bg-green-500 rounded-lg px-4 py-2 sm:m-2">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
