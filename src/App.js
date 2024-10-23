 import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import UserForm from './components/UseForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import Footer from './components/users/Footer';
import AdminLogin from './components/admin/adminLogin';
import AdminBooking from './components/admin/AdminBooking';
import { FaPowerOff } from 'react-icons/fa';


function App() {
  const location = useLocation();
  const adminName = 'Admin'; // Dummy admin name
  const navigate = useNavigate(); // Hook for navigation
  
  // Logout function
  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing tokens)
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="App">
      <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
        {/* Logo */}
        <img
          style={{
            height: '100px',
            width: '100px',
            marginLeft: '20px',
          }}
          src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png"
          alt="MRS Logo"
        />

        {/* Heading */}
        <h1 style={{
            margin: '0 auto',
            textAlign: 'center',
            flex: 1,
          }} 
          className="text"
        >
          MRS Hospital - Online Booking
        </h1>

        {/* Admin section visible only on '/admin' */}
        {location.pathname === '/admin' && (
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
             
            <p style={{ margin: '0', paddingRight: '5px' }}>
              <AdminBooking />
            </p>
            <div className="d-flex align-items-center">
              {/* Admin welcome text */}
              {/* Logout button */}
              <button 
                className="btn btn-danger" // Bootstrap styling for visibility
                onClick={handleLogout}
              >
                <FaPowerOff />
                {/* FontAwesome power icon */}
              </button>
            </div>
            <p style={{marginBottom:'70px'}} className="me-3"><strong>{adminName}</strong></p>
          </div>
        )}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      {/* Admin login section for '/' */}
      <div>
        {location.pathname === '/' && (
          <div className="mt-3 loginPosition">
            <AdminLogin />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;





 
 