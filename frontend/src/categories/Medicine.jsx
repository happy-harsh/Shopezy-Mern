import React from 'react'
import NavBar from '../components/NavBar';
import CategoryProducts from '../components/CategoryProducts';


const Medicine = () => {
  return (
    <div>
        <NavBar/>
        <CategoryProducts category="medicine"/>
    </div>
  )
}

export default Medicine;