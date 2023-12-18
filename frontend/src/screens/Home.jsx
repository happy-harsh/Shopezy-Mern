import React from 'react'

import Hero from '../components/Hero';

import CategoryIcon from '../components/CategoryIcon';
import Footer from '../components/Footer';
import Allproducts from '../components/Allproducts';
import NavBar from '../components/NavBar';
const Home = () => {
  return (
    <div>
        <NavBar/>
        <CategoryIcon/>
        <Hero/>
        <Allproducts/>
        <Footer/>
    </div>
  )
}

export default Home;