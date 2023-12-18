import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import NavBar from "../components/NavBar";
import axios from 'axios';
import Footer from '../components/Footer';
const SignUp = () => {
let nav  = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const { name, location, email, password } = cred;
  
    // const inputData = {
    //   userName: name,
    //   userLocation: location,
    //   userEmail: email,
    //   userPassword: password,
    // };
  
    try {
      const response = await axios.post("http://localhost:3001/api/signupUser",cred);
      // console.log(response.data);
      alert("User Created Successfully");
      nav("/login");
    } catch (error) {
      console.error(error);
      alert("Some Error Occurred");
      // Handle error or display an error message
    }
  };

  return (
    <div>
    <NavBar/>
    <div class="mt-20 mb-20 flex items-center justify-center"  >
      <div class="w-full max-w-md text-center">
      <div className="text-xl font-bold mb-2 text-white">
        Welcome new User
      </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-5" >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name='name'
              value={cred.name}
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="Address"
            >
              Address
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    
              type="text"
              name='location'
              onChange={handleChange}
              value={cred.location}
              placeholder="Enter Address"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="email"
              name='email'
              value={cred.email}
              onChange={handleChange}
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
              name='password'
              value={cred.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={handleSubmit}
            >
              Sign In
            </button>
            {/* <a
              class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
  )
}

export default SignUp