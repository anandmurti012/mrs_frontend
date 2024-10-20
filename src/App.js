// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'; // Import Router components
// import UserForm from './components/UseForm';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import "./App.css";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // MUI components
// import AdminPanel from './components/admin/AdminPanel';
// import Footer from './components/users/Footer';
// import AdminLogin from './components/admin/adminLogin';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faUser } from '@fortawesome/free-solid-svg-icons';
// import AdminBooking from './components/admin/AdminBooking';

// function App() {
 
//     const [open, setOpen] = useState(false);
  
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
//   return (
//     <Router>
//       <div className="App">
//         {/* Flex container to align heading and button on the same line */}
//         <div className="d-flex align-items-center justify-content-between mt-3">
//           <img style={{height:'100px', width:'100px', marginLeft:'50px', marginBottom:'10px'}} src='https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png'></img>
//           <h1 style={{marginRight:'100px'}} className='text'>MRS Hospital - Online Booking</h1>
//           <strong><p>Booking by Admin <Button className='btn btn-primary' onClick={handleClickOpen}>
//         <FontAwesomeIcon icon={faUser} />
//       </Button></p></strong>
//         </div>

//         <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>Admin Booking Form</DialogTitle>
//         <DialogContent>
//           {/* Use the existing UserForm inside the modal */}
//           <UserForm />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog>


//         {/* Define Routes */}
//         <Routes>
//           <Route path="/" element={<UserForm />} /> {/* Default route */}
//           <Route path="/admin" element={<AdminPanel />} /> {/* AdminPanel route */}
//           {/* <Route path="/adminBooking" element={<AdminBooking />} /> AdminPanel route */}
//         </Routes>
//         <div>
//           {/* Use NavLink to link to AdminPanel */}
//           <div className="mt-3">
//           <AdminLogin/>
//         </div>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

//===========================
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import Router components
// import UserForm from './components/UseForm';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './App.css';
// import AdminPanel from './components/admin/AdminPanel';
// import Footer from './components/users/Footer';
// import AdminLogin from './components/admin/adminLogin';
// import AdminBooking from './components/admin/AdminBooking'; // Import the AdminBooking component

// function App() {
//   const location = useLocation(); // Get the current route

//   return (
//     <div className="App">
//       {/* Flex container for header */}
//       <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
//         {/* Logo on the left with margin */}
//         <img
//           style={{
//             height: '100px',
//             width: '100px',
//             marginLeft: '20px',
//           }}
//           src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png"
//           alt="MRS Logo"
//         />

//         {/* Center the "MRS Hospital - Online Booking" text */}
//         <h1 style={{
//             margin: '0 auto', // Center the heading
//             textAlign: 'center', // Center align text
//             flex: 1, // Allow it to grow and take up remaining space
//           }} 
//           className="text"
//         >
//           MRS Hospital - Online Booking
//         </h1>

//         {/* Conditionally render the "Booking by Admin" section based on current route */}
//         {location.pathname === '/admin' && (
//           <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
//             <p style={{ margin: '0', paddingRight: '5px' }}>
//             <AdminBooking />
//             </p> 
//           </div>
//         )}
//       </div>

//       {/* Define Routes */}
//       <Routes>
//         <Route path="/" element={<UserForm />} /> {/* Default route */}
//         <Route path="/admin" element={<AdminPanel />} /> {/* AdminPanel route */}
//       </Routes>

//       <div>
//         {/* Conditionally render Admin Login based on current route */}
//         {location.pathname === '/' && (
//           <div className="mt-3 loginPosition">
//             <AdminLogin />
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default App;

//==================================================recent modification 9:41 20 oct
// File: src/App.js

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





//==============================//===============================//==========================
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
// import UserForm from './components/UseForm';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import AdminPanel from './components/admin/AdminPanel';
// import Footer from './components/users/Footer';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// function App() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   // Handle modal open/close
//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // Formik form handling
//   const formik = useFormik({
//     initialValues: {
//       emailId: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       emailId: Yup.string().email('Invalid email format').required('Email is required'),
//       password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/login`, values);

//         if (response.status === 200) {
//           // On success, redirect to admin panel
//           navigate('/admin');
//           setOpen(false);
//         }
//       } catch (error) {
//         console.error('Login failed:', error);
//         alert('Invalid email or password');
//       }
//     },
//   });

//   return (
//     <Router>
//       <div className="App">
//         <div className="d-flex align-items-center justify-content-evenly mt-3">
//           <h1 className="text">Welcome to MRS Hospital</h1>
//         </div>

//         {/* Define Routes */}
//         <Routes>
//           <Route path="/" element={<UserForm />} />
//           <Route path="/admin" element={<AdminPanel />} />
//         </Routes>

//         <div>
//           {/* Button to open the login modal */}
//           <Button variant="contained" color="primary" onClick={handleClickOpen}>
//             Admin Login
//           </Button>
//         </div>

//         {/* Material UI Dialog for login modal */}
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Admin Login</DialogTitle>
//           <DialogContent>
//             <form onSubmit={formik.handleSubmit}>
//               <TextField
//                 margin="dense"
//                 label="Email"
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 name="emailId"
//                 value={formik.values.emailId}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.emailId && Boolean(formik.errors.emailId)}
//                 helperText={formik.touched.emailId && formik.errors.emailId}
//               />
//               <TextField
//                 margin="dense"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 variant="outlined"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 helperText={formik.touched.password && formik.errors.password}
//               />
//               <DialogActions>
//                 <Button onClick={handleClose} color="secondary">
//                   Cancel
//                 </Button>
//                 <Button type="submit" color="primary">
//                   Login
//                 </Button>
//               </DialogActions>
//             </form>
//           </DialogContent>
//         </Dialog>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

//====================================//===========================
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
// import UseForm from './components/UseForm';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './App.css';
// import AdminPanel from './components/admin/AdminPanel';
// import Footer from './components/users/Footer';

// function App() {
//   // State to manage modal visibility
//   const [showModal, setShowModal] = useState(false);

//   // Function to open modal
//   const openModal = () => setShowModal(true);

//   // Function to close modal
//   const closeModal = () => setShowModal(false);

//   return (
//     <Router>
//       <div className="App">
//         {/* Flex container to align heading and button on the same line */}
//         <div className="d-flex align-items-center justify-content-evenly mt-3">
//           <h1 className='text'>Welcome to MRS Hospital</h1>
//         </div>

//         {/* Define Routes */}
//         <Routes>
//           <Route path="/" element={<UseForm />} /> {/* Default route */}
//           <Route path="/admin" element={<AdminPanel />} /> {/* AdminPanel route */}
//         </Routes>
        
//         <div>
//           {/* NavLink triggers modal on click */}
//           <button className='btn btn-primary me-1' onClick={openModal}>
//             Admin Login
//           </button>
//         </div>

//         {/* Bootstrap Modal for Admin Login */}
//         {showModal && (
//           <div className="modal show d-block" tabIndex="-1" role="dialog">
//             <div className="modal-dialog" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Admin Login</h5>
//                   <button type="button" className="close" onClick={closeModal}>
//                     <span>&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form>
//                     <div className="form-group">
//                       <label htmlFor="admin-email">Email</label>
//                       <input type="email" className="form-control" id="admin-email" placeholder="Enter email" />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="admin-password">Password</label>
//                       <input type="password" className="form-control" id="admin-password" placeholder="Password" />
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
//                   <button type="button" className="btn btn-primary" onClick={() => {
//                     // Simulate successful login by redirecting to admin page
//                     window.location.href = "/admin";
//                   }}>
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

