import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProductForm from "./AddProductForm";
const AdminProducts = () => {
  const dispatch = useDispatch();
  const stat = useSelector((state) => state.products);
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [first, setFirst] = useState(true);

  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );
  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuthCheck.isAdminAuth
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDeleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:3001/api/deleteProduct/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = () => {
    setFirst(!first);
  };

  console.log(first);

  return (
    <>
      {isAdminLoggedIn ? (
        <div>
          <h6>Admin Managed Products</h6>
          <div className="flex relative">
            <div className="ml-14  lg:ml-32 ">
              {/* <Link to="/addProduct" className=" bg-green-800 rounded-lg px-2 py-2">Add new Product</Link> */}
              {first ? (
                <button
                  className=" bg-green-800 rounded-lg px-2 py-2"
                  onClick={handleClick}
                >
                  Add Product
                </button>
              ) : (
               <><AddProductForm first={first} setFirst={setFirst}/></>
              )}

              <div className="flex flex-wrap ">
                {data &&
                  data.map((product) => (
                    <div className=" bg-grey p-2 m-2 rounded-lg  lg:bg-white-500 lg:w-72 w-32">
                      <img
                        src={product.proImg}
                        alt={product.proName}
                        className="w-full h-40 object-cover mb-4"
                      />
                      <h1>{product.proName}</h1>
                      <h2 className="text-lg font-semibold mb-2">
                        {product.proDesc}
                      </h2>
                      <p className=" bg-orange-500 rounded-lg px-1 py-1">{product.price}</p>
                      <p className=" bg-green-500 rounded-lg px-1 py-1">{product.proCat}</p>
                      <p className=" bg-blue-500 rounded-lg px-1 py-1">{product.proTag}</p>
                      <p className=" bg-yellow-500 rounded-lg px-1 py-1">{product.proQty}</p>
                      <button
                        className=" bg-red-500 rounded-lg px-2 py-2"
                        onClick={() => handleDeleteProduct(product.proId)}
                      >
                        Delete
                      </button>
                      <button className=" bg-blue-800 rounded-lg px-2 py-2">
                        Update
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Please Login to see all the products"
      )}
    </>
  );
};

export default AdminProducts;
