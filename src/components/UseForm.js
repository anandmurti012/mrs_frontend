
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserDoctor,faUser,faAddressBook,faPhone,faEnvelope,faStethoscope } from '@fortawesome/free-solid-svg-icons';

// import './UseForm.css';

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     gender: '',
//     age: '',
//     doctor: '',
//     availability:[]
//   });

//   const [errors, setErrors] = useState({});
//   const [doctors, setDoctors] = useState([]); // State to store doctors from backend

//    // Fetch doctor names when the component mounts
//    useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
//         setDoctors(response.data); // Store the fetched doctor names
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('Failed to load doctor names');
//       }
//     };

//     fetchDoctors();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = 'Valid 10-digit phone number is required';
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Valid email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.age || formData.age < 18 || formData.age > 100)
//       newErrors.age = 'Age must be between 18 and 100';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/users/`, formData);
//         toast.success('User added successfully!');
//         setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '',availability:[] });
//       } catch (err) {
//         toast.error('Error adding user');
//       }
//     } else {
//       setErrors(validationErrors);
//       toast.error('Please fill in all required fields');
//     }
//   };

//   return (
//     <div className="form-container mt-3">
//       <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment </h1>
//       <form onSubmit={handleSubmit} className="user-form">
//         <div className="form-group">
//           <label htmlFor="name"><p className='text-style'> <FontAwesomeIcon icon={faUser} /> Name</p></label>
//           <input id="name" name="name" value={formData.name} onChange={handleChange} />
//           {errors.name && <span className="error-message">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="address"><p className='text-style'><FontAwesomeIcon icon={faAddressBook} /> Address</p></label>
//           <input id="address" name="address" value={formData.address} onChange={handleChange} />
//           {errors.address && <span className="error-message">{errors.address}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="phone"><p className='text-style'><FontAwesomeIcon icon={faPhone} /> Phone</p></label>
//           <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <span className="error-message">{errors.phone}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email"><p className='text-style'><FontAwesomeIcon icon={faEnvelope} /> Email</p></label>
//           <input id="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <span className="error-message">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender"><p className='text-style'>Gender</p></label>
//           <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <span className="error-message">{errors.gender}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="age"><p className='text-style'>Age</p></label>
//           <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
//           {errors.age && <span className="error-message">{errors.age}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="doctor"><p className='text-style'>Doctor <FontAwesomeIcon icon={faStethoscope} /></p></label>
//           <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange}>
//             <option value="">Select Doctor</option>
//             {doctors.map((doctor, index) => (
//               <option key={index} value={doctor.name}>
//                 {`${doctor.name} - (${doctor.specialization})`} {/* Displaying both name and specialization */}
//               </option>
//             ))}
//           </select>
//           {errors.doctor && <span className="error-message">{errors.doctor}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="doctor"><p className='text-style'>Availability</p></label>
//           <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange}>
//             <option value="">Select availability</option>
//             {doctors.map((doctor, index) => (
//               <option key={index} value={doctor.availability}>
//                 {`${doctor.availability}`} {/* Displaying both name and specialization */}
//               </option>
//             ))}
//           </select>
//           {errors.doctor && <span className="error-message">{errors.doctor}</span>}
//         </div>
//         <button type="submit" className="submit-btn">Submit</button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default UserForm;

//===========================================...............============////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserDoctor,faUser,faAddressBook,faPhone,faEnvelope,faStethoscope } from '@fortawesome/free-solid-svg-icons';

// import './UseForm.css';

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     gender: '',
//     age: '',
//     doctor: '',
//     availability: [] // Ensure this is a scalar (string) value for single select
//   });

