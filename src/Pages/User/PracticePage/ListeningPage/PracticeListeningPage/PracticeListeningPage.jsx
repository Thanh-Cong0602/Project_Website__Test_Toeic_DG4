import React from 'react'
import { useSelector } from 'react-redux'
import './PracticeListeningPage.css'
import { Headphones } from 'react-bootstrap-icons'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

function PracticeListeningPage() {
  const numberOfTests = 10;
  const tests = Array.from({ length: numberOfTests }, (_, index) => index + 1);
  const resultfromPlayGame = useSelector(state => state.practice.saveResultListeningByTest)
  return (
    <div className='listen-practice-overview'>
      <div className='title'>
        Start your TOEIC Listening Practice Test Now !!!
      </div>
      <div className='icon-title'>
        <div className='icon-headphone'>
          <Headphones style={{ fontSize: '20px', margin: '4px 0px' }} />
        </div>
        <div className='word'>
          Listening
        </div>
      </div>
      <div className='main-practice-items'>
        <Row gutter={[32, 16]}>
          <Col span={6}  data-aos="fade-up-right" data-aos-delay="400">
            <div className='lesson-item'>
              Lesson 1
            </div>
            <div className='lesson-item'>
              Lesson 2
            </div>
            <div className='lesson-item'>
              Lesson 3
            </div>
            <div className='lesson-item'>
              Lesson 4
            </div>
          </Col>
          <Col span={18} data-aos="fade-up-left" data-aos-delay="400"
          className='practice_test_items'>
            <Row gutter={[0, 32]} justify="space-around">
              {tests.map((item, testIndex) => (
                <Col span={4} offset={testIndex % 5 === 0 ? 1 : 0}
                  className='practice_test_item'>
                  <Link to={`/practice/playGameListening/${testIndex}`} key={testIndex}>
                    <div className='practice_box'>
                      <div className={`test-progress ${resultfromPlayGame[testIndex].new === 0 ? 'test-result' : ''}`}>
                        {Math.round((resultfromPlayGame[testIndex].correct / 6) * 100)} %
                      </div>
                      <div className='test-name'>
                        Test {testIndex + 1}
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}

            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PracticeListeningPage