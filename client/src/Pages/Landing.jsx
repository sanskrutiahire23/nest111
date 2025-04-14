import React from 'react'
import Howitworks from '../LandingPage/Howitworks'
import Benefits from '../LandingPage/Benefits'
import Faqs from '../LandingPage/Faqs'
import Footer from '../LandingPage/Footer'
import Hero from '../LandingPage/Hero'
import Nav from '../LandingPage/Nav'
import Carousel from '../LandingPage/Carousel'

const Landing = () => {
  return (
    <>
    <Nav/>
    <Hero/>
    <Carousel/>
    <Howitworks/>
    <Benefits/>
    <Faqs/>
    <Footer/>
    </>
  )
}

export default Landing