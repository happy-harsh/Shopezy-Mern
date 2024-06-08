import React from 'react'

import Hero from '../components/Hero';

import CategoryIcon from '../components/CategoryIcon';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HomeProducts from '../components/HomeProducts';
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow">
        <CategoryIcon />
        <Hero />
        <HomeProducts />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Home;