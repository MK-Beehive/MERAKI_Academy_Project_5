import React from 'react'
import "./navbar.css"
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { Routes, Route, Link, useParams ,useNavigate, json } from "react-router-dom";


const Navbar = () => {
  const Navigate = useNavigate();
  defineElement(lottie.loadAnimation);
  return (
    <div className='navbarall'>
<div className='navbar'>
  <div className='logo'><h3 className='beehive' style={{color:'rgb(255, 217, 0)'}}>BEE <span style={{color:'black'}}>HIVE</span>  </h3><img className='picofLogo'  src='https://media.istockphoto.com/id/1338079809/vector/bee-cute-character-with-big-eyes-cartoon-happy-bee.jpg?s=612x612&w=0&k=20&c=C9PNLseWKMZPD6KMpQOa3pkOogGUftOTQAtMfYm4GU8='/>  

     <div className='billwithnot'> <svg className='bill'
      viewBox="0 0 21 21"
      fill="black"
      height="30px"
      width="30px"
    >
      <path
        fill="black"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.585 15.5H5.415A1.65 1.65 0 014 13a10.526 10.526 0 001.5-5.415V6.5a4 4 0 014-4h2a4 4 0 014 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 01-1.415 2.5zM13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
      />
    </svg>    <h3 className='notificationNumber'>0</h3></div>

  </div>
  

<div>
<input className="searchbar" placeholder="search" />
    <button className="search">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="20"
        fill="black"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </button>
    </div>
    <Link className="projectlink" to="/projects">Projects</Link>
     
    </div>
    <hr width="100%"  />
    </div>
  )
}

export default Navbar