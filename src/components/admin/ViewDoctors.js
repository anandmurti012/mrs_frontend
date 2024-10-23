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


