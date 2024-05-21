import React from 'react'

import Hero from '../components/Hero';

import CategoryIcon from '../components/CategoryIcon';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HomeProducts from '../components/HomeProducts';
const Home = () => {
  return (
    <div>
        <NavBar/>
        <CategoryIcon/>
        <Hero/>
        <HomeProducts/>
        <Footer/>
    </div>
  )
}

export default Home;