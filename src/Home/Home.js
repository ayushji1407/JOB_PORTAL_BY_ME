import React, { useContext } from 'react'
import {Context} from '../index.js'
import { Navigate } from 'react-router-dom';
import HeroSection from "./HeroSection.js";
import HowltWorks from "./HowltWorks.js";
import PopularCategories from "./PopularCategories.js";
import PopularCompanies from "./PopularCompanies.js"

const Home = () => {
  const {isAuthorized} = useContext(Context);
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='homepage page'>
      <HeroSection/>
      <HowltWorks/>
      <PopularCategories/>
      <PopularCompanies/>
    </section>
  )
}

export default Home