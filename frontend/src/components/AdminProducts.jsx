import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import axios from "axios";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  // State to track which product is selected for updation and the updated form data
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedFormData, setUpdatedFormData] = useState({});

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
      .delete(`${import.meta.env.VITE_API_URL}/api/deleteProduct/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          console.log(id);
          dispatch(fetchProducts()); // This should re-fetch the updated product list
        } else {
          console.log("Error deleting the product:", response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsAddingProduct(true);
  };

  const handleUpdateClick = (product) => {
    setIsUpdatingProduct(true);
    setSelectedProduct(product);
    setUpdatedFormData(product); // Initialize with current product details
  };

  const handleUpdateProduct = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/updateProduct/${
          selectedProduct._id
        }`,
        updatedFormData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(fetchProducts());
        setIsUpdatingProduct(false);
        setSelectedProduct(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormData({ ...updatedFormData, [name]: value });
  };

  return (
    <>
      {isAdminLoggedIn ? (
        <div className="">
          {data && (
            <div className="flex flex-wrap justify-around gap-4 text-blue-gray-600 ">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-3 m-2 rounded-lg shadow-lg  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  {isUpdatingProduct && selectedProduct._id === product._id ? (
                    <>
                      <input
                        type="text"
                        name="proImg"
                        value={updatedFormData.proImg}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="proName"
                        value={updatedFormData.proName}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="proDesc"
                        value={updatedFormData.proDesc}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {/* <input
                        type="text"
                        name="proCat"
                        value={updatedFormData.proCat}
                        onChange={handleInputChange}
                        placeholder="Product Category"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      /> */}
                      <select
                                              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        id="proCat"
                        name="proCat"
                        value={updatedFormData.proCat}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="medicine">Medicine</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="household">Household</option>
                      </select>
                      {/* <input
                        type="text"
                        name="proTag"
                        value={updatedFormData.proTag}
                        onChange={handleInputChange}
                        placeholder="Product Tag"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      /> */}

                      <select
                                              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        id="proTag"
                        name="proTag"
                        value={updatedFormData.proTag}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a Tag</option>
                        <option value="topTen">Top 10</option>
                        <option value="topFive">Top 5</option>
                        <option value="fiftyOff">50% off</option>
                        <option value="twentyOff">20% off</option>
                        <option value="tenOff">10% off</option>
                      </select>

                      <input
                        type="number"
                        name="proQty"
                        value={updatedFormData.proQty}
                        onChange={handleInputChange}
                        placeholder="Product Quantity"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="price"
                        value={updatedFormData.price}
                        onChange={handleInputChange}
                        placeholder="Product Price"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-between">
                        <button
                          className="bg-green-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-green-600"
                          onClick={handleUpdateProduct}
                        >
                          Confirm Update
                        </button>
                        <button
                          className="bg-red-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-red-600"
                          onClick={() => {
                            setIsUpdatingProduct(false);
                            setSelectedProduct(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-600 ">
                      <img
                        src={product.proImg}
                        alt={product.proName}
                        className="w-full h-40 object-cover rounded-t-lg mb-4"
                      />
                      <h1 className="text-xl font-semibold mb-2 ">
                        {product.proName}
                      </h1>
                      <h2 className="text-sm mb-4">{product.proDesc}</h2>
                      <p className="bg-orange-100 text-orange-600 rounded-lg px-2 py-1 mb-2">
                        Price: ${product.price}
                      </p>
                      <p className="bg-green-100 text-green-600 rounded-lg px-2 py-1 mb-2">
                        Category: {product.proCat}
                      </p>
                      <p className="bg-blue-100 text-blue-600 rounded-lg px-2 py-1 mb-2">
                        Tag: {product.proTag}
                      </p>
                      <p className="bg-yellow-100 text-yellow-600 rounded-lg px-2 py-1 mb-2">
                        Quantity: {product.proQty}
                      </p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-red-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-red-600"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-blue-600"
                          onClick={() => handleUpdateClick(product)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* {isAddingProduct ? (
            <ProductForm
              isAddingProduct={isAddingProduct}
              setIsAddingProduct={setIsAddingProduct}
            />
          ) : (
            <button
              className="bg-blue-800 rounded-lg px-2 py-2 h-12"
              onClick={() => handleAddClick()}
            >
              Add Product
            </button>
          )} */}
        </div>
      ) : (
        "Please Login to see all the products"
      )}
    </>
  );
};

export default AdminProducts;
