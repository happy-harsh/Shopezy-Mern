import React from 'react'

import Hero from '../components/Hero';

import CategoryIcon from '../components/CategoryIcon';
import Footer from '../components/Footer';
import AllProducts from '../components/Allproducts';
import NavBar from '../components/NavBar';
const Home = () => {
  return (
    <div>
        <NavBar/>
        <CategoryIcon/>
        <Hero/>
        <AllProducts/>
        <Footer/>
    </div>
  )
}

export default Home;