import React from 'react'
import NavBar from '../components/NavBar';
import CategoryProducts from '../components/CategoryProducts';


const Fashion = () => {
  return (
    <div>
        <NavBar/>
        <CategoryProducts category="fashion"/>
    </div>
  )
}

export default Fashion;