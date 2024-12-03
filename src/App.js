import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserForm from './components/UseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import { useSelector } from 'react-redux';
import AdminLogin from './components/admin/auth/adminLogin';
import BookAnAppointment from './components/admin/bookings/BookAnAppointment';


function App() {
  const token = useSelector((state) => state.doctor.token);

  return (
    <BrowserRouter>
      {
        token ?
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="/adminForm" element={<BookAnAppointment />} />
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