//   const [errors, setErrors] = useState({});
//   const [doctors, setDoctors] = useState([]);
//   const [availability, setAvailability] = useState([]); // Availability will still be an array for the options

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
//         setDoctors(response.data);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('Failed to load doctor names');
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleDoctorChange = async (e) => {
//     const selectedDoctor = e.target.value;
//     setFormData({ ...formData, doctor: selectedDoctor });

//     if (selectedDoctor) {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctor}`);
//         setAvailability(Array.isArray(response.data) ? response.data : []); // Ensure response is array
//       } catch (error) {
//         console.error('Error fetching doctor availability:', error);
//         toast.error('Failed to load availability');
//         setAvailability([]); // Reset if error occurs
//       }
//     } else {
//       setAvailability([]); // Reset availability if no doctor is selected
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = 'Valid 10-digit phone number is required';
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Valid email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.age || formData.age < 18 || formData.age > 100)
//       newErrors.age = 'Age must be between 18 and 100';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         await axios.post(`${process.env.REACT_APP_APIURL}/api/users/`, { ...formData });

//         toast.success('User added successfully!');
//         setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '', availability: [] });
//       } catch (err) {
//         toast.error('Error adding user');
//       }
//     } else {
//       setErrors(validationErrors);
//       toast.error('Please fill in all required fields');
//     }
//   };

//   return (

//       <div className="form-container mt-3">
//       <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment </h1>
//       <form onSubmit={handleSubmit} className="user-form">
//         <div className="form-group">
//           <label htmlFor="name"><p className='text-style'> <FontAwesomeIcon icon={faUser} /> Name</p></label>
//           <input id="name" name="name" value={formData.name} onChange={handleChange} />
//           {errors.name && <span className="error-message">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="address"><p className='text-style'><FontAwesomeIcon icon={faAddressBook} /> Address</p></label>
//           <input id="address" name="address" value={formData.address} onChange={handleChange} />
//           {errors.address && <span className="error-message">{errors.address}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="phone"><p className='text-style'><FontAwesomeIcon icon={faPhone} /> Phone</p></label>
//           <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <span className="error-message">{errors.phone}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email"><p className='text-style'><FontAwesomeIcon icon={faEnvelope} /> Email</p></label>
//           <input id="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <span className="error-message">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender"><p className='text-style'>Gender</p></label>
//           <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <span className="error-message">{errors.gender}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="age"><p className='text-style'>Age</p></label>
//           <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
//           {errors.age && <span className="error-message">{errors.age}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="doctor"><p className='text-style'>Doctor <FontAwesomeIcon icon={faStethoscope} /></p></label>
//           <select id="doctor" name="doctor" value={formData.doctor} onChange={handleDoctorChange}>
//             <option value="">Select Doctor</option>
//             {doctors.map((doctor, index) => (
//               <option key={index} value={doctor.name}>
//                 {`${doctor.name} - (${doctor.specialization})`}
//               </option>
//             ))}
//           </select>
//           {errors.doctor && <span className="error-message">{errors.doctor}</span>}
//         </div>

//         {/* Display availability dynamically */}
//         {Array.isArray(availability) && availability.length > 0 && (
//           <div className="form-group">
//             <label htmlFor="availability"><p className='text-style'>Availability</p></label>
//             <select id="availability" name="availability" value={formData.availability} onChange={handleChange}>
//               <option value="">Select Availability</option>
//               {availability.map((slot, index) => (
//                 <option key={index} value={`${slot.day} (${slot.startTime} - ${slot.endTime})`}>
//                   {`${slot.day} (${slot.startTime} - ${slot.endTime})`}
//                 </option>
//               ))}
//             </select>
//             {errors.availability && <span className="error-message">{errors.availability}</span>}
//           </div>
//         )}

//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UserForm;


//=========================modificaion 3================================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserDoctor, faUser, faAddressBook, faPhone, faEnvelope, faStethoscope } from '@fortawesome/free-solid-svg-icons';
// import './UseForm.css';

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     gender: '',
//     age: '',
//     doctor: '',
//     availability: '' // Ensure this is a scalar (string) value for the selected availability slot
//   });

//   const [errors, setErrors] = useState({});
//   const [doctors, setDoctors] = useState([]);
//   const [availability, setAvailability] = useState([]); // Availability will still be an array for the options

//   // Fetch doctors on component mount
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
//         setDoctors(response.data);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('Failed to load doctor names');
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // Handle doctor change and fetch availability
//   const handleDoctorChange = async (e) => {
//     const selectedDoctor = e.target.value;
//     setFormData({ ...formData, doctor: selectedDoctor });

//     if (selectedDoctor) {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctor}`);
//         setAvailability(Array.isArray(response.data.availability) ? response.data.availability : []); // Ensure response is array
//       } catch (error) {
//         console.error('Error fetching doctor availability:', error);
//         toast.error('Failed to load availability');
//         setAvailability([]); // Reset if error occurs
//       }
//     } else {
//       setAvailability([]); // Reset availability if no doctor is selected
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = 'Valid 10-digit phone number is required';
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Valid email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.age || formData.age < 18 || formData.age > 100)
//       newErrors.age = 'Age must be between 18 and 100';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         await axios.post(`${process.env.REACT_APP_APIURL}/api/users/`, { ...formData });

//         toast.success('User added successfully!');
//         setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '', availability: '' });
//       } catch (err) {
//         toast.error('Error adding user');
//       }
//     } else {
//       setErrors(validationErrors);
//       toast.error('Please fill in all required fields');
//     }
//   };

//   return (
//     <div className="form-container mt-3">
//       <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment </h1>
//       <form onSubmit={handleSubmit} className="user-form">
//         <div className="form-group">
//           <label htmlFor="name"><p className='text-style'> <FontAwesomeIcon icon={faUser} /> Name</p></label>
//           <input id="name" name="name" value={formData.name} onChange={handleChange} />
//           {errors.name && <span className="error-message">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="address"><p className='text-style'><FontAwesomeIcon icon={faAddressBook} /> Address</p></label>
//           <input id="address" name="address" value={formData.address} onChange={handleChange} />
//           {errors.address && <span className="error-message">{errors.address}</span>}         </div>

//         <div className="form-group">           <label htmlFor="phone"><p className='text-style'><FontAwesomeIcon icon={faPhone} /> Phone</p></label>
//           <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <span className="error-message">{errors.phone}</span>}
//         </div>
//         <div className="form-group">           <label htmlFor="email"><p className='text-style'><FontAwesomeIcon icon={faEnvelope} /> Email</p></label>
//           <input id="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <span className="error-message">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender"><p className='text-style'>Gender</p></label>           <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>/             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <span className="error-message">{errors.gender}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="age"><p className='text-style'>Age</p></label>
//           <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
//           {errors.age && <span className="error-message">{errors.age}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="doctor"><p className='text-style'>Doctor <FontAwesomeIcon icon={faStethoscope} /></p></label>
//           <select id="doctor" name="doctor" value={formData.doctor} onChange={handleDoctorChange}>
//             <option value="">Select Doctor</option>
//             {doctors.map((doctor, index) => (
//               <option key={index} value={doctor.name}>
//                 {`${doctor.name} - (${doctor.specialization})`}
//               </option>
//             ))}
//           </select>
//           {errors.doctor && <span className="error-message">{errors.doctor}</span>}
//         </div>

//         {/* Display availability dynamically */}
//         {Array.isArray(availability) && availability.length > 0 && (
//           <div className="form-group">
//             <label htmlFor="availability"><p className='text-style'>Availability</p></label>
//             <select id="availability" name="availability" value={formData.availability} onChange={handleChange}>
//               <option value="">Select Availability</option>
//               {availability.map((slot, index) => (
//                 <option key={index} value={`${slot.day} (${slot.startTime} - ${slot.endTime})`}>
//                   {`${slot.day} (${slot.startTime} - ${slot.endTime})`}
//                 </option>
//               ))}
//             </select>
//             {errors.availability && <span className="error-message">{errors.availability}</span>}
//           </div>
//         )}

//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UserForm;


//==========================modification 4================================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setDoctorDetails } from  '../redux/doctorSlice' ;
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserDoctor, faUser, faAddressBook, faPhone, faEnvelope, faStethoscope } from '@fortawesome/free-solid-svg-icons';

// import './UseForm.css';

// const UserForm = () => {
//   const dispatch = useDispatch();
//   // const { doctorName, bookingTime } = useSelector((state) => state.doctor);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     gender: '',
//     age: '',
//     doctor: '',
//     availability: '' // Ensure this is a scalar (string) value for the selected availability slot
//   });

