import React, { useRef, useState, useEffect } from 'react'
import './PlayGameListeningPage.css'
import Picture_Part1 from '../../../../../Assets/image_part1.png'
import AudioTest from '../AudioFile'
import AudioController from '../AudioController/AudioController';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function PlayGameListeningPage({ setIsShowPlayGameListening, setIsShowResult }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex)
  }
  const handleNextQuestion = () => {
    if (currentQuestionIndex < AudioTest.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  const handleSubmitAnswer = () => {
    setIsShowPlayGameListening(false)
    setIsShowResult(true)
    window.scrollTo({ top: 0, behavior: 'smooth', playbackRate: 2.0 });
  }

  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === AudioTest.length - 1);
  }, [currentQuestionIndex])

  return (
    <div className='main-playgame-listen'>
      <div className='gird-playgame-listen'>
        <div className='list-question-listen' data-aos="fade-up-right" data-aos-delay="400">
          <div className='title'>
            Part 1
          </div>
          <div className='showBtnQuestion'>
            <div className='allQuestions'>
              {AudioTest.map((item, index) => (
                <div className={`btn-question
                ${currentQuestionIndex === index ? 'currentQuestion' : ''}
                `}
                  key={index}
                  onClick={() => handleQuestionClick(index)}>
                  <div className='num-question'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='show-questions-listen' data-aos="fade-up-left" data-aos-delay="400">
    
          <AudioController AudioTest={AudioTest} currentQuestionIndex={currentQuestionIndex} />
          <div className='main-question'>
            <div className='question-image'>
              <img src={Picture_Part1} />
            </div>
            <div className='selected-answer'>
              <div className='answer-item' onClick={() => handleAnswerClick('A')}>
                <input type="radio" id='answerA' className='custom-radio'
                  checked={selectedAnswer === 'A'} />
                <label htmlFor="answerA">(A)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerClick('B')}>
                <input type="radio" id='answerB' className='custom-radio'
                  checked={selectedAnswer === 'B'} />
                <label htmlFor="answerB">(B)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerClick('C')}>
                <input type="radio" id='answerC' className='custom-radio'
                  checked={selectedAnswer === 'C'} />
                <label htmlFor="answerC">(C)</label>
              </div>
              <div className='answer-item' onClick={() => handleAnswerClick('D')}>
                <input type="radio" id='answerD' className='custom-radio'
                  checked={selectedAnswer === 'D'} />
                <label htmlFor="answerD">(D)</label>
              </div>
            </div>
            {!isLastQuestion ? (
              <>
                <button className='btn-common-attributes-pink' onClick={handleNextQuestion}>Next</button>
              </>
            ) : (
              <>
                <button className='btn-common-attributes-aqua' onClick={handleSubmitAnswer}>Submit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayGameListeningPage