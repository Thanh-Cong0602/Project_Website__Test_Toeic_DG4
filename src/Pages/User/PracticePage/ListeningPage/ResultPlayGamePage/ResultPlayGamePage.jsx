import React, { useState } from 'react'
import './ResultPlayGamePage.css'
import { Bezier2 } from 'react-bootstrap-icons'
import PlayGameListeningPage from '../PlayGameListeningPage/PlayGameListeningPage'
import AudioTest from '../AudioFile'
import { Progress, Space, Image } from 'antd';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Check, X } from 'react-bootstrap-icons'
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function ResultPlayGamePage() {
  const { testIndex } = useParams();
  const [isShowPlayGameListening, setIsShowPlayGameListening] = useState(false)
  const [isShowResult, setIsShowResult] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const resultfromPlayGame = useSelector(state => state.practice.saveResultListeningByTest)
  const answerFromUser = useSelector(state => state.practice.saveAnswerFromUser)
  const handleshowQuestionListening = () => {
    setIsShowPlayGameListening(true)
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index)
    const transcriptAnswerElement = document.getElementById(`show_answer_item_${index}`);
    if (transcriptAnswerElement) {
      transcriptAnswerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const percentageCorrect = Math.round((resultfromPlayGame[testIndex].correct / AudioTest[testIndex].length) * 100);
  return (
    <>
      {!isShowPlayGameListening ? (
        <>
          <div className='main__result__playgame__listen'>
            <div className='gird-playgame-listen'>
              <div className='list-question-listen'
                data-aos="fade-up-right"
                data-aos-delay="400"
                data-aos-once="true" >
                <div className='title'>
                  Part 1: Photos
                </div>
                <div className='showQuestionListen'>
                  <div className='allQuestions'>
                    {AudioTest[testIndex].map((item, index) => (
                      <div className={`btn-question
                          ${currentQuestionIndex === index ? 'currentQuestion' : ''} `}
                        key={index}
                        onClick={() => handleQuestionClick(index)}>
                        <span className='num-question'>{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='grid__playgame__right'>
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
                            {AudioTest[testIndex].length}
                          </div>
                          <div className='result-text'>
                            Total
                          </div>
                        </div>
                        <div className='result-item'>
                          <div className='result-correct'>
                            {resultfromPlayGame[testIndex].correct}
                          </div>
                          <div className='result-text'>
                            Correct
                          </div>
                        </div>
                        <div className='result-item'>
                          <div className='result-incorrect'>
                            {resultfromPlayGame[testIndex].incorrect}
                          </div>
                          <div className='result-text'>
                            Incorrect
                          </div>
                        </div>
                      </div>
                      <div className='main-statistics-button'>
                        {resultfromPlayGame[testIndex].new === 0 ? (
                          <>
                            <button className='btn-review-result' onClick={() => handleQuestionClick(0)}>
                              REVIEW</button>
                            <button className='btn-again-playgame' onClick={() => setIsShowPlayGameListening(true)}>
                              TRY AGAIN</button>
                          </>
                        ) : (
                          <>
                            <button className='btn-again-playgame' onClick={handleshowQuestionListening} >
                              START
                            </button>
                          </>
                        )}
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
                            {AudioTest[testIndex].length}
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
                            {resultfromPlayGame[testIndex].new}
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
                            {resultfromPlayGame[testIndex].correct}
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
                            {resultfromPlayGame[testIndex].incorrect}
                          </button>
                        </div>
                        <div className='item-text-incorrect'>
                          Incorrect
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {resultfromPlayGame[testIndex].new === 0 ? (
                  <div className='main__show__answer'>
                    {AudioTest[testIndex].map((item, index) => (
                      <div className='show_answer_item' id={`show_answer_item_${index}`}>
                        <div className='number-question'>Question {index + 1}</div>
                        <div className='audio__question'>
                          <audio controls key={Math.random()} className='audio__question'>
                            <source src={AudioTest[testIndex][index].audioSrc}></source>
                          </audio>
                        </div>
                        <Image width={400} src={AudioTest[testIndex][index].imgSrc} />
                        <div className='show_correct_answer'>
                          {answerFromUser[index] === 'A' ? (
                            <>
                              {answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(A)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_false'>
                                    <X size={20} />
                                  </div>
                                  <label className='label__false'>(A)</label>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {AudioTest[testIndex][index].optionAnswers.correctAnswer === 'A' ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(A)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_none'>
                                  </div>
                                  <label className='label__none'>(A)</label>
                                </div>
                              )}
                            </>
                          )}

                          {answerFromUser[index] === 'B' ? (
                            <>
                              {answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(B)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_false'>
                                    <X size={20} />
                                  </div>
                                  <label className='label__false'>(B)</label>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {AudioTest[testIndex][index].optionAnswers.correctAnswer === 'B' ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(B)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_none'>
                                  </div>
                                  <label className='label__none'>(B)</label>
                                </div>
                              )}
                            </>
                          )}

                          {answerFromUser[index] === 'C' ? (
                            <>
                              {answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(C)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_false'>
                                    <X size={20} />
                                  </div>
                                  <label className='label__false'>(C)</label>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {AudioTest[testIndex][index].optionAnswers.correctAnswer === 'C' ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(C)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_none'>
                                  </div>
                                  <label className='label__none'>(C)</label>
                                </div>
                              )}
                            </>
                          )}

                          {answerFromUser[index] === 'D' ? (
                            <>
                              {answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(D)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_false'>
                                    <X size={20} />
                                  </div>
                                  <label className='label__false'>(D)</label>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {AudioTest[testIndex][index].optionAnswers.correctAnswer === 'D' ? (
                                <div className='answer_item'>
                                  <div className='custom_circle_true'>
                                    <Check size={20} />
                                  </div>
                                  <label>(D)</label>
                                </div>
                              ) : (
                                <div className='answer_item'>
                                  <div className='custom_circle_none'>
                                  </div>
                                  <label className='label__none'>(D)</label>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div className='show_transcript_answer'>
                          <h3>Transcript</h3>
                          <p className={answerFromUser[index] === 'A' ?
                            (answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer
                              ? 'correct-answer' : 'incorrect-answer')
                            : (AudioTest[testIndex][index].optionAnswers.correctAnswer === 'A' ? 'correct-answer' : '')}>
                            (A) {AudioTest[testIndex][index].optionAnswers.answerA}
                          </p>
                          <p className={answerFromUser[index] === 'B' ?
                            (answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer
                              ? 'correct-answer' : 'incorrect-answer')
                            : (AudioTest[testIndex][index].optionAnswers.correctAnswer === 'B' ? 'correct-answer' : '')}>
                            (B) {AudioTest[testIndex][index].optionAnswers.answerB}
                          </p>
                          <p className={answerFromUser[index] === 'C' ?
                            (answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer
                              ? 'correct-answer' : 'incorrect-answer')
                            : (AudioTest[testIndex][index].optionAnswers.correctAnswer === 'C' ? 'correct-answer' : '')}>
                            (C) {AudioTest[testIndex][index].optionAnswers.answerC}
                          </p>
                          <p className={answerFromUser[index] === 'D' ?
                            (answerFromUser[index] === AudioTest[testIndex][index].optionAnswers.correctAnswer
                              ? 'correct-answer' : 'incorrect-answer')
                            : (AudioTest[testIndex][index].optionAnswers.correctAnswer === 'D' ? 'correct-answer' : '')}>
                            (D) {AudioTest[testIndex][index].optionAnswers.answerD}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) :
                  (<>
                  </>)}
              </div>
            </div>
          </div>
        </>) :
        (
          <PlayGameListeningPage setIsShowPlayGameListening={setIsShowPlayGameListening} setIsShowResult={setIsShowResult} />
        )}
    </>
  )
}

export default ResultPlayGamePage