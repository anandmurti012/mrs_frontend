import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faCancel } from '@fortawesome/free-solid-svg-icons';
import './ViewBookings.css'; // Add your CSS styles here

const ConfirmedBooking = () => {
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



  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/bookings/`);
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
          <table style={{ width: '90vw', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '7%' }} data-title="Patient's Name">Name</th>
                {/* <th style={{ width: '5%' }} data-title="Age">Age</th> */}
                <th style={{ width: '7%' }} data-title="Phone No.">Phone</th>
                <th style={{ width: '7%' }} data-title="Email Address">Email</th>
                {/* <th style={{ width: '5%' }} data-title="Gender">Gender</th> */}
                <th style={{ width: '8%' }} data-title="Assigned Doctor">Doctor</th>
                <th style={{ width: '7%' }} data-title="Selected Day">Day</th>
                <th style={{ width: '7%' }} data-title="Time Slot">Appointment</th>
                <th style={{ width: '7%' }} data-title="status">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} onClick={() => openPopup(booking)}>
                    <td style={{ cursor: 'pointer', color: '#007BFF' }}><strong>{booking.name}</strong></td>
                    {/* <td>{booking.age}</td> */}
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                    {/* <td>{booking.gender}</td> */}
                    <td>{booking.doctor}</td>
                    <td>{booking.day || 'N/A'}</td>
                    <td>
                      {booking.timeSlot ? (
                        booking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ')
                      ) : 'N/A'}
                    </td>
                    <td>{booking.status}</td>
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
                {/* Conditional rendering based on booking status */}
                {selectedBooking.status === 'Confirmed' ? (
                  <button className="btn btn-success">Booking {selectedBooking.status} <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" /></button>
                ) : (
                  <button className="btn btn-danger">Booking {selectedBooking.status} <FontAwesomeIcon icon={faCancel} className="cancel-icon" /></button>
                )}

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
                        <strong>Address:</strong> {selectedBooking.address}
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
                <button className="btn btn-info" onClick={closePopup}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ConfirmedBooking;