// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const ViewDoctors = () => {
//   const [doctors, setDoctorss] = useState([]);
//   const [selectedDay, setSelectedDay] = useState('');

//   console.log("doctors:::", doctors);

//   //Fetch All doctors
//   // View Doctors
//   useEffect(() => {

//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
//         setDoctorss(res.data);
//       } catch (error) {
//         toast.error('Failed to load bookings');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleDaySelect = (day) => {
//     setSelectedDay(day);
//   };

//   const formatTimeTo12Hour = (time) => {
//     if (!time) return ''; // Return an empty string if time is undefined
//     const [hour, minute] = time.split(':');
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ width: '10%' }}>Name</th>
//             {/* <th style={{ width: '8%' }}>Doctor Id</th> */}
//             <th style={{ width: '12%' }}>Specialization</th>
//             <th style={{ width: '20%' }}>Availability</th>
//             <th style={{ width: '10%' }}>Phone No.</th>
//             <th style={{ width: '15%' }}>Address</th>
//             <th style={{ width: '10%' }}>Consultation Limit</th>
//             {/* <th style={{ width: '6%' }}>Experience (yrs)</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td>{doctor.name}</td>
//                 {/* <td>{doctor.docId}</td> */}
//                 <td>{doctor.specialization}</td>
//                 <td>
//                   <div className="availability-dropdown">
//                     <select
//                       value={selectedDay}
//                       onChange={(e) => handleDaySelect(e.target.value)}
//                     >
//                       <option value="">Select Day</option>
//                       {doctor.availability.map((slot) => (
//                         <option key={slot.day} value={slot.day}>
//                           {slot.day}
//                         </option>
//                       ))}
//                     </select>
//                     {doctor.availability
//                       .filter((slot) => slot.day === selectedDay)
//                       .map((slot) => (
//                         <div key={slot.day}>
//                           {slot.timeSlots.map((timeSlot, index) => (
//                             <div key={index} className="time-slot">
//                               {formatTimeTo12Hour(timeSlot.startTime)} - {formatTimeTo12Hour(timeSlot.endTime)}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//                 </td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.address}</td>
//                 <td>{doctor.consultation || 'N/A'}</td>
//                 {/* <td>{doctor.experience}</td> */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" style={{ textAlign: 'center' }}>No Doctors available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ViewDoctors;


//===================================================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './ViewDoctors.css'; 

// const ViewDoctors = () => {
//   const [doctors, setDoctorss] = useState([]);
//   const [selectedDay, setSelectedDay] = useState('');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedAvailabilityDay, setSelectedAvailabilityDay] = useState('');


