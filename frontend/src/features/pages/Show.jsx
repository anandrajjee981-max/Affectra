import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Second from './Second'

const Show = () => {
  return (
    <div>
      <Navbar/>
      <div id="hero">  <Hero/></div>
    <div id="feature">  <Second/></div>
    
    </div>
  )
}

export default Show

