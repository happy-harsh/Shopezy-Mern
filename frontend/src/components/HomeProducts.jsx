import React from "react";
import { useState, useEffect } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";


const HomeProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  
  const filteredProducts = Array.isArray(data)
    ? data.filter((product) => product.proTag === "top 10")
    : [];
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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






  return (
    <div className="">
      <div className="section ">
      <div className="text-slate-500 m-4 mb-0 text-xl font-bold ">
        Hottest Deals
      </div>
      <div className="flex relative">
        <button
          className="absolute px-1 py-3 left-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:left-0 lg:top-20 bg-white m-3"
          onClick={handlePreviousPage}
        >
          <FcPrevious />
        </button>
        <div className="ml-14  lg:ml-32 text-gray-600">
          <div className="flex flex-wrap ">
            {currentProducts.map((product) => (
              <div className=" bg-white p-2 m-2 rounded-lg  lg:bg-white-500 lg:w-72 w-32">
                <img
                  src={product.proImg}
                  alt={product.proName}
                  className="w-full h-40 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.proName}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute px-1 py-3 right-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:right-0 lg:top-20 bg-white m-3"
          onClick={handleNextPage}
        >
          <FcNext />
        </button>
      </div>
      </div>
      {/* <div className="section">
      <div className="text-grey m-4 mb-0 text-xl font-bold ">
        All Products
      </div>
      <div className="flex relative ">
        <button
          className="absolute px-1 py-3 left-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:left-0 lg:top-20 bg-white m-3"
          onClick={handlePreviousPage}
        >
          <FcPrevious />
        </button>
        <div className="ml-14  lg:ml-32 text-gray-600">
          <div className="flex flex-wrap ">
            {currentProducts.map((product) => (
              <div className="bg-white p-2 m-2 rounded-lg  lg:bg-white-500 lg:w-72 w-32">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute px-1 py-3 right-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:right-0 lg:top-20 bg-white m-3"
          onClick={handleNextPage}
        >
          <FcNext />
        </button>
      </div>
      </div> */}
    </div>
  );
};

export default HomeProducts;
