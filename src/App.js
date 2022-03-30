import React from 'react'
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UpdatePwd from './pages/login/forgetPwd/UpdatePwd';
import ForgetPwdCodeConfirmation from './pages/login/forgetPwd/ForgetPwdCodeConfirmation';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/ForgetPwdCodeConfirmation" element={<ForgetPwdCodeConfirmation/>}/>
          <Route path="/updatePwd" element={<UpdatePwd/>}/>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <Navbar/>
      <h1 >Home page</h1>
    </div>
  )
}

export default App;
