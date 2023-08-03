import React, {useState, useEffect } from 'react'
import './PlayGameListeningPage.css'
import { Image } from 'antd';
import AudioTest from '../AudioFile'
import { practiceActions } from '../../../../../Redux/_actions'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function PlayGameListeningPage({ setIsShowPlayGameListening, setIsShowResult }) {
  const { testIndex } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const dispatch = useDispatch()

  const handleAnswerChange = (answer) => {
    const updatedAnswer = [...selectedAnswer]
    updatedAnswer[currentQuestionIndex] = answer
    setSelectedAnswer(updatedAnswer);
  };

  const isAnswerSelected = () => {
    return selectedAnswer[currentQuestionIndex] !== null
      && selectedAnswer[currentQuestionIndex] !== undefined;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < AudioTest[testIndex].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  };

  const handleSubmitAnswer = () => {
    let countCorrect = 0;
    for (let i = 0; i < AudioTest[testIndex].length; i++) {
      if (selectedAnswer[i] === AudioTest[testIndex][i].optionAnswers.correctAnswer) {
        countCorrect += 1;
      }
    }
    dispatch(practiceActions.saveAnswerFromUser(selectedAnswer))
    const result = { new: 0, correct: countCorrect, incorrect: 6 - countCorrect }
    dispatch(practiceActions.saveResultListeningByTest(testIndex, result))
    setIsShowPlayGameListening(false)
    setIsShowResult(true)
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === AudioTest[testIndex].length - 1);
  }, [currentQuestionIndex, testIndex])

  return (
    <div className='main-playgame-listen'>
      <div className='gird-playgame-listen'>
        <div className='list-question-listen' data-aos="fade-up-right" data-aos-delay="400">
          <div className='title'>
            Part 1: Photos
          </div>
          <div className='showBtnQuestion'>
            <div className='allQuestions'>
              {AudioTest[testIndex].map((item, index) => (
                <div className={`btn-question
                ${currentQuestionIndex === index ? 'currentQuestion' : ''}
                ${selectedAnswer[index] ? 'selected' : ''}   `}
                  key={index}>
                  <div className='num-question'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='show-questions-listen' data-aos="fade-up-left" data-aos-delay="400">
          <audio controls key={Math.random()} className='audio__question'>
            <source src={AudioTest[testIndex][currentQuestionIndex].audioSrc}></source>
          </audio>
          <div className='main-question'>
            <div className='question-image'>
              <Image
                width={400}
                src={AudioTest[testIndex][currentQuestionIndex].imgSrc}
              />
            </div>
            <div className='selected-answer'>
              <div className='answer-item' onClick={() => handleAnswerChange('A')}>
                <input type="radio" id='answerA' className='custom-radio'
                  checked={selectedAnswer[currentQuestionIndex] === 'A'} />
                <label htmlFor="answerA">(A)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerChange('B')}>
                <input type="radio" id='answerB' className='custom-radio'
                  checked={selectedAnswer[currentQuestionIndex] === 'B'}
                  onChange={handleAnswerChange}
                />
                <label htmlFor="answerB">(B)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerChange('C')}>
                <input type="radio" id='answerC' className='custom-radio'
                  checked={selectedAnswer[currentQuestionIndex] === 'C'} />
                <label htmlFor="answerC">(C)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerChange('D')}>
                <input type="radio" id='answerD' className='custom-radio'
                  checked={selectedAnswer[currentQuestionIndex] === 'D'} />
                <label htmlFor="answerD">(D)</label>
              </div>
            </div>
            {!isLastQuestion ? (
              <>
                {isAnswerSelected() && (
                  <button className='btn-common-attributes-pink' onClick={handleNextQuestion}>Next</button>
                )}
              </>
            ) : (
              <>
                {isAnswerSelected() && (
                  <button className='btn-common-attributes-aqua' onClick={handleSubmitAnswer}>Submit</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayGameListeningPage