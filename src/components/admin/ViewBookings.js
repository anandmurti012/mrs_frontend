// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   // Handle confirming a booking
//   const handleConfirm = async (bookingId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//       toast.success('Booking confirmed successfully!');
//     } catch (error) {
//       toast.error('Error confirming booking');
//     }
//   };

//   // Handle canceling a booking
//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//       toast.success('Booking canceled successfully!');
//     } catch (error) {
//       toast.error('Error canceling booking');
//     }
//   };

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         console.log("hello")
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//         console.log("res", res);
//         setBookings(res.data);
//       } catch (error) {
//         toast.error('Failed to load bookings');
//       }
//     };
//     fetchBookings();

//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100vw', tableLayout: 'fixed' }}>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
//               <th style={{ width: '15%' }} data-title="Full Address">Address</th>
//               <th style={{ width: '5%' }} data-title="Age">Age</th>
//               <th style={{ width: '8%' }} data-title="Phone No.">Phone</th>
//               <th style={{ width: '10%' }} data-title="Email Address">Email</th>
//               <th style={{ width: '5%' }} data-title="Gender">Gender</th>
//               <th style={{ width: '10%' }} data-title="Assigned Doctor">Doctor</th>
//               <th style={{ width: '11%' }} data-title="Appointment Availability">Availability</th>
//               <th style={{ width: '5%' }} data-title="Cnc">Confirm Booking</th>
//               <th style={{ width: '5%' }} data-title="Cnf">Cancel Booking</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td>{booking.name}</td>
//                   <td>{booking.address}</td>
//                   <td>{booking.age}</td>
//                   <td>{booking.phone}</td>
//                   <td>{booking.email}</td>
//                   <td>{booking.gender}</td>
//                   <td>{booking.doctor}</td>
//                   <td>{booking.availability}</td>
//                   <td>
//               <button className="green" onClick={() => handleConfirm(booking.id)}>
//                 <FaCheck />
//               </button>
//             </td>
//             <td>
//               <button className="red" onClick={() => handleCancel(booking.id)}>
//                 <FaTimes />
//               </button>
//             </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9">No bookings available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ViewBookings;

//===========================================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   // Format time to 12-hour format
//   const formatTimeTo12Hour = (time) => {
//     if (!time || typeof time !== 'string') return 'N/A';

//     const [hours, minutes] = time.split(':').map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';

//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
//   };

//   // Parse and format availability
//   function formatAvailability(availability) {
//     if (!Array.isArray(availability) || availability.length === 0) {
//       return 'No availability'; // Handle the case where availability is empty or not an array
//     }

//     return availability.map(({ day, timeSlots }) => {
//       if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
//         return `${day}: No time slots available`;
//       }

//       // Format time slots
//       const formattedTimeSlots = timeSlots.map(slot => 
//         `${formatTimeTo12Hour(slot.startTime)} - ${formatTimeTo12Hour(slot.endTime)}`
//       ).join(', ');

//       return `${day}: ${formattedTimeSlots}`;
//     }).join(' | '); // Join days with a separator
//   }

//   // Handle confirming a booking
//   const handleConfirm = async (bookingId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//       toast.success('Booking confirmed successfully!');
//     } catch (error) {
//       toast.error('Error confirming booking');
//     }
//   };

//   // Handle canceling a booking
//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//       toast.success('Booking canceled successfully!');
//     } catch (error) {
//       toast.error('Error canceling booking');
//     }
//   };

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//         setBookings(res.data);
//       } catch (error) {
//         toast.error('Failed to load bookings');
//       }
//     };
//     fetchBookings();
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100vw', tableLayout: 'fixed' }}>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
//               <th style={{ width: '15%' }} data-title="Full Address">Address</th>
//               <th style={{ width: '5%' }} data-title="Age">Age</th>
//               <th style={{ width: '8%' }} data-title="Phone No.">Phone</th>
//               <th style={{ width: '10%' }} data-title="Email Address">Email</th>
//               <th style={{ width: '5%' }} data-title="Gender">Gender</th>
//               <th style={{ width: '10%' }} data-title="Assigned Doctor">Doctor</th>
//               <th style={{ width: '15%' }} data-title="Appointment Availability">Availability</th>
//               <th style={{ width: '5%' }} data-title="Cnc">Confirm Booking</th>
//               <th style={{ width: '5%' }} data-title="Cnf">Cancel Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td>{booking.name}</td>
//                   <td>{booking.address}</td>
//                   <td>{booking.age}</td>
//                   <td>{booking.phone}</td>
//                   <td>{booking.email}</td>
//                   <td>{booking.gender}</td>
//                   <td>{booking.doctor}</td>
//                   <td>{formatAvailability(booking.availability)}</td>
//                   <td>
//                     <button className="green" onClick={() => handleConfirm(booking.id)}>
//                       <FaCheck />
//                     </button>
//                   </td>
//                   <td>
//                     <button className="red" onClick={() => handleCancel(booking.id)}>
//                       <FaTimes />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10">No bookings available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewBookings;

//=========================modificed==============
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   // Format time to 12-hour format
//   const formatTimeTo12Hour = (time) => {
//     if (!time || typeof time !== 'string') return 'N/A';

//     const [hours, minutes] = time.split(':').map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';

//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
//   };

//   // Parse and format availability
//   function formatAvailability(availability) {
//     console.log('Availability:', JSON.stringify(availability, null, 2));
//     if (!Array.isArray(availability) || availability.length === 0) {
//       return 'No availability'; // Handle the case where availability is empty or not an array
//     }

//     return availability.map(({ day, timeSlots }) => {
//       if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
//         return `${day}: No time slots available`;
//       }

//       // Format time slots
//       const formattedTimeSlots = timeSlots.map(slot => {
//         // Assuming slot has startTime and endTime as strings
//         return `${formatTimeTo12Hour(slot.startTime)} - ${formatTimeTo12Hour(slot.endTime)}`;
//       }).join(', ');

//       return `${day}: ${formattedTimeSlots}`;
//     }).join(' | '); // Join days with a separator
//   }

//   // Handle confirming a booking
//   const handleConfirm = async (bookingId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//       toast.success('Booking confirmed successfully!');
//     } catch (error) {
//       toast.error('Error confirming booking');
//     }
//   };

//   // Handle canceling a booking
//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//       toast.success('Booking canceled successfully!');
//     } catch (error) {
//       toast.error('Error canceling booking');
//     }
//   };

//   // Fetch bookings
//   // useEffect(() => {
//   //   const fetchBookings = async () => {
//   //     try {
//   //       const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//   //       setBookings(res.data);
//   //     } catch (error) {
//   //       toast.error('Failed to load bookings');
//   //     }
//   //   };
//   //   fetchBookings();
//   // }, []);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//         console.log('API Response:', res.data); // Log the full response
//         setBookings(res.data);
//       } catch (error) {
//         toast.error('Failed to load bookings');
//       }
//     };
//     fetchBookings();
//   }, []);


//   return (
//     <div>
//       <ToastContainer />
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100vw', tableLayout: 'fixed' }}>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
//               <th style={{ width: '15%' }} data-title="Full Address">Address</th>
//               <th style={{ width: '5%' }} data-title="Age">Age</th>
//               <th style={{ width: '8%' }} data-title="Phone No.">Phone</th>
//               <th style={{ width: '10%' }} data-title="Email Address">Email</th>
//               <th style={{ width: '5%' }} data-title="Gender">Gender</th>
//               <th style={{ width: '10%' }} data-title="Assigned Doctor">Doctor</th>
//               <th style={{ width: '15%' }} data-title="Appointment Availability">Availability</th>
//               <th style={{ width: '5%' }} data-title="Cnc">Confirm Booking</th>
//               <th style={{ width: '5%' }} data-title="Cnf">Cancel Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => {
//                 console.log('Booking:', booking); // Log each booking object
//                 console.log('Availability:', booking.availability); // Log availability for each booking
//                 return (
//                   <tr key={booking.id}>
//                     <td>{booking.name}</td>
//                     <td>{booking.address}</td>
//                     <td>{booking.age}</td>
//                     <td>{booking.phone}</td>
//                     <td>{booking.email}</td>
//                     <td>{booking.gender}</td>
//                     <td>{booking.doctor}</td>
//                     <td>{formatAvailability(booking.availability || [])}</td> {/* Adjusted for safety */}
//                     <td>
//                       <button className="green" onClick={() => handleConfirm(booking.id)}>
//                         <FaCheck />
//                       </button>
//                     </td>
//                     <td>
//                       <button className="red" onClick={() => handleCancel(booking.id)}>
//                         <FaTimes />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })

