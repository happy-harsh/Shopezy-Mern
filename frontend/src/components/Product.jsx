import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
const Product = () => {
  const dispatch = useDispatch();
  const stat = useSelector((state)=> state.products);
  const data = useSelector((state)=> state.products.data);
  const loading = useSelector((state)=> state.products.loading);
  const error = useSelector((state)=> state.products.error);
  console.log(stat)

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
    <div>
      <h6>All Products</h6>
          <div className="flex relative ">
        <div className="ml-14  lg:ml-32 ">
          <div className="flex flex-wrap ">
            {data &&data.map((product) => (
              <div className=" bg-grey p-2 m-2 rounded-lg  lg:bg-white-500 lg:w-72 w-32">
                <img
                  src={product.proImg}
                  alt={product.proName}
                  className="w-full h-40 object-cover mb-4"
                />
                <h1>{product.proName}</h1>
                <h2 className="text-lg font-semibold mb-2">{product.proDesc}</h2>
                <p >{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product