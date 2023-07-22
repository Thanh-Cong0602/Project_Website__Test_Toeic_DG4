import './App.css';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import User from './Pages/User/User';
import Admin from './Pages/Admin/Admin';
function App() {
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  const role = Cookies.get('role')
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === null) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <div className="App" >
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/register" exact element={<RegisterPage />} />
      </Routes>
      {isLoggedIn ? (
        <>
          {role === "user" ? <User /> : <Admin />}
        </>
      ) : null}
    </div>
  );
}

export default App;
