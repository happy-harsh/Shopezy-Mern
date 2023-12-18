import React from "react";
import { useState } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$19.99",
    image: "product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$29.99",
    image: "product2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$39.99",
    image: "product3.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: "$49.99",
    image: "product4.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 6,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 7,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 8,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 8,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 8,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 8,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
  {
    id: 8,
    name: "Product 5",
    price: "$59.99",
    image: "product5.jpg",
  },
];

const Allproducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
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

  return (
    <div className="">
      <div className="section">
      <div className="text-white m-4 mb-0 text-xl font-bold ">
        Hottest Deals
      </div>
      <div className="flex relative ">
        <button
          className="absolute px-1 py-3 left-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:left-0 lg:top-20 bg-white m-3"
          onClick={handlePreviousPage}
        >
          <FcPrevious />
        </button>
        <div className="ml-14  lg:ml-32 ">
          <div className="flex flex-wrap ">
            {currentProducts.map((product) => (
              <div className=" bg-white p-2 m-2 rounded-lg  lg:bg-white-500 lg:w-72 w-32">
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
      </div>
      <div className="section">
      <div className="text-white m-4 mb-0 text-xl font-bold ">
        All Products
      </div>
      <div className="flex relative ">
        <button
          className="absolute px-1 py-3 left-0 top-56 lg:px-4 lg:py-2 rounded-lg lg:left-0 lg:top-20 bg-white m-3"
          onClick={handlePreviousPage}
        >
          <FcPrevious />
        </button>
        <div className="ml-14  lg:ml-32 ">
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
      </div>
    </div>
  );
};

export default Allproducts;
