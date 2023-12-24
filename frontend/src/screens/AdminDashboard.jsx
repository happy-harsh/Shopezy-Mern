import React from 'react'
import NavBar from '../components/NavBar'
import Product from '../components/Product'
import { useSelector } from 'react-redux';



const AdminDashboard = () => {
  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );
  return (
    <div>
      {isAdminLoggedIn ? 
      <>
      <NavBar/>
      <Product/>
      </> : "Please Login as a admin to access this dashboard"}
    </div>
  )
}

export default AdminDashboard