import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (

    <footer className=" text-white py-5 " style={{backgroundColor:" #013952"}}>
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center justify-center">
        <div className="mb-5 mx-5 text-lg flex items-center">
          <a href="#" className="mr-3">
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a href="#" className="mr-3">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="mr-3">
            <i className="fab fa-google-plus-g fa-lg"></i>
          </a>
          <a href="#" className="mr-3">
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
          <a href="#" className="mr-3">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#">
            <i className="fab fa-pinterest fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
  
    <div className="text-center py-3">
      ©2023 Copyright <Link to="/" className="text-white">Shopezy.com</Link>
    </div>
  </footer>
  )
}

export default Footer