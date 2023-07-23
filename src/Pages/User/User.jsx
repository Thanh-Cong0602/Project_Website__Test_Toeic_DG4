import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../../Components/User/Navbar/Navbar'
import Banner from '../../Components/User/Banner/Banner'
import Footer from '../../Components/User/Footer/Footer'
import HomePage from './HomePage/HomePage';
import VocabularyByCaregory from './VocabularyPage/VocabularyByCategory/VocabularyByCaregory';
import VocabularyCategories from './VocabularyPage/VocabularyCategories/VocabularyCategories';
const User = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/homepage' element={<>
          <Banner />
          <HomePage />
        </>} />
      </Routes>
      <Routes>
        <Route path='/vocabulary' element={<>
          <Banner />
          <VocabularyCategories />
        </>} />

        <Route path='/vocabulary/:topic' element={<>
          <Banner />
          <VocabularyByCaregory />
        </>} />
      </Routes>
      <Footer />
    </>
  )
}

export default User
