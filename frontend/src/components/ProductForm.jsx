import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ isAddingProduct, setIsAddingProduct }) => {
  const dispatch = useDispatch();
  // for dropdown selection of quantity
  const [selectedQty, setSelectedQty] = useState(1);

  const navigate = useNavigate()

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
      .post(`${import.meta.env.VITE_API_URL}/api/addProduct`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchProducts());
        alert("Product added successfully")
        handleCancel(); // Reset form and close
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    // setIsAddingProduct(false);
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
    navigate("/AdminDashboard")
  };

  return (
<div className="w-1/4 mx-auto m-4 p-2 bg-gray-50 text-black rounded-lg ">
  { (
    <>
      <h2 className="text-3xl font-extrabold mb-4 text-[#0c5273]">Add Product</h2>
      <form className="space-y-6" onSubmit={handleAddProduct}>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proImg">
            Product Image URL:
          </label>
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proImg"
            name="proImg"
            value={formData.proImg}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proName">
            Product Name:
          </label>
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proName"
            name="proName"
            value={formData.proName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proDesc">
            Product Description:
          </label>
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proDesc"
            name="proDesc"
            value={formData.proDesc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proCat">
            Category:
          </label>
          {/* <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proCat"
            name="proCat"
            value={formData.proCat}
            onChange={handleChange}
          /> */}
                    <select
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            id="proCat"
            name="proCat"
            value={formData.proCat}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="medicine">Medicine</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="household">Household</option>
          </select>
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proTag">
            Tag:
          </label>
          {/* <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proTag"
            name="proTag"
            value={formData.proTag}
            onChange={handleChange}
          /> */}
                              <select
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            id="proTag"
            name="proTag"
            value={formData.proTag}
            onChange={handleChange}
          >
            <option value="">Select a Tag</option>
            <option value="topTen">Top 10</option>
            <option value="topFive">Top 5</option>
            <option value="fiftyOff">50% off</option>
            <option value="twentyOff">20% off</option>
            <option value="tenOff">10% off</option>
          </select>
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="quantity">
            Quantity:
          </label>
          <select
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
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
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="price">
            Price:
          </label>
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            className=" bg-green-500 text-white px-4 py-2 m-3 rounded-md shadow-md hover:shadow-lg transition duration-300"
            type="submit"
          >
            Confirm Add Product
          </button>
          <button
            className=" bg-red-500 text-white px-4 py-2 m-3 rounded-md shadow-md hover:shadow-lg transition duration-300"
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