//   // Fetch All doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
//         setDoctorss(res.data);
//       } catch (error) {
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleDaySelect = (day) => {
//     setSelectedDay(day);
//   };

//   const formatTimeTo12Hour = (time) => {
//     if (!time) return ''; // Return an empty string if time is undefined
//     const [hour, minute] = time.split(':');
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const openPopup = (doctor) => {
//     setSelectedDoctor(doctor);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedDoctor(null);
//   };

//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ width: '10%' }}>Name</th>
//             <th style={{ width: '12%' }}>Specialization</th> 
//             <th style={{ width: '10%' }}>Phone No.</th>
//             <th style={{ width: '15%' }}>Address</th>
//             <th style={{ width: '10%' }}>Consultation Limit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td onClick={() => openPopup(doctor)} style={{ cursor: 'pointer', color: '#007BFF' }}>
//                   <strong>{doctor.name}</strong>
//                 </td>
//                 <td>{doctor.specialization}</td>
//                 {/* <td>
//                   <div className="availability-dropdown">
//                     <select value={selectedDay} onChange={(e) => handleDaySelect(e.target.value)}>
//                       <option value="">Select Day</option>
//                       {doctor.availability.map((slot) => (
//                         <option key={slot.day} value={slot.day}>
//                           {slot.day}
//                         </option>
//                       ))}
//                     </select>
//                     {doctor.availability
//                       .filter((slot) => slot.day === selectedDay)
//                       .map((slot) => (
//                         <div key={slot.day}>
//                           {slot.timeSlots.map((timeSlot, index) => (
//                             <div key={index} className="time-slot">
//                               {formatTimeTo12Hour(timeSlot.startTime)} - {formatTimeTo12Hour(timeSlot.endTime)}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//                 </td> */}
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.address}</td>
//                 <td>{doctor.consultation || 'N/A'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>No Doctors available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Popup Modal */}
//       {isPopupOpen && selectedDoctor && (
//   <div className="popup">
//     <div className="popup-content">
//       <h2>Doctor Details</h2>

//       {/* Row 1: Name and Age */}
//       <div className="details-row">
//         <p className="text-background"><strong>Name:</strong> <span>{selectedDoctor.name}</span></p>
//         <p className="text-background"><strong>Specialization:</strong> <span>{selectedDoctor.specialization}</span></p>
//       </div>

//       {/* Row 2: Specialization and Phone No */}
//       <div className="details-row">
//       <p className="text-background"><strong>Address:</strong> <span>{selectedDoctor.address}</span></p>
//         <p className="text-background"><strong>Phone No:</strong> <span>{selectedDoctor.phone}</span></p>
//       </div>

//       {/* Row 3: Address and Consultation Limit */}
//       <div className="details-row">
//         <p className="text-background"><strong>Consultation Limit:</strong> <span>{selectedDoctor.consultation || 'N/A'}</span></p>
//       </div>

//       <br />
//       <h3>Availability</h3>
//       <div className="availability-section">
//         {/* Left side: All time slots */}
//         <div className="time-slot-section">
//           {selectedDoctor.availability.map((slot, index) => (
//             <div key={index}>
//               {slot.timeSlots.map((timeSlot, idx) => (
//                 <div key={idx} className="time-slot text-background">
//                   {formatTimeTo12Hour(timeSlot.startTime)} - {formatTimeTo12Hour(timeSlot.endTime)}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Right side: Day */}
//         <div className="day-section">
//           {selectedDoctor.availability.map((slot, index) => (
//             <div key={index} className="day text-background">
//               {slot.day}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="button-container">
//         <button style={{ fontSize: '17px', padding: '7px' }} onClick={closePopup}>Close</button>
//       </div>
//     </div>
//   </div>
// )}



//     </div>
//   );
// }

// export default ViewDoctors;

//============================================//============================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ViewDoctors = () => {
//   const [doctors, setDoctorss] = useState([]);
//   const [selectedDay, setSelectedDay] = useState('');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   // Fetch All doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
//         setDoctorss(res.data);
//       } catch (error) {
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleDaySelect = (day) => {
//     setSelectedDay(day);
//   };

//   const formatTimeTo12Hour = (time) => {
//     if (!time) return ''; // Return an empty string if time is undefined
//     const [hour, minute] = time.split(':');
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const openPopup = (doctor) => {
//     setSelectedDoctor(doctor);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedDoctor(null);
//   };

//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ width: '10%' }}>Name</th>
//             <th style={{ width: '12%' }}>Specialization</th>
//             {/* <th style={{ width: '20%' }}>Availability</th> */}
//             <th style={{ width: '10%' }}>Phone No.</th>
//             <th style={{ width: '15%' }}>Address</th>
//             <th style={{ width: '10%' }}>Consultation Limit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td onClick={() => openPopup(doctor)} style={{ cursor: 'pointer', color: '#007BFF' }}>
//                   {doctor.name}
//                 </td>
//                 <td>{doctor.specialization}</td>
//                 {/* <td>
//                   <div className="availability-dropdown">
//                     <select value={selectedDay} onChange={(e) => handleDaySelect(e.target.value)}>
//                       <option value="">Select Day</option>
//                       {doctor.availability.map((slot) => (
//                         <option key={slot.day} value={slot.day}>
//                           {slot.day}
//                         </option>
//                       ))}
//                     </select>
//                     {doctor.availability
//                       .filter((slot) => slot.day === selectedDay)
//                       .map((slot) => (
//                         <div key={slot.day}>
//                           {slot.timeSlots.map((timeSlot, index) => (
//                             <div key={index} className="time-slot">
//                               {formatTimeTo12Hour(timeSlot.startTime)} - {formatTimeTo12Hour(timeSlot.endTime)}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//                 </td> */}
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.address}</td>
//                 <td>{doctor.consultation || 'N/A'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>No Doctors available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Popup Modal */}
//       {isPopupOpen && selectedDoctor && (
//   <div className="popup">
//     <div className="popup-content" style={{
//       width: '80%',  // Increased modal width
//       padding: '20px',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       margin: 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//     }}>
//       <h2>Doctor Details</h2>

//       {/* Row for Name and Specialization */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',  // Align items centrally
//         marginBottom: '15px',
//       }}>
//         <p><strong>Name:</strong> <span>{selectedDoctor.name}</span></p>
//         <p><strong>Specialization:</strong> <span>{selectedDoctor.specialization}</span></p>
//       </div>

//       {/* Block for Address */}
//       <div style={{
//         display: 'block',
//         marginBottom: '15px',
//       }}>
//         <p><strong>Address:</strong> <span>{selectedDoctor.address}</span></p>
//       </div>

//       {/* Row for Phone and Consultation limit */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',  // Align items centrally
//         marginBottom: '15px',
//       }}>
//         <p><strong>Phone No:</strong> <span>{selectedDoctor.phone}</span></p>
//         <p><strong>Consultation Limit:</strong> <span>{selectedDoctor.consultation || 'N/A'}</span></p>
//       </div>

//       {/* Availability Section */}
//       <h3>Availability</h3>
//       {selectedDoctor.availability.map((slot, index) => (
//         <div key={index} style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',  // Align items centrally
//           marginBottom: '5px',
//         }}>
//           {/* Time Slots first, then Day */}
//           <div>
//             {slot.timeSlots.map((timeSlot, idx) => (
//               <span key={idx} style={{ marginRight: '10px' }}>
//                 {formatTimeTo12Hour(timeSlot.startTime)} - {formatTimeTo12Hour(timeSlot.endTime)}
//               </span>
//             ))}
//           </div>
//           <div><strong>{slot.day}</strong></div>
//         </div>
//       ))}

//       {/* Close Button */}
//       <div className="button-container" style={{
//         textAlign: 'right',  // Align button to the right
//         marginTop: '20px',
//       }}>
//         <button onClick={closePopup} style={{
//           padding: '10px 20px',
//           backgroundColor: '#007BFF',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}>Close</button>
//       </div>
//     </div>
//   </div>
// )}



//     </div>
//   );
// }

// export default ViewDoctors;

//======================================================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal } from 'react-bootstrap'; // Import Bootstrap Modal
import './ViewDoctors.css';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch All doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
        setDoctors(res.data);
      } catch (error) {
        toast.error('Failed to load doctors');
      }
    };
    fetchDoctors();
  }, []);

  const formatTimeTo12Hour = (time) => {
    if (!time) return ''; // Return an empty string if time is undefined
    const [hour, minute] = time.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const openPopup = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Name</th>
            <th style={{ width: '12%' }}>Specialization</th>
            <th style={{ width: '10%' }}>Phone No.</th>
            <th style={{ width: '15%' }}>Address</th>
            <th style={{ width: '10%' }}>Consultation Limit</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td onClick={() => openPopup(doctor)} style={{ cursor: 'pointer', color: '#007BFF' }}>
                  {doctor.name}
                </td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.address}</td>
                <td>{doctor.consultation || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Doctors available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Bootstrap Modal for Doctor Details */}
      <Modal show={!!selectedDoctor} onHide={closePopup} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">Doctor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedDoctor && (
      <>
        {/* Row for Name and Phone No */}
        <div className="black-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '10px',
          marginRight: '10px',
        }}>
          <p style={{ marginLeft:'5px' }}><strong>Name:</strong> <span>{selectedDoctor.name}</span></p>
          <p style={{ marginRight: '150px',marginLeft:'5px' }}><strong>Phone No:</strong> <span>{selectedDoctor.phone}</span></p>
        </div>

        {/* Row for Specialization and Consultation Limit */}
        <div className="golden-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '10px',
          marginRight: '10px',
        }}>
          <p style={{ marginRight: '150px',marginLeft:'5px' }}><strong>Specialization:</strong> <span>{selectedDoctor.specialization}</span></p>
          <p style={{ marginRight: '150px' }}><strong>Consultation Limit:</strong> <span>{selectedDoctor.consultation || 'N/A'}</span></p>
        </div>

        {/* Block for Address */}
        <div className="black-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '10px',
          marginRight: '10px',
        }}>
          <p style={{marginRight:'5px', marginLeft:'5px'}}><strong>Address:</strong> <span>{selectedDoctor.address}</span></p>
        </div>
<br></br>
        {/* Availability Section */}
        <h4 style={{ marginLeft: "10px" }}><strong>Consultation Slots</strong></h4>
        {selectedDoctor.availability.map((slot, index) => (
          <div key={index} className={index % 2 === 0 ? 'golden-row' : 'black-row'} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
            marginLeft: '10px',
            marginRight: '10px',
          }}>
            {/* Time Slots first, then Day */}
            <div>
              {slot.timeSlots.map((timeSlot, idx) => (
                <span key={idx} style={{ marginRight: '10px', marginLeft:'5px' }}>
                  {formatTimeTo12Hour(timeSlot.startTime)} <strong>&nbsp;-&nbsp; </strong> {formatTimeTo12Hour(timeSlot.endTime)},
                </span>
              ))}
            </div>
            <div style={{ marginRight: '150px' }}><strong>{slot.day}</strong></div>
          </div>
        ))}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <button onClick={closePopup} className="btn btn-info">Close</button>
  </Modal.Footer>
</Modal>



    </div>
  );
}

export default ViewDoctors;


