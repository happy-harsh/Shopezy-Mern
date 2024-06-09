import { React, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCartAsync } from "../redux/slices/cartSlice";

const CategoryProducts = ({ category }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const cartData = useSelector((state) => state.cart.cartData);
  const [msg, setMsg] = useState("");

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
    if(isUserLoggedIn){
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
    }else{
      setMsg("Please Sign in First")
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

  console.log(data)

  // console.log(category)

  const filteredProducts = Array.isArray(data)
    ? data.filter((product) => product.proCat === category)
    : [];


  // var filteredProducts = null;

  // console.log(filteredProducts)
  return (
<div>
  <h4 className="text-center uppercase m-3 text-white text-lg font-bold">{category} Category</h4>
  <p>{msg}</p>
  <div className="flex flex-wrap justify-start text-blue-gray-900">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          className="bg-white p-4 m-3 rounded-lg shadow-lg w-full sm:w-60 md:w-72"
          key={product.id}
        >
          <img
            src={product.proImg || 'https://via.placeholder.com/150'}
            alt={product.proName}
            className="w-full h-40 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-lg font-semibold  mb-2">
            {product.proName}
          </h1>
          <h2 className="text-md  mb-2">
            {product.proDesc}
          </h2>
          <p className=" font-medium">Price: Rs. {calculateTotalPrice(product.proId)}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-green-400 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              onClick={() => addToCart(product.proId)}
            >
              Add to Cart
            </button>

            {product.proQty === 0 ? (
              <span className="text-red-600">Out of Stock</span>
            ) : (
              <select
                className="text-black border rounded-lg px-2 py-1"
                name=""
                id=""
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
      ))
    ) : (
      `No products present in ${category} category`
    )}
  </div>
</div>

  );
};

export default CategoryProducts;
