import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../../Components/User/Navbar/Navbar'
import Banner from '../../Components/User/Banner/Banner'
import Footer from '../../Components/User/Footer/Footer'
import HomePage from './HomePage/HomePage';
import VocabularyByCaregory from './VocabularyPage/VocabularyByCategory/VocabularyByCaregory';
import VocabularyCategories from './VocabularyPage/VocabularyCategories/VocabularyCategories';
import PracticePage from './PracticePage/PracticePage';
import MainListeningPage from './PracticePage/ListeningPage/MainListeningPage/MainListeningPage';
import PracticeListeningPage from './PracticePage/ListeningPage/PracticeListeningPage/PracticeListeningPage';
import ResultPlayGamePage from './PracticePage/ListeningPage/ResultPlayGamePage/ResultPlayGamePage';
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
      <Routes>
        <Route path='/practice' element={<>
          <Banner />
          <PracticePage />
        </>} />
        <Route path='/practice/listening' element={<MainListeningPage />} />
        <Route path='/practice/practicelistening' element={<PracticeListeningPage />} />
        <Route path='/practice/playGameListening' element={<ResultPlayGamePage />} />
        <Route path='/practice/writing' element={<PracticePage />} />
        <Route path='/practice/speaking' element={<PracticePage />} />
        <Route path='/practice/reading' element={<PracticePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default User
