import React from "react";
import NavBar from "../components/NavBar";
import Product from "../components/UserProducts";
import { useSelector } from "react-redux";
import UserProducts from "../components/UserProducts";

const UserDashboard = () => {
  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );

  return (
    <div>
      <NavBar />
      {isUserLoggedIn && (
        <>
          <UserProducts />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
