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
    <div>
      <table style={{ width: '100%', maxWidth: '100%', }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone No.</th>
            <th>Address</th>
            <th>Consultation Limit</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td onClick={() => setSelectedDoctor(doctor)} style={{ cursor: 'pointer', color: '#007BFF', textAlign: 'left' }}>
                  {doctor.name}
                </td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.address}</td>
                <td>{doctor.consultation || 'N/A'}</td>
                <td>{doctor.status || 'Active'}</td>
                <td>

                  <Button variant="warning" className='btn-sm' onClick={() => openEditPopup(doctor)}>Edit</Button>{' '}
                  <Button
                    className='btn-sm'
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
      <Modal show={!!selectedDoctor} onHide={closePopup} centered>
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
      <Modal show={showPasscodeModal} onHide={() => setShowPasscodeModal(false)}
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

