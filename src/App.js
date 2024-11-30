import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, BrowserRouter } from 'react-router-dom';
import UserForm from './components/UseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import { useSelector } from 'react-redux';
import AdminForm from './components/admin/AdminForm';
import AdminLogin from './components/admin/auth/adminLogin';


function App() {
  const token = useSelector((state) => state.doctor.token);
  
  return (
    <BrowserRouter>
      {
        token ?
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="/adminForm" element={<AdminForm />} />
            <Route path="*" element={'404 Not Found'} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="*" element={'404 Not Found'} />
          </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
