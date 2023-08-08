import React, { useState } from 'react';
import './RegisterPage.css'
import { UserOutlined, UserAddOutlined, InfoCircleOutlined, KeyOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EnvelopeAt, GeoAlt } from 'react-bootstrap-icons';
import { Input } from 'antd';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../Api/Service/auth.service';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
function RegisterPage() {
  const [user, setUser] = useState(
    {
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
      surname: '',
      name: '',
      email: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      age: 0
    }
  );
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: name === 'age' ? parseInt(value) : value }));
  }
  function handleChangePhone(value) {
    setUser(user => ({ ...user, phone: value }))
  }
  const hasSpecialCharacters = (input) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(input);
  };
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (hasSpecialCharacters(user.username)) {
      errors.username = 'Username cannot contain special characters.'
    }
    if (hasSpecialCharacters(user.surname)) {
      errors.surname = 'Surname cannot contain special characters.'
    }
    if (hasSpecialCharacters(user.name)) {
      errors.name = 'Name cannot contain special characters.'
    }
    if (!isValidEmail(user.email)) {
      errors.email = 'Invalid email'
    }
    if (user.age < 0) {
      errors.age = 'Invalid age'
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    }
    else {
      if (user.confirmPassword !== user.password) {
        const messageError = "Password and Confirm password don't match"
        toast.error(messageError, { autoClose: 2000 })
      }
      else if (!user.username.trim() || !user.password.trim() || !user.confirmPassword.trim() || !user.role
        || !user.surname.trim() || !user.name.trim() || !user.email) {
        const messageWarn = "You need to enter all the information!!!"
        toast.warn(messageWarn, { autoClose: 2000 })
      }
      else {
        registerAPI('accounts/register', user).then((res) => {
          toast.success(res.data.message, { autoClose: 2000 })
          navigate('/login')
        }).catch((error) => {
          toast.error(error.response.data.message, { autoClose: 2000 })
        })
      }
    }
  }
  return (
    <>
      <div className='registerPage'>
        <form className='registerForm' onSubmit={handleSubmit}>
          <div className='title'>CREATE AN ACCOUNT</div>
          <div className='input-item'>
            <Input style={{ padding: '10px', fontSize: '15px' }}
              placeholder="Enter your account"
              prefix={<UserOutlined />}
              suffix={<InfoCircleOutlined
                style={{ color: formErrors.username ? 'red' : '' }}
              />}
              name='username'
              onChange={handleChange}
            />
            {formErrors.username && <div className='error-message'>{formErrors.username}</div>}
          </div>
          <div className='input-item'>
            <Input.Password style={{ padding: '10px', fontSize: '15px' }}

              placeholder="Enter your password"
              prefix={<KeyOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              name='password'
              onChange={handleChange}
            />

          </div>
          <div className='input-item'>
            <Input.Password style={{ padding: '10px', fontSize: '15px' }}
              type='password'
              placeholder="Enter your confirm password"
              prefix={<KeyOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              name='confirmPassword'
              onChange={handleChange}
            />
            <div className='choose-item'>
              <div>
                <span>Choose Role</span>
              </div>
              <div>
                <input type='radio' name="role" value="user" required
                  checked={user.role === "user"} onChange={handleChange} />
                <label>User</label>
              </div>
              <div>
                <input type='radio' name="role" value="admin"
                  checked={user.role === "admin"} onChange={handleChange} />
                <label>Admin</label>
              </div>
            </div>
            <div className='input-item'>
              <Input style={{ padding: '10px', fontSize: '15px' }}
                placeholder="Enter your surname"
                prefix={<UserAddOutlined />}
                suffix={<InfoCircleOutlined
                  style={{ color: formErrors.surname ? 'red' : '' }} />}
                name='surname'
                onChange={handleChange}
                
              />
              {formErrors.surname && <div className='error-message'>{formErrors.surname}</div>}
            </div>
            <div className='input-item'>
              <Input style={{ padding: '10px', fontSize: '15px' }}
                type='text'
                placeholder="Enter your name"
                prefix={<UserAddOutlined />}
                suffix={<InfoCircleOutlined
                  style={{ color: formErrors.name ? 'red' : '' }} />}
                name='name'
                onChange={handleChange}
                
              />
              {formErrors.name && <div className='error-message'>{formErrors.name}</div>}
            </div>
            <div className='input-item'>
              <Input style={{ padding: '10px', fontSize: '15px' }}
                type='email'
                placeholder="Enter your email"
                prefix={<EnvelopeAt />}
                suffix={<InfoCircleOutlined
                  style={{ color: formErrors.email ? 'red' : '' }} />}
                name='email'
                onChange={handleChange}
                
              />
              {formErrors.email && <div className='error-message'>{formErrors.email}</div>}
            </div>
            <div className='dateofBirth'>
              <label for="birthday">Birthday:</label>
              <input type="date" id="birthday" name="dateOfBirth"
                value={user.dateOfBirth ? user.dateOfBirth.toString().split('T')[0] : ''}
                onChange={handleChange} />
            </div>
            <div className='input-item'>
              <Input style={{ padding: '10px', fontSize: '15px' }}
                type='text'
                placeholder="Enter your address"
                prefix={<GeoAlt />}
                name='address'
                onChange={handleChange}
              />
            </div>
            <div className='input-item'>
              <PhoneInput
                country={'vn'}
                value={user.phone}
                onChange={handleChangePhone}
              />
            </div>
            <div className='input-item'>
              <Input style={{ padding: '10px', fontSize: '15px' }}
                type='number'
                placeholder="Enter your age"
                prefix={<UserAddOutlined />}
                name='age'
                inputMode="numeric"
                onChange={handleChange}
              />
              {formErrors.age && <div className='error-message'>{formErrors.age}</div>}
            </div>
            <div className='login-btn-wrapper'>
              <input className='btn-common-attributes-pink' type='submit' value={"REGISTER"} />
            </div>
            <div className='login'>
              <p>Have an account already ?
                <Link to={"/login"} className='no-underline'>
                  <span> Please login here</span>
                </Link></p>
            </div>
          </div>

        </form>

      </div>
    </>
  )
}

export default RegisterPage
