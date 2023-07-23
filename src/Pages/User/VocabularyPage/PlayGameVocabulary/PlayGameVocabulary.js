import React, { useEffect, useState } from 'react'
import './PlayGameVocabulary.css'
import { getQuestionByCategory } from '../../../../Api/Service/vocabulary.service';
import { getCorrectAnswer } from '../../../../Api/Service/vocabulary.service';
import { userId } from '../../../../Api/userID';
import ImageVocabulary from '../../../../Assets/vocabulary_image.png'
import { useDispatch, useSelector } from 'react-redux';
import { vocabularyActions } from '../../../../Redux/_actions';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function PlayGameVocabulary({setIsShowPlayGame}) {
  const currentCategory = useSelector(state => state.vocabulary.currentCategory)
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([])
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    getQuestionByCategory('vocabularyQuestions').then((res) => {
      const shuffledQuestions = shuffleArray(res.data.data)
      setQuestions(shuffledQuestions);
      for (let i = 0; i < res.data.data.length; i++) {
        res.data.data[i].answers = shuffleArray(res.data.data[i].answers)
      }
      setCurrentQuestion(res.data.data[0])
      setDataLoaded(true);
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
  }

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

  const checkAnswer = (selectedAnswers) => {
    const body = {
      "userId": userId,
      "requestVocabularyAnswers": selectedAnswers
    }
    getCorrectAnswer('vocabularyQuestions/sendVocabularyAnswers', body).then((res) => {
      setCorrectAnswer(res.data.data.vocabularyAnswers)
      console.log(res.data.data.vocabularyAnswers)
      let count = 0
      const vocabularyAnswers = res.data.data.vocabularyAnswers
      for (let i = 0; i < vocabularyAnswers.length; i++) {
        if (vocabularyAnswers[i].isCorrect) {
          count += 1
        }
      }
      setCountCorrectAnswer(count)
      dispatch(vocabularyActions.saveResultPlayGame(count))
      setCurrentQuestionIndex(0)
      const messageSuccess = "You have completed all question!"
      toast.success(messageSuccess, { autoClose: 2000 })
      setIsShowAnswer(true)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === questions.length) {
      checkAnswer(selectedAnswers)
    }
    else {
      const messageWarn = "You need to complete all questions!!!"
      toast.warn(messageWarn, { autoClose: 2000 })
    }
  };

  const handleExitPlayGame = () => {
    setIsShowPlayGame(false)
  }
  return (
    <>
      {isDataLoaded && (
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
                </>
              ) : (
                <>
                  <div className='showAnswer'>
                    <div className='answer-items'>
                      {
                        correctAnswer.map((item, index) => {
                          return (
                            <div className={`answer-item
                                    ${currentQuestionIndex === index ? 'borderAnswer' : ''}
                                    ${item.isCorrect ? 'answer-item-true' : 'answer-item-false'}`}
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
                          Question {currentQuestionIndex + 1} : {currentQuestion.question}
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerA" name="answer"
                            value={currentQuestion.answers[0]}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.answers[0]}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerA'>
                            A. {currentQuestion.answers[0]}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerB" name="answer"
                            value={currentQuestion.answers[1]}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.answers[1]}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerB'>
                            B. {currentQuestion.answers[1]}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerC" name="answer"
                            value={currentQuestion.answers[2]}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.answers[2]}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerC'>
                            C. {currentQuestion.answers[2]}
                          </label>
                        </div>
                        <div className='answer'>
                          <input type='radio' id="answerD" name="answer"
                            value={currentQuestion.answers[3]}
                            checked={selectedAnswers[currentQuestionIndex]?.userAnswer === currentQuestion.answers[3]}
                            onChange={handleAnswerChange}
                            className='custom-radio'
                          />
                          <label htmlFor='answerD'>
                            D. {currentQuestion.answers[3]}
                          </label>
                        </div>
                        {(correctAnswer.length > 0) ? (
                          <>
                            <div className='correctAnswer'>
                              Correct answer is <span>{correctAnswer[currentQuestionIndex].correctAnswer}</span>
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
      )}
    </>
  )
}

export default PlayGameVocabulary