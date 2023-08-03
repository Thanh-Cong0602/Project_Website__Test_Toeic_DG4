import React, { useCallback, useEffect, useState } from 'react'
import './PlayGameVocabulary.css'
import { getQuestionByCategory } from '../../../../Api/Service/vocabulary.service';
import ImageVocabulary from '../../../../Assets/vocabulary_image.png'
import { useDispatch, useSelector } from 'react-redux';
import { vocabularyActions } from '../../../../Redux/_actions';
import { CloseCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { toast } from "react-toastify";
import Countdown from 'react-countdown';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function PlayGameVocabulary({ setIsShowPlayGame, vocabulariesID, deadline }) {
  const currentCategory = useSelector(state => state.vocabulary.currentCategory)
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch()
  const [timeStart, setTimeStart] = useState(null);

  useEffect(() => {
    getQuestionByCategory('questions/getByObjectTypeIds', vocabulariesID).then((res) => {
      setIsDataLoaded(false)
      const questionAPI = res.data.data
      const shuffledQuestions = shuffleArray(questionAPI)
      setQuestions(shuffledQuestions);
      const answerKeys = ["answerA", "answerB", "answerC", "answerD"];
      questionAPI.map((item) => {
        const shuffledAnswerKeys = shuffleArray(answerKeys);
        const shuffledOptionAnswers = {};
        shuffledAnswerKeys.forEach((key) => {
          shuffledOptionAnswers[key] = item.optionAnswers[key];
        });
        return {
          ...item,
          optionAnswers: shuffledOptionAnswers,
        };
      });
      setCurrentQuestion(shuffledQuestions[0])
      setIsDataLoaded(true);
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex])
    setIsLastQuestion(currentQuestionIndex === questions.length - 1);
  }, [currentQuestionIndex, questions])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = { questionId: currentQuestion.id, userAnswer: e.target.value };
    setSelectedAnswers(updatedAnswers);
  };

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex)
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === questions.length) {
      const elapsedTime = 60000 * 0.5 - (deadline - Date.now());
      let count = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].optionAnswers.correctAnswer === selectedAnswers[i].userAnswer) {
          count += 1;
        }
      }
      setCountCorrectAnswer(count)
      const resultData = {
        categoryID: currentCategory.categoryID,
        categoryName: currentCategory.categoryName,
        correctAnswer: count,
        countdown: elapsedTime
      }
      dispatch(vocabularyActions.saveResultPlayGame(resultData))
      setCurrentQuestionIndex(0)
      const messageSuccess = "You have completed all question!"
      toast.success(messageSuccess, { autoClose: 2000 })
      setIsShowAnswer(true)
    }
    else {
      const messageWarn = "You need to complete all questions!!!"
      toast.warn(messageWarn, { autoClose: 2000 })
    }
  };

  const handleExitPlayGame = () => {
    setIsShowPlayGame(false)
  }

  const autoSave = () => {
    questions.map((item, index) => {
      if (selectedAnswers[index] === undefined) {
        selectedAnswers[index] = { questionId: item.id, userAnswer: "NULL" }
      }
    })
    handleSubmitAnswer();
  };

  const convertTime = () => {
    const elapsedTime = 60000 * 0.5 - (deadline - Date.now());
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${minutes} m ${seconds} s`
  }

  const renderer = ({ minutes, seconds }) => {
    return (
      <span className={`${seconds < 20 ? 'countdown-timer' : ''} `}>
        {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </span>
    );
  };

  return (
    <>
      {isDataLoaded ? (
        <div className='main-study-vocabulary'>
          <div className='main-study-flex'>
            <div className='study-layout-left'>
              <div className='title'>
                <h2>{currentCategory.categoryName}</h2>
              </div>
              {!isShowAnswer ? (
                <>
                  <div className='showQuestion' data-aos="fade-right" data-aos-delay="400">
                    <div className='allQuestions'>
                      {questions.map((item, index) => (
                        <div className={`btn-question 
                           ${currentQuestionIndex === index ? 'currentQuestion' : ''}
                           ${selectedAnswers[index] ? 'selected' : ''}`}
                          key={item.id}
                          onClick={() => handleQuestionClick(index)}>
                          <span className='num-question'>{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='countdown__time'>
                    <ClockCircleTwoTone />
                    <Countdown date={deadline}
                      onComplete={autoSave}
                      renderer={renderer}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='showAnswer'>
                    <div className='answer-items'>
                      {
                        questions.map((item, index) => {
                          return (
                            <div className={`answer-item
                                    ${currentQuestionIndex === index ? 'borderAnswer' : ''}
                                    ${item.optionAnswers.correctAnswer === selectedAnswers[index].userAnswer ? 'answer-item-true' : 'answer-item-false'}`}
                              key={index}
                              onClick={() => handleQuestionClick(index)}>
                              <span className='num-question'>{index + 1}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='result'>
                      <div className='correct'>
                        <div className='btn-correct'></div>
                        <div>
                          <div className='show-correct'>
                            {countCorrectAnswer}/{questions.length} Correct
                          </div>
                        </div>
                      </div>
                      <div className='correct'>
                        <div className='btn-incorrect'></div>
                        <div className='show-correct'>
                          {questions.length - countCorrectAnswer}/{questions.length} Incorrect
                        </div>
                      </div>
                    </div>
                    <div className='elapsedTime'>
                      ElapsedTime: {convertTime()}
                    </div>
                    <div className='completed-review'
                      onClick={() => {
                        setIsShowAnswer(false)
                        setIsShowPlayGame(false)
                      }}>
                      Complete Review
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='study-layout-right'>
              <div className='flash-card-overview' data-aos="fade-left" data-aos-delay="400">
                {isShowAnswer ? (
                  <></>
                ) : (
                  <>
                    <div className='exitPlayGame' onClick={handleExitPlayGame}>
                      <CloseCircleTwoTone />
                    </div>
                  </>
                )}
                <div className='flash-card-questions'>
                  <div className='show-Question'>
                    {
                      currentQuestion &&
                      <div>
                        <div className='question'>
                          Question {currentQuestionIndex + 1} : {currentQuestion.textQuestion}
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerA" name="answer"
                            value={currentQuestion.optionAnswers.answerA}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.optionAnswers.answerA}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerA'>
                            A. {currentQuestion.optionAnswers.answerA}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerB" name="answer"
                            value={currentQuestion.optionAnswers.answerB}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.optionAnswers.answerB}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerB'>
                            B. {currentQuestion.optionAnswers.answerB}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerC" name="answer"
                            value={currentQuestion.optionAnswers.answerC}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.optionAnswers.answerC}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerC'>
                            C. {currentQuestion.optionAnswers.answerC}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerD" name="answer"
                            value={currentQuestion.optionAnswers.answerD}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.optionAnswers.answerD}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerD'>
                            D. {currentQuestion.optionAnswers.answerD}
                          </label>
                        </div>
                        {(countCorrectAnswer > 0) ? (
                          <>
                            <div className='correctAnswer'>
                              Correct answer is <span>{questions[currentQuestionIndex].optionAnswers.correctAnswer}</span>
                            </div>
                          </>
                        ) : (
                          <>
                          </>
                        )}
                      </div>
                    }
                  </div>
                  <div className='image-vocabulary'>
                    <img src={ImageVocabulary} alt='Vocabulary' />
                  </div>
                </div>
                {isShowAnswer ? (
                  <>
                  </>
                ) : (
                  <div className='btn-review'>
                    <button
                      className={`btn-prev ${currentQuestionIndex === 0 ? 'disable' : ''}`}
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}>Prev</button>
                    {isLastQuestion ? (
                      <button className='btn-submit' onClick={handleSubmitAnswer}>Submit</button>
                    ) : (
                      <button className='btn-next' onClick={handleNextQuestion}>Next</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading__container">
          <div className="loader"></div>
          <p className='text_loading'>Loading...</p>
        </div>
      )}
    </>
  )
}

export default PlayGameVocabulary