import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync, handleQtyChange } from "../redux/slices/cartSlice";

const CardQtySelectBtn = ({
  id,
  proFinalPrice,
  proQty,
  triggerEffectChange
  
}) => {
  //   console.log(id, proFinalPrice, proQty);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const cartData = useSelector((state) => state.cart.cartData);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const userId = localStorage.getItem("userId");

  const [exceed, setExceed] = useState(true);



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
    triggerEffectChange();
    
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
        triggerEffectChange();
    } else {
        setExceed(false);
    }
};


  if (loading) {
    return <p>Loading...</p>;
}

if (error) {
    return <p>Error: {error}</p>;
}

return (
    <div>
      <div className="flex items-center justify-around mb-2">
        <button
          onClick={() => {
              handleDec(id, proFinalPrice);
            }}
            >
          -
        </button>
        <p className="text-gray-700">Quantity: {proQty}</p>
        <>
          <button
            onClick={() => {
              handleInc(id, proFinalPrice);
            }}
          >
            +
          </button>
        </>

        <p className="text-gray-700">Price: ${proFinalPrice}</p>
      </div>
    </div>
  );
};

export default CardQtySelectBtn;