//   const [errors, setErrors] = useState({});
//   const [doctors, setDoctors] = useState([]);
//   const [availability, setAvailability] = useState([]); // Availability will still be an array for the options

//   // Fetch doctors on component mount
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
//         setDoctors(response.data);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('Failed to load doctor names');
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // Handle doctor change and fetch availability
//   const handleDoctorChange = async (e) => {
//     const selectedDoctor = e.target.value;
//     setFormData({ ...formData, doctor: selectedDoctor });

//     if (selectedDoctor) {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctor}`);
//         setAvailability(Array.isArray(response.data.availability) ? response.data.availability : []); // Ensure response is array
//       } catch (error) {
//         console.error('Error fetching doctor availability:', error);
//         toast.error('Failed to load availability');
//         setAvailability([]); // Reset if error occurs
//       }
//     } else {
//       setAvailability([]); // Reset availability if no doctor is selected
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone))
//       newErrors.phone = 'Valid 10-digit phone number is required';
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Valid email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.age || formData.age < 18 || formData.age > 100)
//       newErrors.age = 'Age must be between 18 and 100';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the form before submitting
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         // Ensure availability is in the correct format
//         const formDataForSubmit = {
//           ...formData,
//           availability: formData.availability // Assuming availability is already a string, else handle conversion
//         };

//         // Post the form data to your backend API
//         const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/users/`, formDataForSubmit);

//         // Dispatch the doctor's name and booking time slot to Redux store
//         dispatch(setDoctorDetails({
//           doctorName: formData.doctor,
//           bookingTime: formData.availability,
//           userName: formData.name
//         }));

//         // Notify user and reset form on successful submission
//         toast.success('User added successfully!');
//         setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '', availability: '' });
//       } catch (err) {
//         console.error('Error adding user:', err.response?.data || err.message); // More detailed error logging
//         toast.error('Error adding user');
//       }
//     } else {
//       setErrors(validationErrors); // Display validation errors
//       toast.error('Please fill in all required fields');
//     }
//   };

//   return (
//     <div className="form-container mt-3">
//       <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment </h1>
//       <form onSubmit={handleSubmit} className="user-form">
//         <div className="form-group">
//           <label htmlFor="name"><p className='text-style'> <FontAwesomeIcon icon={faUser} /> Name</p></label>
//           <input id="name" name="name" value={formData.name} onChange={handleChange} />
//           {errors.name && <span className="error-message">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="address"><p className='text-style'><FontAwesomeIcon icon={faAddressBook} /> Address</p></label>
//           <input id="address" name="address" value={formData.address} onChange={handleChange} />
//           {errors.address && <span className="error-message">{errors.address}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="phone"><p className='text-style'><FontAwesomeIcon icon={faPhone} /> Phone</p></label>
//           <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <span className="error-message">{errors.phone}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email"><p className='text-style'><FontAwesomeIcon icon={faEnvelope} /> Email</p></label>
//           <input id="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <span className="error-message">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender"><p className='text-style'>Gender</p></label>
//           <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <span className="error-message">{errors.gender}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="age"><p className='text-style'>Age</p></label>
//           <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
//           {errors.age && <span className="error-message">{errors.age}</span>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="doctor"><p className='text-style'>Doctor <FontAwesomeIcon icon={faStethoscope} /></p></label>
//           <select id="doctor" name="doctor" value={formData.doctor} onChange={handleDoctorChange}>
//             <option value="">Select Doctor</option>
//             {doctors.map((doctor, index) => (
//               <option key={index} value={doctor.name}>
//                 {`${doctor.name} - (${doctor.specialization})`}
//               </option>
//             ))}
//           </select>
//           {errors.doctor && <span className="error-message">{errors.doctor}</span>}
//         </div>

//         {/* Display availability dynamically */}
//         {Array.isArray(availability) && availability.length > 0 && (
//           <div className="form-group">
//             <label htmlFor="availability"><p className='text-style'>Availability</p></label>
//             <select id="availability" name="availability" value={formData.availability} onChange={handleChange}>
//               <option value="">Select Availability</option>
//               {availability.map((slot, index) => (
//                 <option key={index} value={`${slot.day} (${slot.startTime} - ${slot.endTime})`}>
//                   {`${slot.day} (${slot.startTime} - ${slot.endTime})`}
//                 </option>
//               ))}
//             </select>
//             {errors.availability && <span className="error-message">{errors.availability}</span>}
//           </div>
//         )}

