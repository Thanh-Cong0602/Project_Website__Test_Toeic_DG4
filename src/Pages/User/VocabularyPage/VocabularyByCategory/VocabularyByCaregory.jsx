import React, { useEffect, useState } from 'react'
import PlayGameVocabulary from '../PlayGameVocabulary/PlayGameVocabulary'
import './VocabularyByCategory.css'
import { useSelector } from 'react-redux';
import { getVocabularyByCategory } from '../../../../Api/Service/vocabulary.service'
import { toast } from "react-toastify";
import { VolumeUp } from 'react-bootstrap-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function VocabularyByCaregory() {
  const currentCategory = useSelector(state => state.vocabulary.currentCategory)
  const resultfromPlayGame = useSelector(state => state.vocabulary.saveResultPlayGame)
  const [isShowPlayGame, setIsShowPlayGame] = useState(false);
  const [vocabularyList, setVocabularyList] = useState([]);
  const [vocabulariesID, setVocabulariesID] = useState([]);
  useEffect(() => {
    getVocabularyByCategory(`vocabularies/getVocabulariesByCategoryId?categoryId=${currentCategory.categoryID}`).then((res => {
      const idList = res.data.data.map((item) => item.id);
      setVocabulariesID(idList)
      setVocabularyList(res.data.data)
    })).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [currentCategory.categoryID]);

  const findTopicIndexById = () => {
    return resultfromPlayGame.findIndex((topic) =>
      topic.categoryID === currentCategory.categoryID
    )
  };

  const index = findTopicIndexById()

  const handleSpeakVocabulary = (word) => {
    const value = new SpeechSynthesisUtterance(word)
    window.speechSynthesis.speak(value)
  };


  const handleShowPlayGame = () => {
    setIsShowPlayGame(true)
  }
  return (
    <>
      {!isShowPlayGame ? (
        <div className='main-study-view-lexical'>
          <div className='main-study-flex'>
            <div className='study-layout-left' data-aos="fade-right" data-aos-delay="400">
              <div className='title'>
                <h2>{currentCategory.categoryName}</h2>
              </div>
              <div className='showResult'>
                <div className='result'>
                  {index === -1 ? (
                    <>
                      0/{vocabularyList.length}
                      <div className=''>
                        Result
                      </div>
                    </>
                  ) : (
                    <>
                      {resultfromPlayGame[index].correctAnswer} / {vocabularyList.length}
                      <div className=''>
                        Result
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='study-layout-right'>
              <div className='flash-card-overview' data-aos="fade-left" data-aos-delay="400">
                <h2>Overview</h2>
                <div className='overview-all-items'>
                  {
                    vocabularyList.map((item, index) => (
                      <div className='overview-item' key={item.id}>
                        <div className='overview-item-left'>
                          <span className='word'>{item.word}</span>
                          <span className='pronounce'>{item.pronounce}</span>
                          <span>{item.mean}</span>
                        </div>
                        <div className='audio' onClick={() => { handleSpeakVocabulary(item.word) }}>
                          <VolumeUp fontSize={25} />
                        </div>
                      </div>
                    ))
                  }
                </div>

                <input type='submit' className='btn-playGame' value={"Play game"}
                  onClick={handleShowPlayGame} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PlayGameVocabulary
          setIsShowPlayGame={setIsShowPlayGame}
          vocabulariesID={vocabulariesID} />
      )}
    </>
  )
}

export default VocabularyByCaregory