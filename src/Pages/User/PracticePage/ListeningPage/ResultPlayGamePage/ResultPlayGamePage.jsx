import React, { useState } from 'react'
import './ResultPlayGamePage.css'
import { Bezier2 } from 'react-bootstrap-icons'
import PlayGameListeningPage from '../PlayGameListeningPage/PlayGameListeningPage'
import Picture_Part1 from '../../../../../Assets/image_part1.png'
import AudioTest from '../AudioFile'
import { Progress, Space } from 'antd';
import { useSelector } from 'react-redux'
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function ResultPlayGamePage() {
  const [isShowPlayGameListening, setIsShowPlayGameListening] = useState(false)
  const [isShowResult, setIsShowResult] = useState(false)
  const correctAnswer = useSelector(state => state.practice.saveResultPlayGameListening)
  const handleshowQuestionListening = () => {
    setIsShowPlayGameListening(true)
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex)
  }
  const percentageCorrect = Math.round((correctAnswer / AudioTest.length) * 100);
  return (
    <>
      {!isShowPlayGameListening ?
        (
          <div>
            <div className='main-result-playgame-listen'>
              <div className='gird-playgame-listen'>
                <div className='list-question-listen' data-aos="fade-up-right" data-aos-delay="400">
                  <div className='title'>
                    Part 1
                  </div>
                  <div className='showQuestionListen'>
                    <div className='allQuestions'>
                      {AudioTest.map((item, index) => (
                        <div className={`btn-question
                          ${currentQuestionIndex === index ? 'currentQuestion' : ''}
                          `}
                          key={index}
                          onClick={() => handleQuestionClick(index)}>

                          <span className='num-question'>{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='grid__playgame_right'>
                  <div className='result-questions-listen' data-aos="fade-up-left" data-aos-delay="400">
                    <div className='main-result-overview-bgr'>
                      <span className='bubble-top-left'></span>
                      <span className='small-bubble-left'></span>
                      <span className='ellipse-left'></span>
                      <span className='ellipse-right'></span>
                      <span className='bubble-bottom-right'></span>
                    </div>

                    <div className='main-result-overview-data'>
                      <div className='main-percentage'>
                        <div className='main-percentage-box'></div>
                        <div className='box-layer2'></div>
                        <div className='box-layer3'>
                          <Space wrap>
                            <Progress type="circle" percent={percentageCorrect} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                              style={{ fontWeight: '700' }} />
                          </Space>
                        </div>
                        <span className='percentage-text'>

                        </span>
                      </div>
                      <div className='main-statistics'>
                        <div className='main-statistics-result'>
                          <div className='result-item'>
                            <div className='result-total'>
                              {AudioTest.length}
                            </div>
                            <div className='result-text'>
                              Total
                            </div>
                          </div>
                          <div className='result-item'>
                            <div className='result-correct'>
                              {correctAnswer}
                            </div>
                            <div className='result-text'>
                              Correct
                            </div>
                          </div>
                          <div className='result-item'>
                            <div className='result-incorrect'>
                              {AudioTest.length - correctAnswer}
                            </div>
                            <div className='result-text'>
                              Incorrect
                            </div>
                          </div>
                        </div>
                        <div className='main-statistics-button'>
                          {/* <button className='btn-review-result'>REVIEW</button> */}
                          {/* <button className='btn-again-playgame'>TRY AGAIN</button> */}
                          <button className='btn-again-playgame'
                            onClick={handleshowQuestionListening}
                          >START</button>
                        </div>
                      </div>
                    </div>

                    <div className='main-result-overview-question-categories'>
                      <div className='title'>
                        Press and Practice Your Category Again Below
                      </div>
                      <div className='categories-list'>
                        <div className='category-item'>
                          <div className='category-item-circle'>
                            <button className='category-total'>
                              {AudioTest.length}
                            </button>
                          </div>
                          <div className='item-text-total'>
                            Total
                          </div>
                        </div>
                        <Bezier2 className='center-icon' />
                        <div className='category-item'>
                          <div className='category-item-circle'>
                            <button className='category-new'>
                              0
                            </button>
                          </div>
                          <div className='item-text-new'>
                            New
                          </div>
                        </div>
                        <Bezier2 className='center-icon' />
                        <div className='category-item'>
                          <div className='category-item-circle'>
                            <button className='category-correct'>
                              {correctAnswer}
                            </button>
                          </div>
                          <div className='item-text-correct'>
                            Correct
                          </div>
                        </div>
                        <Bezier2 className='center-icon' />
                        <div className='category-item'>
                          <div className='category-item-circle'>
                            <button className='category-incorrect'>
                              {AudioTest.length - correctAnswer}
                            </button>
                          </div>
                          <div className='item-text-incorrect'>
                            Incorrect
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isShowResult ? (
                    <div className='main-show-answer'>
                      {AudioTest.map((item, index) => (
                        <div>
                          <div className='number-question'>Question {index + 1}</div>
                          <div className='audio__question'>
                            <audio controls key={Math.random()} className='audio__question'>
                              <source src={AudioTest[index].audioSrc}></source>
                            </audio>
                          </div>
                          <img src={Picture_Part1} />
                        </div>
                      ))}
                    </div>
                  ) :
                    (<>
                    </>)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PlayGameListeningPage setIsShowPlayGameListening={setIsShowPlayGameListening} setIsShowResult={setIsShowResult} />
        )}
    </>
  )
}

export default ResultPlayGamePage