//             ) : (
//               <tr>
//                 <td colSpan="10">No bookings available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewBookings;

//================modeified 2=================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   // Format time to 12-hour format
//   const formatTimeTo12Hour = (time) => {
//     if (!time || typeof time !== 'string') return 'N/A';

//     const [hours, minutes] = time.split(':').map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';

//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'long', // or '2-digit' for numeric month
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: true, // Ensures 12-hour format with AM/PM
//     });
//   };
//   // Handle confirming a booking
//   const handleConfirm = async (bookingId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//       toast.success('Booking confirmed successfully!');
//     } catch (error) {
//       toast.error('Error confirming booking');
//     }
//   };

//   // Handle canceling a booking
//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//       toast.success('Booking canceled successfully!');
//     } catch (error) {
//       toast.error('Error canceling booking');
//     }
//   };

//   // Fetch bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//         setBookings(res.data);
//       } catch (error) {
//         toast.error('Failed to load bookings');
//       }
//     };
//     fetchBookings();
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100vw' }}>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
//               <th style={{ width: '22%' }} data-title="Full Address">Address</th>
//               <th style={{ width: '5%' }} data-title="Age">Age</th>
//               <th style={{ width: '10%' }} data-title="Phone No.">Phone</th>
//               <th style={{ width: '17%' }} data-title="Email Address">Email</th>
//               <th style={{ width: '5%' }} data-title="Gender">Gender</th>
//               <th style={{ width: '15%' }} data-title="Assigned Doctor">Doctor</th>
//               <th style={{ width: '10%' }} data-title="Selected Day">Day</th>
//               <th style={{ width: '15%' }} data-title="Time Slot">Time Slot</th>
//               <th style={{ width: '19%' }} data-title="Time Stamp">Time Stamp</th>
//               <th style={{ width: '5%' }} data-title="Cnf">Confirm Booking</th>
//               <th style={{ width: '5%' }} data-title="Cnc">Cancel Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td>{booking.name}</td>
//                   <td>{booking.address}</td>
//                   <td>{booking.age}</td>
//                   <td>{booking.phone}</td>
//                   <td>{booking.email}</td>
//                   <td>{booking.gender}</td>
//                   <td>{booking.doctor}</td>
//                   <td>{booking.day || 'N/A'}</td>
//                   <td>
//                     {booking.timeSlot ? (
//                       booking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ')
//                     ) : 'N/A'}
//                   </td>
//                   <td>{formatTimestamp(booking.timeStamp)}</td>
//                   <td>
//                     <button className="green" onClick={() => handleConfirm(booking.id)}>
//                       <FaCheck />
//                     </button>
//                   </td>
//                   <td>
//                     <button className="red" onClick={() => handleCancel(booking.id)}>
//                       <FaTimes />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="11">No bookings available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewBookings;

//===========================modified 3======================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import './ViewBookings.css'; // Create this CSS file for popup styles

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true); // State for loading
//   const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

//   // Format time to 12-hour format
//   const formatTimeTo12Hour = (time) => {
//     if (!time || typeof time !== 'string') return 'N/A';

//     const [hours, minutes] = time.split(':').map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';

//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: true,
//     });
//   };

//   // Handle confirming a booking
//   const handleConfirm = async (bookingId) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//       toast.success('Booking confirmed successfully!');
//       fetchBookings(); // Refresh bookings after confirming
//     } catch (error) {
//       toast.error('Error confirming booking');
//     }
//   };

//   // Handle canceling a booking
//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//       toast.success('Booking canceled successfully!');
//       fetchBookings(); // Refresh bookings after canceling
//     } catch (error) {
//       toast.error('Error canceling booking');
//     }
//   };

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoading(true); // Set loading state to true
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//       setBookings(res.data);
//     } catch (error) {
//       toast.error('Failed to load bookings');
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Open popup with booking details
//   const openPopup = (booking) => {
//     setSelectedBooking(booking);
//     setIsPopupOpen(true);
//   };

//   // Close popup
//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedBooking(null);
//   };

//   return (
//     <div>
//       <ToastContainer />
//       {loading ? (
//         <div>Loading...</div> // Loading indicator
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '100vw',tableLayout: 'fixed'  }}>
//             <thead>
//               <tr>
//                 <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
//                 {/* <th style={{ width: '15%' }} data-title="Full Address">Address</th> */}
//                 <th style={{ width: '5%' }} data-title="Age">Age</th>
//                 <th style={{ width: '8%' }} data-title="Phone No.">Phone</th>
//                 <th style={{ width: '10%' }}  data-title="Email Address">Email</th>
//                 <th style={{ width: '5%' }}  data-title="Gender">Gender</th>
//                 <th style={{ width: '10%' }}data-title="Assigned Doctor">Doctor</th>
//                 <th style={{ width: '5%' }} data-title="Selected Day">Day</th>
//                 <th style={{ width: '8%' }} data-title="Time Slot">Time Slot</th>
//                 {/* <th style={{ width: '15%' }} data-title="Time Stamp">Time Stamp</th> */}
//                 {/* <th style={{ width: '5%' }} data-title="Cnf">Confirm Booking</th>
//                 <th style={{ width: '5%' }} data-title="Cnc">Cancel Booking</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.length > 0 ? (
//                 bookings.map((booking) => (
//                   <tr key={booking.id} onClick={() => openPopup(booking)}> {/* Click to open popup */}
//                     <td style={{ cursor: 'pointer', color: '#007BFF'}}><strong>{booking.name}</strong></td>
//                     {/* <td>{booking.address}</td> */}
//                     <td>{booking.age}</td>
//                     <td>{booking.phone}</td>
//                     <td>{booking.email}</td>
//                     <td>{booking.gender}</td>
//                     <td>{booking.doctor}</td>
//                     <td>{booking.day || 'N/A'}</td>
//                     <td>
//                       {booking.timeSlot ? (
//                         booking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ')
//                       ) : 'N/A'}
//                     </td>
//                     {/* <td>{formatTimestamp(booking.timeStamp)}</td> */}
//                     {/* <td>
//                       <button className="green" onClick={(e) => { e.stopPropagation(); handleConfirm(booking.id); }} aria-label="Confirm Booking">
//                         <FaCheck />
//                       </button>
//                     </td>
//                     <td>
//                       <button className="red" onClick={(e) => { e.stopPropagation(); handleCancel(booking.id); }} aria-label="Cancel Booking">
//                         <FaTimes />
//                       </button>
//                     </td> */}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="12">No bookings available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Popup for booking details */}
//       {isPopupOpen && selectedBooking && (
//   <div className="modal fade bd-example-modal-lg show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
//     <div className="modal-dialog modal-lg">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title" style={{ margin: 0 }}>Booking Details</h5>
//           <button type="button" className="close" onClick={closePopup} aria-label="Close" style={{ marginLeft: 'auto' }}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>
//             <div>
//               <strong>Name:</strong> {selectedBooking.name}
//             </div>
//             <div style={{ flex: 1, textAlign: 'center' }}>
//               <strong>Age:</strong> {selectedBooking.age}
//             </div>
//             <div style={{ textAlign: 'right' }}>
//               <strong>Gender:</strong> {selectedBooking.gender}
//             </div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #dee2e6', paddingBottom: '10px' }}>
//             <div>
//               <strong>Email:</strong> {selectedBooking.email}
//             </div>
//             <div>
//               <strong>Phone:</strong> {selectedBooking.phone}
//             </div>
//             <div>
//               <strong>Doctor:</strong> {selectedBooking.doctor}
//             </div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
//             <div>
//               <strong>Day:</strong> {selectedBooking.day || 'N/A'}
//             </div>
//             <div>
//               <strong>Time Slot:</strong> {selectedBooking.timeSlot ? selectedBooking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ') : 'N/A'}
//             </div>
//             <div>
//               <strong>Time Stamp:</strong> {formatTimestamp(selectedBooking.timeStamp)}
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <button className="btn btn-success" onClick={() => handleConfirm(selectedBooking.id)}>Confirm</button>
//           <button className="btn btn-danger" onClick={() => handleCancel(selectedBooking.id)}>Cancel</button>
//           <button className="btn btn-primary" onClick={closePopup}>Close</button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}




