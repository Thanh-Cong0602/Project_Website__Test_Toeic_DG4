import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Banner from '../../Components/User/Banner/Banner'
import Navbar from '../../Components/User/Navbar/Navbar'
const User = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default User
