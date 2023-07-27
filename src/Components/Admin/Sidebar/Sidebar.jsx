import React, { useState } from 'react';
import './Sidebar.css'
import { UserOutlined, ReadOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Headphones, PencilSquare, Headset, Journal } from 'react-bootstrap-icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../../Assets/vo_dien.jpg'
const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className={`${!collapsed ? 'sidebar' : 'small-sidebar'}`} >
      <div className='demo-logo'>
        <Link to={"/homepage"}>
          <img src={Logo} alt='Logo Website' className='logo' />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/manageaccount">Accounts</Link>
        </Menu.Item>

        <Menu.SubMenu key="2" icon={<ReadOutlined />} title="Vocabulary">
          <Menu.Item key="2.1">
            <Link to="/vocabularycategories">Vocabulary Categories</Link>
          </Menu.Item>
          <Menu.Item key="2.2">
            <Link to="/vocabularies">All Vocabularies</Link>
          </Menu.Item>
          <Menu.Item key="2.3">
            <Link to="/vocabularyquestion">All Questions </Link>
          </Menu.Item>
          <Menu.Item key="2.4">
            <Link to="/vocabularybycategory">Vocabulary By Category</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="3" icon={<FolderOpenOutlined />}>
          <Link to="/practice">Practice</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<Headphones />}>
          <Link to="/">Listening</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<PencilSquare />}>
          <Link to="/">Writing</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<Headset />}>
          <Link to="/">Speaking</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<Journal />}>
          <Link to="/">Reading</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar;
