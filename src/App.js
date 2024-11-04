import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, BrowserRouter } from 'react-router-dom';
import UserForm from './components/UseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import { useSelector } from 'react-redux';


function App() {
  const auth = useSelector((state) => state.doctor);
  const isLoggedIn = auth.token !== null && auth.token !== undefined;

  return (
    <BrowserRouter>
      {
        isLoggedIn ?
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="*" element={'404 Not Found'} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="*" element={'404 Not Found'} />
          </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
