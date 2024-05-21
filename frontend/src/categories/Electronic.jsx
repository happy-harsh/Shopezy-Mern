import React from 'react'
import NavBar from '../components/NavBar';
import CategoryProducts from '../components/CategoryProducts';


const Electronic = () => {
  return (
    <div>
        <NavBar/>
        <CategoryProducts category="electronics"/>
    </div>
  )
}

export default Electronic;