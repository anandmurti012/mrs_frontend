import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressBook, faPhone, faEnvelope, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './UseForm.css';
import Footer from './users/Footer';
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoadingButton, setisLoadingButton] = useState(false)


  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Get hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // If hours is 0, set it to 12

    // Return formatted date and time
    return `${day}-${month}-${year} [${hours}:${minutes} ${ampm}]`;
  }

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    doctor: '',
    fees: '',
    day: '',
    timeSlot: [],
    addedBy: 'user', // Set to 'user' by default
    adminId: '',
    adminName: '',
    timeStamp: formatDateTime(new Date()),
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const auth = useSelector((state) => state.doctor);

  const token = auth.token
  const handleAdminLoginClick = () => {
    navigate("/adminLogin"); // Replace '/adminLogin' with the actual path to the login page
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to load doctor names');
      }
    };
    fetchDoctors();
  }, []);

  const doctorName = bookingData?.doctor;
  const doctor = doctors?.find((doc) => doc.name === doctorName);
  const specialization = doctor ? doctor.specialization : 'Not Available';
  const fees = doctor ? doctor.fees : 'Not Available';

  const handleDoctorChange = async (e) => {
    const selectedDoctorId = e.target.value;
    console.log(selectedDoctorId)
    setFormData({ ...formData, doctor: selectedDoctorId, day: '', timeSlot: '' });
    setTimeSlots([]);

    if (selectedDoctorId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctorId}`);
        setAvailability(response.data.availability || []);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
        toast.error('Failed to load availability');
        setAvailability([]);
      }
    } else {
      setAvailability([]);
    }

    // Get the selected doctor's details
    const doctor = doctors?.find((doc) => doc.name === selectedDoctorId);
    if (doctor) {
      setFormData({ ...formData, doctor: selectedDoctorId, fees: doctor.fees });
    }
  };


  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setFormData({ ...formData, day: selectedDay, timeSlot: '' });

    const selectedAvailability = availability?.find(slot => slot.day === selectedDay);
    setTimeSlots(selectedAvailability ? selectedAvailability.timeSlots : []);
  };
  const handleTimeSlotChange = (e) => {
    setFormData({ ...formData, timeSlot: e.target.value });
  };
  const formatTimeTo12Hour = (time) => {
    if (!time || typeof time !== "string") return "N/A";
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) {
      newErrors.phone = 'phone number is required';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age) {
      newErrors.age = 'Required';
    }
    if (!formData.doctor) newErrors.doctor = 'Doctor selection is required';
    if (!formData.day) newErrors.day = 'Day selection is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot selection is required';

    // Email validation removed to make it optional

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setisLoadingButton(true)
      const response = await axios.post(
        `${process.env.REACT_APP_APIURL}/api/bookings`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      if (response.status === 201) {
        setisLoadingButton(false)
        setBookingData(response.data);
        setIsFormSubmitted(true);
        toast.success('Booking confirmed!');
      } else {
        setisLoadingButton(false)
        toast.error('Failed to book the appointment.');
      }
    } catch (error) {
      setisLoadingButton(false)
      toast.error('An error occurred while booking.');
      console.error('Error:', error);
    }
  };


  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      gender: '',
      age: '',
      doctor: '',
      day: '',
      timeSlot: [],
      addedBy: 'user', // Set to 'user' by default
      adminId: '',
      adminName: '',
      timeStamp: new Date().toISOString(),
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
        <img
          style={{ height: '80px', width: '80px', marginLeft: '20px' }}
          src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png"
          alt="MRS Logo"
        />
        <h1 className="text" style={{ margin: '0 auto', textAlign: 'center', flex: 1 }}>
          MRS Hospital - Online Booking
        </h1>
      </div>

      <div className="form-container mt-3">
        {isFormSubmitted ? (
          <div className="card">
            <h3>
              <strong>Booking Confirmed</strong>
              <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" />
            </h3>
            <h3><b>Booking ID:</b> {bookingData.bookingId}</h3>
            <h4><b>Patient Name:</b> {bookingData.name}</h4>
            <p><b>Address:</b> {bookingData.address}</p>
            <p><b>Phone no:</b> {bookingData.phone}</p>
            <p><b>Doctor's Name:</b> {bookingData.doctor}-({specialization})</p>
            <p style={{ backgroundColor: 'rgb(252, 237, 162)' }}><b>Consultation fees:</b> <span style={{ color: 'teal' }}>₹{fees}</span> you need to pay at Counter</p>
            <p style={{ backgroundColor: 'rgb(252, 237, 162)' }}><b>Booking Date & Time:</b> {formData.timeStamp}</p>
            <p><b>Consulting Time:</b> {formData.day}- [{bookingData.timeSlot.split(" - ")
              .map((time) => formatTimeTo12Hour(time))
              .join(" - ")}]<br></br> (Nearest <span style={{ color: 'teal' }}><b>{formData.day}</b></span> from Booking Confirmation time)</p>
            <p style={{ fontSize: '15px', color: 'red' }}>
              <strong>Note:</strong>
              <span style={{ color: 'green' }}> "Please take a screenshot", </span>
              This is a temporary booking. You need to pay a token amount to confirm at the counter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-column">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">
                  <span className="text-style">
                    <FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;Name
                  </span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address">
                  <span className="text-style">
                    <FontAwesomeIcon icon={faAddressBook} /> &nbsp;&nbsp;Address
                  </span>
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">
                  <span className="text-style">
                    <FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;Phone
                  </span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Contact Number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-column">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  <span className="text-style">
                    <FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp;Email
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email || ''} // Ensure email is a controlled input
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
              </div>


              {/* Gender */}
              <div className="form-group">
                <label htmlFor="gender">
                  <span className="text-style">
                    <FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;Gender
                  </span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age">
                  <span className="text-style">Age</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter Your Age"
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
            </div>

            <div className="form-column">
              {/* Doctor */}
              <div className="form-group">
                <label htmlFor="doctor">
                  <span className="text-style">Doctor</span>
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleDoctorChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor.id}>
                      {`${doctor.name} (${doctor.specialization})`}
                    </option>
                  ))}
                </select>
                {errors.doctor && <span className="error-message">{errors.doctor}</span>}
              </div>

              {/* Day */}
              <div className="form-group">
                <label htmlFor="day">
                  <span className="text-style">Day</span>
                </label>
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleDayChange}
                >
                  <option value="">Select Day</option>
                  {availability.map((slot, index) => (
                    <option key={index} value={slot.day}>
                      {slot.day}
                    </option>
                  ))}
                </select>
                {errors.day && <span className="error-message">{errors.day}</span>}
              </div>

              {/* Time Slot */}
              <div className="form-group">
                <label htmlFor="timeSlot">
                  <span className="text-style">Time Slot</span>
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleTimeSlotChange}
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={`${slot.startTime} - ${slot.endTime}`}>
                      {`${formatTimeTo12Hour(slot.startTime)} - ${formatTimeTo12Hour(slot.endTime)}`}
                    </option>
                  ))}
                </select>
                {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
              </div>


              {
                isLoadingButton ?
                  <button className="submit-btn">
                    <div class="spinner-border" role="status" style={{ height: 15, width: 15 }}>
                      <span class="sr-only">Loading...</span>
                    </div> Please Wait..
                  </button>
                  :
                  <button type="submit" className="submit-btn">
                    Submit 
                  </button>
              }


            </div>
          </form>
        )}
      </div>
      {/* Admin login section for '/' */}
      <div className="mt-3 loginPosition">
        <button className="btn btn-primary" onClick={handleAdminLoginClick}>
          Admin Login
          {/* <AdminLogin /> */}
        </button>
      </div>

      <Footer />

      <ToastContainer />
    </>
  );
};

export default UserForm;


