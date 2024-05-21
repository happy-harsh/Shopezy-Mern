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
        <div>
          <div className="flex relative">
            <div className="ml-14 lg:ml-32">
              <div className="flex flex-wrap">
                {data &&
                  data.map((product) => (
                    <div
                      className="bg-grey p-2 m-2 rounded-lg lg:bg-white-500 lg:w-72 w-32"
                      key={product.id}
                    >
                      <img
                        src={product.proImg}
                        alt={product.proName}
                        className="w-full h-40 object-cover mb-4"
                      />
                      <h1 className="text-xl font-semibold mb-2">{product.proName}</h1>
                      <h2 className="text-md font-semibold mb-2">
                        {product.proDesc}
                      </h2>
                      <p>Price: Rs. {calculateTotalPrice(product.proId)}</p>
                      <div className="flex flex-between gap-10 mt-5">
                      <button
                        className="bg-green-400 rounded-lg px-2 py-1"
                        onClick={() => addToCart(product.proId)}
                      >
                        Add to Cart
                      </button>
                      {product.proQty === 0 ? (
                        "Out of Stock"
                      ) : (
                        <select
                        className="text-black"
                          name=""
                          id=""
                          value={selectedQuantities[product.proId] || 1} // Set value from selectedQuantities state
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

export default UserProducts;
