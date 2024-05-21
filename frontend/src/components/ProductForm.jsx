import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const ProductForm = ({ isAddingProduct, setIsAddingProduct }) => {
  const dispatch = useDispatch();
  // for dropdown selection of quantity
  const [selectedQty, setSelectedQty] = useState(1);

  const [formData, setFormData] = useState({
    proImg: "",
    proName: "",
    proDesc: "",
    proTag: "",
    proCat: "",
    proQty: 1,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedQty(value);
    setFormData({
      ...formData,
      proQty: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.API_URL}/api/addProduct`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchProducts());
        handleCancel(); // Reset form and close
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setFormData({
      proImg: "",
      proName: "",
      proDesc: "",
      proTag: "",
      proCat: "",
      proQty: 1,
      price: 0,
    });
    setSelectedQty(1);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-yellow-100 text-black rounded-lg shadow-lg">
      {isAddingProduct && (
        <>
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          <form className="space-y-4" onSubmit={handleAddProduct}>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="proImg">
                Product Image URL:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="proImg"
                name="proImg"
                value={formData.proImg}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="proName">
                Product Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="proName"
                name="proName"
                value={formData.proName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="proDesc">
                Product Description:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="proDesc"
                name="proDesc"
                value={formData.proDesc}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="proCat">
                Category:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="proCat"
                name="proCat"
                value={formData.proCat}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="proTag">
                Tag:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="proTag"
                name="proTag"
                value={formData.proTag}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="quantity">
                Quantity:
              </label>
              <select
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                name="proQty"
                id="quantity"
                value={selectedQty}
                onChange={handleQtyChange}
              >
                {Array(100)
                  .fill()
                  .map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-blue-800 mb-1" htmlFor="price">
                Price:
              </label>
              <input
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-2 py-1 m-3 rounded-md hover:bg-blue-600"
                type="submit"
              >
                Confirm Add Product
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 m-3 rounded-md hover:bg-blue-600"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductForm;
