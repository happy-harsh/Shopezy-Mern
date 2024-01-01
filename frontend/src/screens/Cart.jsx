import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartAsync,
  handleQtyChange,
  removeFromCartAsync,
} from "../redux/slices/cartSlice";
import { fetchProducts } from "../redux/slices/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const cartData = useSelector((state) => state.cart.cartData);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const userId = localStorage.getItem("userId");
  const [totalPrice, setTotalPrice] = useState(0);
  const [state, setState] = useState(true);
  const [exceed, setExceed] = useState(true);

  const calculateCartTotal = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.proFinalPrice;
    });
    return total;
  };

  const handleRemoveFromCart = (proId) => {
    let obj = {
      userId,
      proId,
    };
    dispatch(removeFromCartAsync(obj));
  };

  const handleInc = (proId) => {
    const product = data.find((p) => p.proId === proId);
    const qty = product.proQty;
    const cartProduct = cartData.items.find((p) => p.proId === proId);
    const currProQty = cartProduct.proQty + 1;
    const ogProPrice = product.price;
    console.log(ogProPrice);
    console.log(currProQty);
    console.log(qty);

    if (product && cartProduct && currProQty <= qty) {
      setExceed(true);
      const newPrice = currProQty * ogProPrice + 1;
      let obj = {
        userId,
        proId,
        proQty: currProQty,
        newPrice,
      };
      console.log(obj);
      dispatch(handleQtyChange(obj));
      fetchCartData();
      setState(!state);
    } else {
      setExceed(false);
    }
  };

  const handleDec = (proId) => {
    const product = data.find((p) => p.proId === proId);
    const qty = product.proQty;
    const cartProduct = cartData.items.find((p) => p.proId === proId);
    const currProQty = cartProduct.proQty - 1;
    const ogProPrice = product.price;
    console.log(ogProPrice);
    console.log(currProQty);
    console.log(qty);

    if (product && cartProduct && currProQty <= qty) {
      setExceed(true);
      const newPrice = currProQty * ogProPrice - 1;
      let obj = {
        userId,
        proId,
        proQty: currProQty,
        newPrice,
      };
      console.log(obj);
      dispatch(handleQtyChange(obj));
      fetchCartData();
      setState(!state);
    } else {
      setExceed(false);
    }
  };
  const fetchCartData = () => {
    dispatch(fetchCartAsync(userId));
  };

  useEffect(() => {
    // Check if product data is already available in state
    if (!data || data.length === 0) {
      dispatch(fetchProducts()); // Dispatch action to fetch products if data is not available
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchCartData();
  }, [dispatch, userId, state]);

  useEffect(() => {
    if (cartData && cartData.items) {
      const total = calculateCartTotal(cartData.items);
      setTotalPrice(total);
    }
  }, [cartData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <NavBar />
      {!cartData || cartData.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartData.items.map((product) => (
          <div
            className="bg-white shadow-md rounded-lg p-4 mb-4"
            key={product.productId}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{product.proName}</h2>
            </div>
            <div className="flex items-center justify-around mb-2">
              <button
                onClick={() => {
                  handleDec(product.proId, product.proFinalPrice);
                }}
              >
                -
              </button>
              <p className="text-gray-700">Quantity: {product.proQty}</p>
              {exceed ?(
                <>
                  <button
                    onClick={() => {
                      handleInc(product.proId, product.proFinalPrice);
                    }}
                  >
                    +
                  </button>
                </>
              ): <>no more stock</>}
              <p className="text-gray-700">Price: ${product.proFinalPrice}</p>
            </div>
            <button
              className="text-white bg-red-500 rounded-lg px-4 py-2"
              onClick={() => handleRemoveFromCart(product.proId)}
            >
              remove from cart
            </button>
          </div>
        ))
      )}
      Cart Total : {totalPrice}/-
    </>
  );
};

export default Cart;
