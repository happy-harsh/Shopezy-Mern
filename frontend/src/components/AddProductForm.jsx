import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const AddProductForm = ({ first, setFirst }) => {
  const dispatch = useDispatch();
  const [selectedQty, setSelectedQty] = useState(1); // Initialize with a default value if needed

  const [formData, setFormData] = useState({
    proImg: "",
    proName: "",
    proDesc: "",
    proTag: "",
    proCat: "",
    proQty: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, proQty: selectedQty }; 
    await axios
      .post("http://localhost:3001/api/addProduct", updatedFormData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFirst(!first);
        dispatch(fetchProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleDeleteProduct}>
        <div>
          <label htmlFor="proImg">Product Image URL:</label>
          <input
            type="text"
            id="proImg"
            name="proImg"
            value={formData.proImg}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="proName">Product Name:</label>
          <input
            type="text"
            id="proName"
            name="proName"
            value={formData.proName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="proDesc">Product Description:</label>
          <input
            type="text"
            id="proDesc"
            name="proDesc"
            value={formData.proDesc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            id="proCat"
            name="proCat"
            value={formData.proCat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Tag">Tag</label>
          <input
            type="text"
            id="proTag"
            name="proTag"
            value={formData.proTag}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Quantity">Quantity:</label>
          <select name="" id=""     value={selectedQty}
    onChange={(e) => setSelectedQty(parseInt(e.target.value))}>
            {Array(100)
              .fill()
              .map((_, index) => {
                return (
                  <option key={index} value={index}>
                    {index}
                  </option>
                );
              })}
          </select>
        </div>
        {/* <div>
          <label htmlFor="Quantity">Quantity:</label>
          <input
            type="number"
            id="proQty"
            name="proQty"
            value={formData.proQty}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            setFirst(true);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
