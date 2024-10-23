 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorDetails } from '../redux/doctorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faUser, faAddressBook, faPhone, faEnvelope, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './UseForm.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const { doctorName, bookingTime, userName, pAddress, pPhone } = useSelector((state) => state.doctor);

  const [formData, setFormData] = useState({
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
    adminId: 8,
    adminName: 'vikash'
  });

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [admins, setAdmins] = useState([]); // To store admin data

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

    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins`);
        console.log("resp",response);
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
        toast.error('Failed to load admin data');
      }
    };
    fetchAdmins();
  }, []);

  const formatTimeTo12Hour = (time) => {
    if (!time || typeof time !== 'string') return 'N/A';

    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';

    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const handleDoctorChange = async (e) => {
    const selectedDoctor = e.target.value;
    setFormData({ ...formData, doctor: selectedDoctor, day: '', timeSlot: '' });
    setTimeSlots([]);

    if (selectedDoctor) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctorAvailability/${selectedDoctor}`);
        setAvailability(response.data.availability || []);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
        toast.error('Failed to load availability');
        setAvailability([]);
      }
    } else {
      setAvailability([]);
    }
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setFormData({ ...formData, day: selectedDay, timeSlot: '' });

    const selectedAvailability = availability.find(slot => slot.day === selectedDay);
    setTimeSlots(selectedAvailability ? selectedAvailability.timeSlots : []);
  };

  const handleTimeSlotChange = (e) => {
    setFormData({ ...formData, timeSlot: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age || formData.age < 18 || formData.age > 100) newErrors.age = 'Age must be between 18 and 100';
    if (!formData.doctor) newErrors.doctor = 'Doctor selection is required';
    if (!formData.day) newErrors.day = 'Day selection is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot selection is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // const selectedAdmin = admins.find(admin => admin.id === formData.adminId) || {};
      const selectedAdmin =  [{id:'8', name:'vikash'}];
      console.log("selectedAdmin", selectedAdmin);
      const submissionData = {
        ...formData,
        addedBy: 'user', // or set as 'admin' based on condition
        adminId: 8,
        adminName:'vikash',
      };

      console.log("submissionData:::::",submissionData);

      try {
        const response = await axios.post(`${process.env.REACT_APP_APIURL}/api/bookings/`, submissionData);
        if (response.status === 201) {
          dispatch(setDoctorDetails({
            doctorName: formData.doctor,
            bookingTime: formData.timeSlot,
            userName: formData.name,
            pAddress: formData.address,
            pPhone: formData.phone,
            addedBy: 'user', // or set as 'admin' based on condition
            adminId: 8,
            adminName: 'vikash',
           
          }));
          toast.success('Booking done successfully!');
          setFormData({ name: '', address: '', phone: '', email: '', gender: '', age: '', doctor: '', day: '', timeSlot: [], addedBy: 'user', adminId: 8, adminName: 'vikash' });
       console.log("formData;;;;;", formData)
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (err) {
        console.error('Error in Booking:', err.response?.data || err.message);
        toast.error(`Error in Booking: ${err.response?.data?.message || err.message}`);
      }
    } else {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div className="form-container mt-3">
      {doctorName && bookingTime ? (
        <div className="booking-info card">
          <h3>
            <strong>Booking Confirmed</strong>
            <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" />
          </h3>
          <h4><b>Patient Name:</b> {userName}</h4>
          <p><b>Address:</b> {pAddress}</p>
          <p><b>Phone no:</b> {pPhone}</p>
          <p><b>Doctor's Name:</b> {doctorName}</p>
          <p><b>Consulting Time:</b> {bookingTime}</p>
          <button onClick={() => window.location.reload()} className="submit-btn">Book Another Appointment</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <h1 className="form-title"><FontAwesomeIcon icon={faUserDoctor} /> Book Your Appointment</h1>
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
            <label htmlFor="doctor">Doctor</label>
            <select id="doctor" name="doctor" value={formData.doctor} onChange={handleDoctorChange}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {`${doctor.name} (${doctor.specialization})`}
                </option>
              ))}
            </select>
            {errors.doctor && <span className="error-message">{errors.doctor}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <select id="day" name="day" value={formData.day} onChange={handleDayChange}>
              <option value="">Select Day</option>
              {availability.map((slot, index) => (
                <option key={index} value={slot.day}>
                  {slot.day}
                </option>
              ))}
            </select>
            {errors.day && <span className="error-message">{errors.day}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="timeSlot">Time Slot</label>
            <select id="timeSlot" name="timeSlot" value={formData.timeSlot} onChange={handleTimeSlotChange}>
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={`${slot.startTime} - ${slot.endTime}`}>
                  {`${formatTimeTo12Hour(slot.startTime)} - ${formatTimeTo12Hour(slot.endTime)}`}
                </option>
              ))}
            </select>
            {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
          </div>
          <button type="submit" className="submit-btn">Submit</button>
          <ToastContainer />
        </form>
      )}
    </div>
  );
};

export default UserForm;










