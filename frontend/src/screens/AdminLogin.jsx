import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {adminLogin,adminLogout} from "../redux/slices/adminAuthSlice"

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );

  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );

  const [cred, setCred] = useState({
    secKey:"",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const adminData = {
        adminSecKey:cred.secKey,
        adminEmail:cred.email,
        adminPassword:cred.password
      }
      await axios.post(`${process.env.API_URL}/api/adminLogin`,adminData,{
        withCredentials:true
      })
      .then( (response) => {
        dispatch(adminLogin())
         alert("Login Successful");
         navigate("/");
        })
        .catch((error) => {
          // console.log(error.response.data);
          alert("Enter Valid Credentials");
        });
    }

    if(isAdminLoggedIn){
      console.log("Admin You are already Logged in")
      navigate("/");
      
    }

  return (
    <>
      <NavBar />
    {!isUserLoggedIn ? <>
      <div>
        <div class="m-20 mb-32 flex items-center justify-center">
          <div class="w-full max-w-md text-center">
            <div className="text-xl font-bold mb-2 text-white">
              Admin Login
            </div>
            <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"

                >
                  Admin Secret Key
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="secKey"
                  value={cred.secKey}
                  onChange={onChange}
                  placeholder="Enter the secret key"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"

                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  value={cred.email}
                  onChange={onChange}
                  placeholder="Enter email"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"

                >
                  Password
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={cred.password}
                  placeholder="Enter Password"
                />
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Login as admin
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>: "User Cannot Access Admin Login"}
    </>
  );
};

export default AdminLogin;
