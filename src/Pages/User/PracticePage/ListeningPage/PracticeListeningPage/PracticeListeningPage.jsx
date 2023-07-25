import React from 'react'
import './PracticeListeningPage.css'
import { Headphones } from 'react-bootstrap-icons'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
function PracticeListeningPage() {
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
          <Col span={6}>
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
          <Col span={18} className='practice_test_items'>
            <Row gutter={[0, 32]} justify="space-around">
              <Col span={4} offset={1} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              <Col span={4} className='practice_test_item'>
                <Link to={"/practice/playGameListening"}>
                  <div className='practice_box'>
                    <div className='test-progress'>
                      0 %
                    </div>
                    <div className='test-name'>
                      Test 1
                    </div>
                  </div>
                </Link>
              </Col>
              
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PracticeListeningPage