import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";

const UserLogin = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );

  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userEmail: cred.email,
      userPassword: cred.password,
    };
    await axios
      .post(`${process.env.API_URL}/api/loginUser`, userData, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.authToken);
        localStorage.setItem("userId", response.data.Uid);
        localStorage.setItem("userEmail", response.data.UEmail);
        // localStorage.setItem('token', response.data.authToken);

        // Now authSlice becomes true
        dispatch(login());
        alert("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.response.data);
        alert("Enter Valid Credentials");
      });
  };

  if(isAdminLoggedIn){
    console.log("Admin cannot access user login")
    navigate("/AdminDashboard")
  }

  return (
    <>
      <NavBar />
      {isUserLoggedIn? (
        "You are Already Logged in"
      ) : (
        <div>
          <div class="m-20 mb-32 flex items-center justify-center">
            <div class="w-full max-w-md text-center">
              <div className="text-xl font-bold mb-2 text-white">
                Hey! Already a user?
              </div>
              <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
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
                    for="password"
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
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default UserLogin;
