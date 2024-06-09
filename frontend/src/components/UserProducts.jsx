import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCartAsync } from "../redux/slices/cartSlice";

const UserProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const cartData = useSelector((state) => state.cart.cartData);
  const [cart, setCart] = useState([]);

  const isUserLoggedIn = useSelector(
    (state) => state.authCheck.isAuthenticated
  );
  const [selectedQuantities, setSelectedQuantities] = useState({});
  console.log(selectedQuantities);

  const handleOnChange = (productId, e) => {
    const updatedQuantities = {
      ...selectedQuantities,
      [productId]: parseInt(e.target.value), // Convert value to an integer
    };
    setSelectedQuantities(updatedQuantities);
  };

  const calculateTotalPrice = (productId) => {
    const product = data.find((p) => p.proId === productId);
    if (product) {
      const quantity = selectedQuantities[productId] || 1;
      let finalPrice = parseInt(quantity * product.price);
      return finalPrice;
    }
    return 0;
  };
  // console.log(cart)

  const addToCart = (productId) => {
    const product = data.find((p) => p.proId === productId);
    if (product) {
      const fPrice = calculateTotalPrice(productId);

      let quantity = selectedQuantities[productId] || 1;
      quantity = Number(quantity); // Convert to a number

      const userId = localStorage.getItem("userId");
      const userCartData = {
        userId,
        proId: product.proId,
        proName: product.proName,
        proQty: quantity,
        proFinalPrice: fPrice,
      };
      console.log(userCartData);
      // setCart([...cart, userCartData]);

      dispatch(addToCartAsync(userCartData));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {isUserLoggedIn ? (

<div className="container mx-auto px-4 text-blue-gray-900">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data &&
      data.map((product) => (
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          key={product.id}
        >
          <img
            src={product.proImg}
            alt={product.proName}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">{product.proName}</h1>
            <h2 className="text-md font-medium text-gray-600 mb-2">
              {product.proDesc}
            </h2>
            <p className="text-lg font-bold mb-4">Price: Rs. {calculateTotalPrice(product.proId)}</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-400 text-white rounded-lg px-4 py-2 hover:bg-green-500 transition-colors duration-300"
                onClick={() => addToCart(product.proId)}
              >
                Add to Cart
              </button>
              {product.proQty === 0 ? (
                <span className="text-red-500">Out of Stock</span>
              ) : (
                <select
                  className="text-black border border-gray-300 rounded-lg px-2 py-1"
                  value={selectedQuantities[product.proId] || 1}
                  onChange={(e) => {
                    handleOnChange(product.proId, e);
                  }}
                >
                  {Array(product.proQty)
                    .fill()
                    .map((_, index) => {
                      const optionValue = index + 1;
                      return (
                        <option key={index} value={optionValue}>
                          {optionValue}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>
          </div>
        </div>
      ))}
  </div>
</div>


      ) : (
        "Please Login to see all the products"
      )}
    </>
  );
};

export default UserProducts;
