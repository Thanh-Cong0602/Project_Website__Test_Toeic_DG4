import React from 'react'
import Logo from '../../../Assets/vo_dien.jpg'
import './Navbar.css'
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined,  BellFilled} from '@ant-design/icons';
import { Layout, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../../Redux/_actions'
import { logoutAPI } from '../../../Api/Service/auth.service';
import { toast } from 'react-toastify';
const { Header } = Layout;

function Navbar({ collapsed, setCollapsed }) {
  const dispatch= useDispatch()
  const handleLogout = () => {
    dispatch(userActions.logout());
    logoutAPI('accounts/logout').then((res) => {
      toast.success(res.data.message, { autoClose: 2000 })
    })
  }
  // const username = useSelector(state => state.authentication.dataUser.username);
  return (
    <Header className='header__admin' >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className='button__scroll'
        />
      <div className='header__left'>
        <input type="text" className='search_item' placeholder='Search...' />
      </div>
      <div className='header__right'>
        <img src={Logo} alt='Thanh Cong Nguyen'/>
        <span className='username'>Thanh Cong</span>
        <BellFilled style={{fontSize: '20px', cursor: 'pointer'}}/>
        <div className='logout__admin' onClick={handleLogout}>
          <PoweroffOutlined style={{fontSize: '18px', cursor: 'pointer'}}/>
        </div>
      </div>
    </Header>
  )
}

export default Navbar