//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UserForm;

//=====================modification 5 -==============================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorDetails } from  '../redux/doctorSlice' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faUser, faAddressBook, faPhone, faEnvelope, faStethoscope, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './UseForm.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const { doctorName, bookingTime, userName,pAddress,pPhone } = useSelector((state) => state.doctor); // Select booking details from Redux

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    doctor: '',
    availability: '' 
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to load doctor names');
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = async (e) => {
    const selectedDoctor = e.target.value;
    setFormData({ ...formData, doctor: selectedDoctor });

    if (selectedDoctor) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctor}`);
        setAvailability(Array.isArray(response.data.availability) ? response.data.availability : []);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
        toast.error('Failed to load availability');
        setAvailability([]);
      }
    } else {
      setAvailability([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age || formData.age < 18 || formData.age > 100)
      newErrors.age = 'Age must be between 18 and 100';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataForSubmit = {
          ...formData,
          availability: formData.availability 
        };

        await axios.post(`${process.env.REACT_APP_APIURL}/api/users/`, formDataForSubmit);

        dispatch(setDoctorDetails({
          doctorName: formData.doctor,
          bookingTime: formData.availability,
          userName: formData.name,
          pAddress: formData.address,
          pPhone: formData.phone,
        }));

        toast.success('User added successfully!');
        setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '', availability: '' });
      } catch (err) {
        console.error('Error adding user:', err.response?.data || err.message);
        toast.error('Error adding user');
      }
    } else {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div className="form-container mt-3">
      {/* Conditionally hide the form if booking details are visible */}
      {doctorName && bookingTime ? (
        <div className="booking-info card">
          <h3>
            <strong>Booking Confirmed</strong> 
            <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" />
          </h3>
          <br></br>
          <h4><b>Patient Name:</b> {userName}</h4>
          <p><b>Address:</b> {pAddress}</p>
          <p><b>Phone no:</b> {pPhone}</p>
          <hp><b>Doctor's Name:</b> {doctorName}</hp>
          <p><b>Consulting Time:</b> {bookingTime}</p>
          <button onClick={() => window.location.reload()} className="submit-btn">Book Another Appointment</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment </h1>
          <div className="form-group">
            <label htmlFor="name"><p className='text-style'><FontAwesomeIcon icon={faUser} /> Name</p></label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address"><p className='text-style'><FontAwesomeIcon icon={faAddressBook} /> Address</p></label>
            <input id="address" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone"><p className='text-style'><FontAwesomeIcon icon={faPhone} /> Phone</p></label>
            <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email"><p className='text-style'><FontAwesomeIcon icon={faEnvelope} /> Email</p></label>
            <input id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender"><p className='text-style'>Gender</p></label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="age"><p className='text-style'>Age</p></label>
            <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="doctor"><p className='text-style'>Doctor <FontAwesomeIcon icon={faStethoscope} /></p></label>
            <select id="doctor" name="doctor" value={formData.doctor} onChange={handleDoctorChange}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {`${doctor.name} - (${doctor.specialization})`}
                </option>
              ))}
            </select>
            {errors.doctor && <span className="error-message">{errors.doctor}</span>}
          </div>
          {Array.isArray(availability) && availability.length > 0 && (
            <div className="form-group">
              <label htmlFor="availability"><p className='text-style'>Availability</p></label>
              <select id="availability" name="availability" value={formData.availability} onChange={handleChange}>
                <option value="">Select Availability</option>
                {availability.map((slot, index) => (
                  <option key={index} value={`${slot.day} (${slot.startTime} - ${slot.endTime})`}>
                    {`${slot.day} (${slot.startTime} - ${slot.endTime})`}
                  </option>
                ))}
              </select>
              {errors.availability && <span className="error-message">{errors.availability}</span>}
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserForm;






