import React, { useState, useEffect } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { useMediaQuery } from "react-responsive";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  
  const isSmallDevice = useMediaQuery({ query: '(max-width: 640px)' });
  const isMediumDevice = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });
  const isLargeDevice = useMediaQuery({ query: '(min-width: 1025px)' });

  const getProductsPerPage = () => {
    if (isSmallDevice) return 1;
    if (isMediumDevice) return 2;
    if (isLargeDevice) return 4;
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = getProductsPerPage();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = Array.isArray(data)
    ? data.filter((product) => product.proTag === "topFive")
    : [];
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (indexOfLastProduct < filteredProducts.length) {
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

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when productsPerPage changes
  }, [productsPerPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="text-blue-gray-900">
      <div className="section">
        <div className="text-white m-4 mb-0 text-xl font-bold">Hottest Deals</div>
        <div className="flex relative">
          <button
            className="absolute px-1 py-3 left-0 top-1/2 transform -translate-y-1/2 lg:px-4 lg:py-2 rounded-lg bg-white m-3 shadow-lg hover:bg-gray-200"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FcPrevious size={24} />
          </button>
          <div className="ml-14 lg:ml-32 m-4 p-4 rounded-lg">
            <div className="flex flex-wrap justify-center">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 m-2 rounded-lg lg:w-72 w-64 shadow-lg">
                  <img
                    src={product.proImg}
                    alt={product.proName}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h2 className="text-lg font-semibold mb-2">{product.proName}</h2>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute px-1 py-3 right-0 top-1/2 transform -translate-y-1/2 lg:px-4 lg:py-2 rounded-lg bg-white m-3 shadow-lg hover:bg-gray-200"
            onClick={handleNextPage}
            disabled={indexOfLastProduct >= filteredProducts.length}
          >
            <FcNext size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
