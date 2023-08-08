import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Logo from '../../../Assets/vo_dien.jpg'
import TCN from '../../../Assets/tcn.JPG'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { SearchOutlined, BellFilled, MenuOutlined, SettingTwoTone, UserOutlined, LogoutOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../../Redux/_actions'

function Navbar() {
  const [currentPage, setCurrentPage] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const username = useSelector(state => state.authentication.dataUser.username);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userActions.logout());
  }
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  useEffect(() => {
  }, [isDropdownVisible])
  const handleClickPage = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className='navbar'>
      <Row>
        <Col span={6} className='navbar_left'>
          <div className={`logo ${currentPage === 'homepage' ? 'page-active' : ''}`}>
            <Link to={"/homepage"} onClick={() => handleClickPage('homepage')}>
              <img src={Logo} alt='Logo Website' />
            </Link>
          </div>
          <div className='search-bar'>
            <input type='text' placeholder='Search...' />
            <SearchOutlined className='search-icon' />
          </div>
        </Col>

        <Col span={12} className='navbar_center'>
          <Row gutter={24}>
            <Col span={6}>
              <Link to={"/vocabulary"} onClick={() => handleClickPage('vocabulary')}>
                <div className={`page-item ${currentPage === 'vocabulary' ? 'btn-active' : ''}`}>
                  Vocabulary
                </div>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={"/practice"} onClick={() => handleClickPage('practice')}>
                <div className={`page-item ${currentPage === 'practice' ? 'btn-active' : ''}`}>
                  Practice
                </div>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={"/blog"} onClick={() => handleClickPage('blog')}>
                <div className={`page-item ${currentPage === 'blog' ? 'btn-active' : ''}`}>
                  Blog
                </div>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={"/test"} onClick={() => handleClickPage('test')}>
                <div className={`page-item ${currentPage === 'test' ? 'btn-active' : ''}`}>
                  Test
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
        
        <Col span={6} className='navbar_right'>
          <div className='logo-user'>
            <img src={TCN} alt='User Logo' />
          </div>
          <div className='username'>
            {username}
          </div>
          <div className='icon-navbar'>
            <BellFilled />
          </div>
          <div className='icon-navbar' onClick={handleLogout}>
            <PoweroffOutlined />
          </div>
          <div className='menu-infor' onClick={toggleDropdown}>
            <MenuOutlined />
          </div>

          {isDropdownVisible && (
            <div className="menu-login-dropdown">
              <Link>
                <div className='menu-dropdown-item'>
                  <div className='icon'>
                    <UserOutlined />
                  </div>
                  Profile
                </div>
              </Link>
              <Link>
                <div className='menu-dropdown-item'>
                  <div className='icon'>
                    <SettingTwoTone />
                  </div>
                  Setting
                </div>
              </Link>
              <Link to={"/"} onClick={handleLogout}>
                <div className='menu-dropdown-item'>
                  <div className='icon'>
                    <LogoutOutlined />
                  </div>
                  Logout
                </div>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Navbar