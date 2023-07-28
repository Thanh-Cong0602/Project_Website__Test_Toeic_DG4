import React, { useRef, useState, useEffect } from 'react'
import './PlayGameListeningPage.css'
import Picture_Part1 from '../../../../../Assets/image_part1.png'
import AudioTest from '../AudioFile'
import { practiceActions } from '../../../../../Redux/_actions'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useDispatch } from 'react-redux';
AOS.init();

function PlayGameListeningPage({ setIsShowPlayGameListening, setIsShowResult }) {
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const correctAnswers = ["A", "B", "C", "D", "A", "B"]
  const dispatch = useDispatch()
  const handleAnswerChange = (answer) => {
    const updatedAnswer = [...selectedAnswer]
    updatedAnswer[currentQuestionIndex] = answer
    setSelectedAnswer(updatedAnswer);
  };


  const handleNextQuestion = () => {
    if (currentQuestionIndex < AudioTest.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  const compareAnswers = () => {
    let count = 0;
    for (let i = 0; i < AudioTest.length; i++) {
      if (selectedAnswer[i] == correctAnswers[i]) {
        count += 1;
      }
    }
    dispatch(practiceActions.saveResultPlayGameListening(count))
    setIsShowPlayGameListening(false)
    setIsShowResult(true)
    window.scrollTo({ top: 0 });
  };

  const handleSubmitAnswer = () => {
    compareAnswers();
  };

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
                ${selectedAnswer[index] ? 'selected' : ''}
                `}
                  key={index}>
                  <div className='num-question'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='show-questions-listen' data-aos="fade-up-left" data-aos-delay="400">
          <audio controls key={Math.random()} className='audio__question'>
            <source src={AudioTest[currentQuestionIndex].audioSrc}></source>
          </audio>
          <div className='main-question'>
            <div className='question-image'>
              <img src={Picture_Part1} />
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