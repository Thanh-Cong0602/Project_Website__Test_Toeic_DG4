import React from 'react'
import './HeaderPage.css'
import { Row, Col, Typography, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';

function HeaderPage(props) {
  const { title, setIsOpenForm } = props
  return (
    <div className='header__page'>
      <Row className="wrapper" justify="space-between" align="center">
        <Col className="header_page__title">
          <Typography.Title level={4}>{title}</Typography.Title>
        </Col>
        <Col className='btn__create'>
          <Button type="primary" onClick={() => setIsOpenForm(true)}
            icon={<PlusCircleOutlined />}>
            Create
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderPage