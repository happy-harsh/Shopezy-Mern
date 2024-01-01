import React from 'react'
import NavBar from '../components/NavBar'
import Product from '../components/UserProducts'
import { useSelector } from 'react-redux';
import AdminProducts from '../components/AdminProducts';



const AdminDashboard = () => {
  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );
  return (
    <div>
      <NavBar/>
      {isAdminLoggedIn && 
      <AdminProducts/> }
    </div>
  )
}

export default AdminDashboard