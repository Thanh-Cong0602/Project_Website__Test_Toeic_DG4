import React, { useEffect, useState } from 'react'
import './VocabularyCategories.css'
import { Row, Col } from 'antd'
import { getVocabularyCategories } from '../../../../Api/Service/vocabulary.service'
import { toast } from "react-toastify";
import { ReadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { vocabularyActions } from '../../../../Redux/_actions';
import { useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

const VocabularyCategories = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    getVocabularyCategories('vocabularyCategories').then((res) => {
      setCategories(res.data.data)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  const handleCategoryClick = (categoryName, categoryID) => {
    const category = { categoryName: categoryName, categoryID: categoryID }
    dispatch(vocabularyActions.setCurrentCategory(category));
  };
  return (
    <>
      <div className='vocabulary-categories'>
        <div className='title'>
          <h1>TOEIC VOCABULARY (BY TOPIC)</h1>
        </div>
        <div className='main-list-view' >
          <Row gutter={[16, 16]} data-aos="zoom-in" data-aos-delay="500">
            {categories.map((item, index) => (
              <Col span={8} key={item.id}>
                <Link to={`/vocabulary/${item.name}`}
                  onClick={() => handleCategoryClick(item.name, item.id)} >
                  <div className='item'>
                    <div className='icon'>
                      <ReadOutlined />
                    </div>
                    <div className='item-name'>{item.name}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  )
}

export default VocabularyCategories
