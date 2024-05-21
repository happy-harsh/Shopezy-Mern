import React from 'react'
import NavBar from '../components/NavBar';
import CategoryProducts from '../components/CategoryProducts';


const Household = () => {
  return (
    <div>
        <NavBar/>
        <CategoryProducts category="household"/>
    </div>
  )
}

export default Household;