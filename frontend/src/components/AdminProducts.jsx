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
      .delete(`http://localhost:3001/api/deleteProduct/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          console.log(id);
          dispatch(fetchProducts()); // This should re-fetch the updated product list
        } else {
          console.log('Error deleting the product:', response.data);
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
        `${process.env.API_URL}/api/updateProduct/${selectedProduct._id}`,
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
        <div>
          <div className="flex relative">
            <div className="ml-14 lg:ml-32">
                {isAddingProduct ? (
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
                )}
              <div className="flex flex-wrap">
                {data &&
                  data.map((product) => (
                    <div
                      key={product._id}
                      className="bg-grey p-2 m-2 rounded-lg lg:bg-white-500 lg:w-72 w-32"
                    >
                      {isUpdatingProduct &&
                      selectedProduct._id === product._id ? (
                        <>
                          <input
                            type="text"
                            name="proImg"
                            value={updatedFormData.proImg}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="w-full mb-4"
                          />
                          <input
                            type="text"
                            name="proName"
                            value={updatedFormData.proName}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            className="w-full mb-4"
                          />
                          <input
                            type="text"
                            name="proDesc"
                            value={updatedFormData.proDesc}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            className="w-full mb-4"
                          />
                          <input
                            type="text"
                            name="proTag"
                            value={updatedFormData.proTag}
                            onChange={handleInputChange}
                            placeholder="Product Tag"
                            className="w-full mb-4"
                          />
                          <input
                            type="text"
                            name="proCat"
                            value={updatedFormData.proCat}
                            onChange={handleInputChange}
                            placeholder="Product Category"
                            className="w-full mb-4"
                          />
                          <input
                            type="number"
                            name="proQty"
                            value={updatedFormData.proQty}
                            onChange={handleInputChange}
                            placeholder="Product Quantity"
                            className="w-full mb-4"
                          />
                          <input
                            type="number"
                            name="price"
                            value={updatedFormData.price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                            className="w-full mb-4"
                          />
                          <button
                            className="bg-green-500 rounded-lg px-2 py-2"
                            onClick={handleUpdateProduct}
                          >
                            Confirm Update
                          </button>
                          <button
                            className="bg-red-500 rounded-lg px-2 py-2"
                            onClick={() => {
                              setIsUpdatingProduct(false);
                              setSelectedProduct(null);
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <img
                            src={product.proImg}
                            alt={product.proName}
                            className="w-full h-40 object-cover mb-4"
                          />
                          <h1>{product.proName}</h1>
                          <h2 className="text-sm mb-2">
                            Desc: {product.proDesc}
                          </h2>
                          <p className="bg-orange-500 rounded-lg px-1 py-1 mb-2">
                           Price: {product.price}
                          </p>
                          <p className="bg-green-500 rounded-lg px-1 py-1 mb-2">
                           Category: {product.proCat}
                          </p>
                          <p className="bg-blue-500 rounded-lg px-1 py-1 mb-2">
                           Tag: {product.proTag}
                          </p>
                          <p className="bg-brown-500 rounded-lg px-1 py-1 mb-2">
                          Quantity:  {product.proQty}
                          </p>
                          <div className="flex justify-around">
                          <button
                            className="bg-red-500 rounded-lg px-2 py-1"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-blue-800 rounded-lg px-2 py-1"
                            onClick={() => handleUpdateClick(product)}
                          >
                            Update
                          </button>
                          </div>
                        </>
                      )}
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