//     </div>
//   );
// };

// export default ViewBookings;
//================modif 4========================

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewBookings.css'; // Add your CSS styles here

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formatTimeTo12Hour = (time) => {
    if (!time || typeof time !== 'string') return 'N/A';
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  };

  const handleConfirm = async (bookingId) => {
    try {
      await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
      toast.success('Booking confirmed successfully!');
      fetchBookings();
    } catch (error) {
      toast.error('Error confirming booking');
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
      toast.success('Booking canceled successfully!');
      fetchBookings();
    } catch (error) {
      toast.error('Error canceling booking');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
      setBookings(res.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openPopup = (booking) => {
    setSelectedBooking(booking);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100vw', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '10%' }} data-title="Patient's Name">Name</th>
                <th style={{ width: '5%' }} data-title="Age">Age</th>
                <th style={{ width: '8%' }} data-title="Phone No.">Phone</th>
                <th style={{ width: '10%' }} data-title="Email Address">Email</th>
                <th style={{ width: '5%' }} data-title="Gender">Gender</th>
                <th style={{ width: '10%' }} data-title="Assigned Doctor">Doctor</th>
                <th style={{ width: '5%' }} data-title="Selected Day">Day</th>
                <th style={{ width: '8%' }} data-title="Time Slot">Appointment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} onClick={() => openPopup(booking)}>
                    <td style={{ cursor: 'pointer', color: '#007BFF' }}><strong>{booking.name}</strong></td>
                    <td>{booking.age}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                    <td>{booking.gender}</td>
                    <td>{booking.doctor}</td>
                    <td>{booking.day || 'N/A'}</td>
                    <td>
                      {booking.timeSlot ? (
                        booking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ')
                      ) : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup for booking details */}
      {isPopupOpen && selectedBooking && (
  <div className="modal fade bd-example-modal-lg show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" style={{ margin: 0 }}>Booking Details</h5>
          <button
            type="button"
            className="close"
            onClick={closePopup}
            aria-label="Close"
            style={{
              marginLeft: 'auto',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0ccaf0',
              border: 'none',
              cursor: 'pointer'
            }}>
            <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>&times;</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="container-fluid">
            <div className="row mb-3 even-row">
              <div className="col-md-5">
                <strong>Name:</strong> {selectedBooking.name}
              </div>
              <div className="col-md-3">
                <strong>Gender:</strong> {selectedBooking.gender}
              </div>
              <div className="col-md-4">
                <strong>Age:</strong> {selectedBooking.age}
              </div>
            </div>
            <div className="row mb-3 odd-row">
              <div className="col-md-5">
                <strong>Email:</strong> {selectedBooking.email}
              </div>
              <div className="col-md-3">
                <strong>Phone:</strong> {selectedBooking.phone}
              </div>
              <div className="col-md-4">
                <strong>Doctor:</strong> {selectedBooking.doctor}
              </div>
              <div className="row odd-row">
              <div className="col-md-12 mt-3">
                <strong>Address:</strong> { selectedBooking.address}
              </div>
            </div>
            </div>
            <div className="row mb-3 even-row">
              <div className="col-md-3">
                <strong>Day:</strong> {selectedBooking.day || 'N/A'}
              </div>
              <div className="col-md-6">
                <strong>Appointment Schedule:</strong> {selectedBooking.timeSlot ? selectedBooking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ') : 'N/A'}
              </div>
            </div>
            <div className="row odd-row">
              <div className="col-md-6">
                <strong>Booking Time:</strong> {formatTimestamp(selectedBooking.timeStamp)}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={() => handleConfirm(selectedBooking.id)}>Confirm</button>
          <button className="btn btn-danger" onClick={() => handleCancel(selectedBooking.id)}>Cancel</button>
          <button className="btn btn-info" onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewBookings;


