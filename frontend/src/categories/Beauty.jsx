import React from 'react'
import NavBar from '../components/NavBar';
import CategoryProducts from '../components/CategoryProducts';


const Beauty = () => {
  return (
    <div>
        <NavBar/>
        <CategoryProducts category="beauty"/>
    </div>
  )
}

export default Beauty;