import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'; // Import Router components
import UserForm from './components/UseForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./App.css";
import AdminPanel from './components/admin/AdminPanel';
import Footer from './components/users/Footer';
import AdminLogin from './components/admin/adminLogin';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Flex container to align heading and button on the same line */}
        <div className="d-flex align-items-center justify-content-evenly mt-3">
          <h1 className='text'>Welcome to MRS Hospital</h1>
        </div>


        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<UserForm />} /> {/* Default route */}
          <Route path="/admin" element={<AdminPanel />} /> {/* AdminPanel route */}
        </Routes>
        <div>
          {/* Use NavLink to link to AdminPanel */}
          <div className="mt-3">
          <AdminLogin/>
        </div>
        </div>
        <Footer />
      </div>
    </Router>
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

