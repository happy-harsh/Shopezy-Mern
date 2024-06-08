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
      .post(`${import.meta.env.VITE_API_URL}/api/addProduct`, formData, {
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
<div className="max-w-lg mx-auto p-4 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 text-black rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
  {isAddingProduct && (
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
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proCat"
            name="proCat"
            value={formData.proCat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[#0c5273] mb-2 font-semibold" htmlFor="proTag">
            Tag:
          </label>
          <input
            className="w-full px-4 py-2 border border-[#0c5273] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c5273] transition duration-200"
            type="text"
            id="proTag"
            name="proTag"
            value={formData.proTag}
            onChange={handleChange}
          />
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
            className="bg-gradient-to-r from-[#0c5273] to-green-500 text-white px-4 py-2 m-3 rounded-md shadow-md hover:shadow-lg transition duration-300"
            type="submit"
          >
            Confirm Add Product
          </button>
          <button
            className="bg-gradient-to-r from-[#0c5273] to-red-500 text-white px-4 py-2 m-3 rounded-md shadow-md hover:shadow-lg transition duration-300"
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
