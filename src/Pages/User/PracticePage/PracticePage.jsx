import React from 'react'
import './PracticePage.css'
import { Row, Col } from 'antd'
import Image_Listening from '../../../Assets/practice_listening.png'
import Image_Reading from '../../../Assets/reading_practice.jpg'
import Image_Speaking from '../../../Assets/practice_speaking.jpg'
import Image_Writing from '../../../Assets/practice_writing.jpg'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();
function PracticePage() {
  return (
    <div className='practicePage'>
      <div className='title'>
        Practice
      </div>
      <Row justify="center" data-aos="zoom-in-up" data-aos-delay="500">
        <Col span={4} className='item-practice'>
          <Link to={"/practice/listening"} className='practice__link'>
            <div >
              <img className='image_practice' src={Image_Listening} alt='Listening Logo' />
              <h2>Listening</h2>
            </div>
          </Link>
        </Col>
        <Col span={4} offset={1} className='item-practice'>
          <Link className='practice__link'>
            <div>
              <img className='image_practice' src={Image_Reading} alt='Reading Logo' />
              <h2>Reading</h2>
            </div>
          </Link>
        </Col>
        <Col span={4} offset={1} className='item-practice'>
          <Link className='practice__link'>
            <div>
              <img className='image_practice' src={Image_Speaking} alt='Reading Logo' />
              <h2>Speaking</h2>
            </div>
          </Link>
        </Col>
        <Col span={4} offset={1} className='item-practice'>
          <Link className='practice__link'>
            <div>
              <img className='image_practice' src={Image_Writing} alt='Reading Logo' />
              <h2>Writing</h2>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default PracticePage