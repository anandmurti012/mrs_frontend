//  import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Modal } from 'react-bootstrap'; // Import Bootstrap Modal
// import './ViewDoctors.css';

// const ViewDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   // Fetch All doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
//         setDoctors(res.data);
//       } catch (error) {
//         toast.error('Failed to load doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const formatTimeTo12Hour = (time) => {
//     if (!time) return ''; // Return an empty string if time is undefined
//     const [hour, minute] = time.split(':');
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const openPopup = (doctor) => {
//     setSelectedDoctor(doctor);
//   };

//   const closePopup = () => {
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
//                   {doctor.name}
//                 </td>
//                 <td>{doctor.specialization}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.address}</td>
//                 <td>{doctor.consultation || 'N/A'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" style={{ textAlign: 'center' }}>No Doctors available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Bootstrap Modal for Doctor Details */}
//       <Modal show={!!selectedDoctor} onHide={closePopup} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//   <Modal.Header closeButton>
//     <Modal.Title id="contained-modal-title-vcenter">Doctor Details</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     {selectedDoctor && (
//       <>
//         {/* Row for Name and Phone No */}
//         <div className="black-row" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginLeft: '10px',
//           marginRight: '10px',
//         }}>
//           <p style={{ marginLeft:'5px' }}><strong>Name:</strong> <span>{selectedDoctor.name}</span></p>
//           <p style={{ marginRight: '150px',marginLeft:'5px' }}><strong>Phone No:</strong> <span>{selectedDoctor.phone}</span></p>
//         </div>

//         {/* Row for Specialization and Consultation Limit */}
//         <div className="golden-row" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginLeft: '10px',
//           marginRight: '10px',
//         }}>
//           <p style={{ marginRight: '150px',marginLeft:'5px' }}><strong>Specialization:</strong> <span>{selectedDoctor.specialization}</span></p>
//           <p style={{ marginRight: '150px' }}><strong>Consultation Limit:</strong> <span>{selectedDoctor.consultation || 'N/A'}</span></p>
//         </div>

//         {/* Block for Address */}
//         <div className="black-row" style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginLeft: '10px',
//           marginRight: '10px',
//         }}>
//           <p style={{marginRight:'5px', marginLeft:'5px'}}><strong>Address:</strong> <span>{selectedDoctor.address}</span></p>
//         </div>
// <br></br>
//         {/* Availability Section */}
//         <h4 style={{ marginLeft: "10px" }}><strong>Consultation Slots</strong></h4>
//         {selectedDoctor.availability.map((slot, index) => (
//           <div key={index} className={index % 2 === 0 ? 'golden-row' : 'black-row'} style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '15px',
//             marginLeft: '10px',
//             marginRight: '10px',
//           }}>
//             {/* Time Slots first, then Day */}
//             <div>
//               {slot.timeSlots.map((timeSlot, idx) => (
//                 <span key={idx} style={{ marginRight: '10px', marginLeft:'5px' }}>
//                   {formatTimeTo12Hour(timeSlot.startTime)} <strong>&nbsp;-&nbsp; </strong> {formatTimeTo12Hour(timeSlot.endTime)},
//                 </span>
//               ))}
//             </div>
//             <div style={{ marginRight: '150px' }}><strong>{slot.day}</strong></div>
//           </div>
//         ))}
//       </>
//     )}
//   </Modal.Body>
//   <Modal.Footer>
//     <button onClick={closePopup} className="btn btn-info">Close</button>
//   </Modal.Footer>
// </Modal>



//     </div>
//   );
// }

// export default ViewDoctors;


//=====================================//=================================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button, Form } from 'react-bootstrap';
// import './ViewDoctors.css';

// const ViewDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [doctorForm, setDoctorForm] = useState({});

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // const fetchDoctors = async () => {
//   //   try {
//   //     const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
//   //     setDoctors(res.data);
//   //   } catch (error) {
//   //     toast.error('Failed to load doctors');
//   //   }
//   // };

//   const formatTimeTo12Hour = (time) => {
//     if (!time) return '';
//     const [hour, minute] = time.split(':');
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   const openEditPopup = (doctor) => {
//     setSelectedDoctor(doctor);
//     setDoctorForm(doctor);
//     setIsEditMode(true);
//   };

//   const closePopup = () => {
//     setSelectedDoctor(null);
//     setIsEditMode(false);
//   };

//   const handleEditChange = (e) => {
//     setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
//   };

//   const saveDoctorChanges = async () => {
//     try {
//       console.log("doctorForm", doctorForm);
//       await axios.patch(`${process.env.REACT_APP_APIURL}/api/update-doctors/`, { ...doctorForm, id: doctorForm.id },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'token'
//           }
//         }
//       );

//       fetchDoctors();
//       toast.success('Doctor details updated');
//       closePopup();
//     } catch (error) {
//       console.log(error)
//       toast.error('Failed to update doctor');
//     }
//   };

//   // const deleteDoctor = async (id) => {
//   //   try {
//   //     await axios.delete(`${process.env.REACT_APP_APIURL}/api/doctors/${id}`);
//   //     setDoctors(doctors.filter((doctor) => doctor.id !== id));
//   //     toast.success('Doctor deleted');
//   //   } catch (error) {
//   //     toast.error('Failed to delete doctor');
//   //   }
//   // };
//   const toggleDoctorStatus = async (doctor) => {
//     const updatedStatus = doctor.status === 'Active' ? 'Blocked' : 'Active';
//     try {
//       await axios.patch(`${process.env.REACT_APP_APIURL}/api/update-doctor-status`, {
//         id: doctor.id,
//         status: updatedStatus,
//       });
//       // Refresh the doctor list after updating status
//       fetchDoctors();
//       toast.success(`Doctor ${updatedStatus}`);
//     } catch (error) {
//       toast.error(`Failed to update status to ${updatedStatus}`);
//     }
//   };
  
//   // Fetch active doctors only
//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors`);
//       setDoctors(response.data); // Only active doctors will be set
//     } catch (error) {
//       console.error("Failed to fetch doctors:", error);
//     }
//   };
  
//   // Call fetchDoctors initially to load doctors
//   useEffect(() => {
//     fetchDoctors();
//   }, []);
  


//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'fixed' }}>
//         <thead>
//           <tr>
//             <th style={{ width: '10%' }}>Name</th>
//             <th style={{ width: '12%' }}>Specialization</th>
//             <th style={{ width: '10%' }}>Phone No.</th>
//             <th style={{ width: '10%' }}>Address</th>
//             <th style={{ width: '10%' }}>Consultation Limit</th>
//             <th style={{ width: '10%' }}>Status</th>
//             <th style={{ width: '10%' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td onClick={() => setSelectedDoctor(doctor)} style={{ cursor: 'pointer', color: '#007BFF' }}>
//                   {doctor.name}
//                 </td>
//                 <td>{doctor.specialization}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.address}</td>
//                 <td>{doctor.consultation || 'N/A'}</td>
//                 <td>{doctor.status || 'Active'}</td>
//                 <td>
//                   <Button variant="warning" onClick={() => openEditPopup(doctor)}>Edit</Button>{' '}
//                   <Button
//                     variant={doctor.status === 'Active' ? 'danger' : 'secondary'}
//                     onClick={() => toggleDoctorStatus(doctor)}
//                   >
//                     {doctor.status === 'Active' ? 'Block' : 'Activate'}
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" style={{ textAlign: 'center' }}>No Doctors available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Modal for Doctor Details */}
//       <Modal show={!!selectedDoctor} onHide={closePopup} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditMode ? 'Edit Doctor' : 'Doctor Details'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedDoctor && (
//             <>
//               {isEditMode ? (
//                 <Form>
//                   <Form.Group controlId="formDoctorName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={doctorForm.name}
//                       onChange={handleEditChange}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formDoctorPhone">
//                     <Form.Label>Phone No.</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="phone"
//                       value={doctorForm.phone}
//                       onChange={handleEditChange}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formDoctorSpecialization">
//                     <Form.Label>Specialization</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="specialization"
//                       value={doctorForm.specialization}
//                       onChange={handleEditChange}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formDoctorAddress">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="address"
//                       value={doctorForm.address}
//                       onChange={handleEditChange}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formDoctorConsultation">
//                     <Form.Label>Consultation Limit</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="consultation"
//                       value={doctorForm.consultation}
//                       onChange={handleEditChange}
//                     />
//                   </Form.Group>
//                 </Form>
//               ) : (
//                 // Display doctor details if not in edit mode
//                 <div>
//                   <p><strong>Name:</strong> {selectedDoctor.name}</p>
//                   <p><strong>Phone No:</strong> {selectedDoctor.phone}</p>
//                   <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
//                   <p><strong>Address:</strong> {selectedDoctor.address}</p>
//                   <p><strong>Consultation Limit:</strong> {selectedDoctor.consultation || 'N/A'}</p>
//                 </div>
//               )}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           {isEditMode ? (
//             <Button variant="primary" onClick={saveDoctorChanges}>Save Changes</Button>
//           ) : null}
//           <Button variant="secondary" onClick={closePopup}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//       <ToastContainer />
//     </div>
//   );
// }

// export default ViewDoctors;


//=====================================//===========================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './ViewDoctors.css';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [doctorForm, setDoctorForm] = useState({});
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [doctorToToggle, setDoctorToToggle] = useState(null);
  const admin = useSelector((state) => state.doctor.user);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const openEditPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorForm(doctor);
    setIsEditMode(true);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
    setIsEditMode(false);
  };

  const handleEditChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const saveDoctorChanges = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_APIURL}/api/update-doctors/`, { ...doctorForm, id: doctorForm.id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token',
        },
      });

      fetchDoctors();
      toast.success('Doctor details updated');
      closePopup();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update doctor');
    }
  };

  const toggleDoctorStatus = async () => {
    const updatedStatus = doctorToToggle.status === 'Active' ? 'Blocked' : 'Active';
    try {
      await axios.patch(`${process.env.REACT_APP_APIURL}/api/update-doctor-status`, {
        id: doctorToToggle.id,
        status: updatedStatus,
      });
      fetchDoctors();
      toast.success(`Doctor ${updatedStatus}`);
      setShowPasscodeModal(false);
      setPasscode('');
      setDoctorToToggle(null);
    } catch (error) {
      toast.error(`Failed to update status to ${updatedStatus}`);
    }
  };

  const handlePasscodeSubmit = () => {
    if (passcode === admin?.passCode) {
      toggleDoctorStatus();
    } else {
      toast.error('Invalid passcode');
    }
  };

  const handleActivateClick = (doctor) => {
    setDoctorToToggle(doctor);
    setShowPasscodeModal(true);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Name</th>
            <th style={{ width: '12%' }}>Specialization</th>
            <th style={{ width: '10%' }}>Phone No.</th>
            <th style={{ width: '10%' }}>Address</th>
            <th style={{ width: '10%' }}>Consultation Limit</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td onClick={() => setSelectedDoctor(doctor)} style={{ cursor: 'pointer', color: '#007BFF' }}>
                  {doctor.name}
                </td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.address}</td>
                <td>{doctor.consultation || 'N/A'}</td>
                <td>{doctor.status || 'Active'}</td>
                <td>
                  <Button variant="warning" onClick={() => openEditPopup(doctor)}>Edit</Button>{' '}
                  <Button
                    variant={doctor.status === 'Active' ? 'danger' : 'secondary'}
                    onClick={() => handleActivateClick(doctor)}
                  >
                    {doctor.status === 'Active' ? 'Block' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No Doctors available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Doctor Details */}
      <Modal show={!!selectedDoctor} onHide={closePopup} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Doctor' : 'Doctor Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <>
              {isEditMode ? (
                <Form>
                  <Form.Group controlId="formDoctorName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={doctorForm.name}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDoctorPhone">
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={doctorForm.phone}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDoctorSpecialization">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control
                      type="text"
                      name="specialization"
                      value={doctorForm.specialization}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDoctorAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={doctorForm.address}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDoctorConsultation">
                    <Form.Label>Consultation Limit</Form.Label>
                    <Form.Control
                      type="text"
                      name="consultation"
                      value={doctorForm.consultation}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Form>
              ) : (
                <div>
                  <p><strong>Name:</strong> {selectedDoctor.name}</p>
                  <p><strong>Phone No:</strong> {selectedDoctor.phone}</p>
                  <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                  <p><strong>Address:</strong> {selectedDoctor.address}</p>
                  <p><strong>Consultation Limit:</strong> {selectedDoctor.consultation || 'N/A'}</p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditMode ? (
            <Button variant="primary" onClick={saveDoctorChanges}>Save Changes</Button>
          ) : null}
          <Button variant="secondary" onClick={closePopup}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Passcode Modal */}
      <Modal show={showPasscodeModal} onHide={() => setShowPasscodeModal(false)} size="sm"
       centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Passcode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="passcodeInput">
            <Form.Label>Passcode</Form.Label>
            <Form.Control
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasscodeSubmit}>Submit</Button>
          <Button variant="secondary" onClick={() => setShowPasscodeModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ViewDoctors;

