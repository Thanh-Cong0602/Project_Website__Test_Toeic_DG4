import React, { useState } from 'react'
import './MainListeningPage.css'
import { Headphones } from 'react-bootstrap-icons'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import Image_Test from '../../../../../Assets/part1.jpg'
import PracticeListeningPage from '../PracticeListeningPage/PracticeListeningPage'
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();
function MainListeningPage() {
  const [isShowPracticePage, setIsShowPracticePage] = useState(false)
  const handleClickToPractice = () => {
    setIsShowPracticePage(true)
  }
  return (
    <>
      {!isShowPracticePage ? (
        <div className='mainListeningPage'>
          <div className='title'>
            Practice TOEIC Test Online
          </div>
          <div className='icon_title_listening'>
            <div className='icon-headphone'>
              <Headphones style={{ fontSize: '20px', margin: '4px 0px' }} />
            </div>
            <div className='word'>
              Listening
            </div>
          </div>
          <div className='main_topic_listening' data-aos="zoom-out-up" data-aos-delay="400">
            <Row gutter={48} className='main_topic_scroll'>
              <Col span={5}>
                <Link to={"/practice/practicelistening"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
              <Col span={5}>
                <Link to={"/listenPractice"} onClick={handleClickToPractice}>
                  <div className='item-topic'>
                    <div className='item-image'>
                      <img src={Image_Test} alt='Test' />
                    </div>
                    <div>Part 1</div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <PracticeListeningPage setIsShowPracticePage={setIsShowPracticePage} />
      )}
    </>
  )
}

export default MainListeningPage