import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEdit, FaSave } from 'react-icons/fa'; // FontAwesome eye icons
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.css';
import AddDoctorsForm from './AddDoctorsForm';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Add Doctors');
    const [availability, setAvailability] = useState([]);
    const [showPassCode, setShowPassCode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [doctors, setDoctorss] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [editedDoctor, setEditedDoctor] = useState({});
    const [selectedDays, setSelectedDays] = useState([]);

    console.log("doctors:::", doctors);

    //handle edit
    const handleEditClick = (doctor) => {
        setEditRow(doctor.id);
        setEditedDoctor(doctor); // Set initial values for editing
    };

    const handleInputChange = (e, field) => {
        setEditedDoctor({ ...editedDoctor, [field]: e.target.value });
    };

    const handleSaveClick = (id) => {
        // Save the edited data, e.g., send it to the backend or update state
        console.log('Saving data for doctor id:', id, editedDoctor);
        setEditRow(null); // Exit edit mode
    };
    const toggleDay = (day) => {
        setAvailability((prev) => {
            if (prev.some(slot => slot.day === day)) {
                return prev.filter(slot => slot.day !== day); // Remove if already selected
            } else {
                return [...prev, { day, startTime: '', endTime: '' }]; // Add new slot with empty times
            }
        });
    };

    const handleTimeChange = (day, value, type) => {
        setAvailability((prev) =>
            prev.map(slot =>
                slot.day === day ? { ...slot, [type]: value } : slot
            )
        );
    };
    // Handle confirming a booking
    const handleConfirm = async (bookingId) => {
        try {
            await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
            toast.success('Booking confirmed successfully!');
            setActiveTab('View Bookings');
        } catch (error) {
            toast.error('Error confirming booking');
        }
    };

    // Handle canceling a booking
    const handleCancel = async (bookingId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
            toast.success('Booking canceled successfully!');
            setActiveTab('View Bookings');
        } catch (error) {
            toast.error('Error canceling booking');
        }
    };

    // Fetch bookings
    useEffect(() => {
        if (activeTab === 'View Bookings') {
            const fetchBookings = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
                    setBookings(res.data);
                } catch (error) {
                    toast.error('Failed to load bookings');
                }
            };
            fetchBookings();
        }
    }, [activeTab]);

    //Fetch All doctors

    // Fetch bookings
    useEffect(() => {
        if (activeTab === 'View Doctors') {
            const fetchDoctors = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors/`);
                    setDoctorss(res.data);
                } catch (error) {
                    toast.error('Failed to load bookings');
                }
            };
            fetchDoctors();
        }
    }, [activeTab]);

    // Days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Converts 0 hour to 12 for AM/PM
        return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
    };
    // Formik for form handling
    const formik = useFormik({
        initialValues: {
            name: '',
            docId: '',
            phone: '',
            address: '',
            consultation: '',
            experience: '',
            specialization: '',
            availability: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Doctor's name is required"),
            docId: Yup.string().required("Doctor's ID is required"),
            phone: Yup.string().required("Doctor's Phone number is required"),
            address: Yup.string().required("Doctor's Address is required"),
            consultation: Yup.string().required(" consultation is required"),
            experience: Yup.number().required("Experience is required").min(0, "Experience can't be negative"),
            specialization: Yup.string().required("Specialization is required"),
            availability: Yup.array().min(1, 'At least one time slot must be selected'),
        }),
        onSubmit: async (values) => {
            try {
                const modifiedValues = {
                    ...values,
                    availability: JSON.stringify(availability),
                };
                const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/doctors/`, modifiedValues);
                toast.success('Doctor added successfully!');
                formik.resetForm();
                setAvailability([]);
            } catch (error) {
                toast.error('Error adding doctor');
            }
        },
    });
    //  Formik for "Make an Admin" form handling
    const adminFormik = useFormik({
        initialValues: {
            adminName: '',
            emailId: '',
            address: '',
            phoneNo: '',
            passCode: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            adminName: Yup.string().required("Admin's name is required"),
            emailId: Yup.string().email('Invalid email format').required("Email is required"),
            address: Yup.string().required('Address is required'),
            phoneNo: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be numeric'),
            passCode: Yup.string().required('Pass Code is compulsory*').matches(/^[0-9]+$/, 'Pass-code must be numeric'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/`, values);
                toast.success('Admin added successfully!');
                adminFormik.resetForm();
            } catch (error) {
                toast.error('Error adding admin');
            }
        },
    });
    // Handle availability slot change
    const handleAvailabilityChange = (index, field, value) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index][field] = value;
        setAvailability(updatedAvailability);
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'Add Doctors':
                return(
                    <AddDoctorsForm/>
                )


            case 'View Bookings':
                return (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Doctor</th>
                                    <th>Availability</th>
                                    <th>Confirm Booking</th>
                                    <th>Cancel Booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.name}</td>
                                            <td>{booking.address}</td>
                                            <td>{booking.age}</td>
                                            <td>{booking.phone}</td>
                                            <td>{booking.email}</td>
                                            <td>{booking.gender}</td>
                                            <td>{booking.doctor}</td>
                                            <td>{booking.availability}</td>
                                            <td>
                                                <button className="green" onClick={() => handleConfirm(booking.id)}>
                                                    Confirm
                                                </button>
                                            </td>
                                            <td>
                                                <button className="red" onClick={() => handleCancel(booking.id)}>
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No bookings available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );

            case 'Make an Admin':
                return (
                    <form className="admin-form" onSubmit={adminFormik.handleSubmit}>
                        {/* Admin's form fields */}
                        <div className="form-group">
                            <label>Admin's Name:</label>
                            <input
                                type="text"
                                name="adminName"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.adminName}
                                placeholder="Enter admin's name"
                            />
                            {adminFormik.touched.adminName && adminFormik.errors.adminName && (
                                <span className="error">{adminFormik.errors.adminName}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email ID:</label>
                            <input
                                type="email"
                                name="emailId"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.emailId}
                                placeholder="Enter email ID"
                            />
                            {adminFormik.touched.emailId && adminFormik.errors.emailId && (
                                <span className="error">{adminFormik.errors.emailId}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.address}
                                placeholder="Enter address"
                            />
                            {adminFormik.touched.address && adminFormik.errors.address && (
                                <span className="error">{adminFormik.errors.address}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Phone No.:</label>
                            <input
                                type="text"
                                name="phoneNo"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.phoneNo}
                                placeholder="Enter phone number"
                            />
                            {adminFormik.touched.phoneNo && adminFormik.errors.phoneNo && (
                                <span className="error">{adminFormik.errors.phoneNo}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Pass Code</label>
                            <div className="password-input">
                                <input
                                    type={showPassCode ? "text" : "password"}
                                    name="passCode"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.passCode}
                                    placeholder="Pass Code must be four digit (0-9)*"
                                />
                                <span onClick={() => setShowPassCode(!showPassCode)}>
                                    {showPassCode ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {adminFormik.touched.passCode && adminFormik.errors.passCode && (
                                <span className="error">{adminFormik.errors.passCode}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.password}
                                    placeholder="Enter password"
                                />
                                <span>
                                </span>
                            </div>
                            {adminFormik.touched.password && adminFormik.errors.password && (
                                <span className="error">{adminFormik.errors.password}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.confirmPassword}
                                    placeholder="Confirm password"
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {adminFormik.touched.confirmPassword && adminFormik.errors.confirmPassword && (
                                <span className="error">{adminFormik.errors.confirmPassword}</span>
                            )}
                        </div>
                        <button type="submit">Add Admin</button>
                    </form>
                );

            case 'View Doctors':
                return (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', maxWidth: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }} data-title="Doctor's Name">Name</th>
                                    <th style={{ width: '8%' }} data-title="Doctor Id">Doctor Id</th>
                                    <th style={{ width: '10%' }} data-title="Phone No.">Phone No.</th>
                                    <th style={{ width: '15%' }} data-title="Full Address">Address</th>
                                    <th style={{ width: '10%' }} data-title="Consultation">Consultation Limit</th>
                                    <th style={{ width: '6%' }} data-title="Experience(Years)">Experience (yrs)</th>
                                    <th style={{ width: '12%' }} data-title="Specialization">Specialization</th>
                                    <th style={{ width: '20%' }} data-title="Availability">Availability</th>
                                    <th style={{ width: '6%' }} data-title="Edit">Edit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {doctors.length > 0 ? (
                                    doctors.map((doctor) => (
                                        <tr key={doctor.id}>
                                            {editRow === doctor.id ? (
                                                <>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="text"
                                                            value={editedDoctor.name || ''}
                                                            onChange={(e) => handleInputChange(e, 'name')}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>{doctor.docId}</td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="text"
                                                            value={editedDoctor.phone || ''}
                                                            onChange={(e) => handleInputChange(e, 'phone')}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="text"
                                                            value={editedDoctor.address || ''}
                                                            onChange={(e) => handleInputChange(e, 'address')}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>
                                                        <input
                                                            type="text"
                                                            value={editedDoctor.consultation || ''}
                                                            onChange={(e) => handleInputChange(e, 'consultation')}
                                                        />
                                                    </td>
                                                    <td style={{ padding: '10px' }}>{doctor.experience}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.specialization}</td>
                                                    <td style={{ padding: '10px' }}>
                                                        <div className="availability-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                                                            {daysOfWeek.map((day, index) => {
                                                                const isAvailable = doctor.availability.some(slot => slot.day === day);
                                                                const currentSlot = doctor.availability.find(slot => slot.day === day) || {};

                                                                return (
                                                                    <div key={index} className="availability-slot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <input
                                                                            type="checkbox"
                                                                            value={day}
                                                                            checked={isAvailable}
                                                                            onChange={() => toggleDay(day)}
                                                                        />
                                                                        <span>{day}</span>
                                                                        {isAvailable && (
                                                                            <div className="time-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '40px' }}>
                                                                                <input
                                                                                    type="time"
                                                                                    value={currentSlot.startTime || ''}
                                                                                    onChange={(e) => handleTimeChange(day, e.target.value, 'startTime')}
                                                                                    style={{ width: '120px' }}
                                                                                />
                                                                                <input
                                                                                    type="time"
                                                                                    value={currentSlot.endTime || ''}
                                                                                    onChange={(e) => handleTimeChange(day, e.target.value, 'endTime')}
                                                                                    style={{ width: '120px' }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>


                                                    <td style={{ width: '6%', padding: '10px', textAlign: 'center', cursor: 'pointer' }}>
                                                        <button className='btn btn-success'><FaSave onClick={() => handleSaveClick(doctor.id)} style={{ fontSize: '1.2em', verticalAlign: 'middle' }} /></button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td style={{ padding: '10px' }}>{doctor.name}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.docId}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.phone}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.address}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.consultation || 'N/A'}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.experience}</td>
                                                    <td style={{ padding: '10px' }}>{doctor.specialization}</td>
                                                    <td style={{ padding: '10px' }}>
                                                        <select style={{ width: '100%' }}>
                                                            {doctor.availability.map((slot, index) => (
                                                                <option key={index} value={slot.day}>
                                                                    {slot.day} - {formatTimeTo12Hour(slot.startTime)} - {formatTimeTo12Hour(slot.endTime)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td style={{ width: '6%', padding: '10px', textAlign: 'center' }}>
                                                        <FaEdit onClick={() => handleEditClick(doctor)} style={{ cursor: 'pointer', fontSize: '1.2em', verticalAlign: 'middle' }} />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ padding: '10px', textAlign: 'center' }}>No Doctors available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h3 style={{ color: 'grey', fontFamily: "'Aboreto', cursive" }}>
                    Dashboard
                </h3>
                <nav>
                    <ul>
                        <li
                            className={activeTab === 'Add Doctors' ? 'active' : ''}
                            onClick={() => setActiveTab('Add Doctors')}
                        >
                            Add Doctors
                        </li>
                        <li
                            className={activeTab === 'View Bookings' ? 'active' : ''}
                            onClick={() => setActiveTab('View Bookings')}
                        >
                            View Bookings
                        </li>
                        <li
                            className={activeTab === 'View Doctors' ? 'active' : ''}
                            onClick={() => setActiveTab('View Doctors')}
                        >
                            View Doctors
                        </li>
                        <li
                            className={activeTab === 'Make an Admin' ? 'active' : ''}
                            onClick={() => setActiveTab('Make an Admin')}
                        >
                            Create Admin
                        </li>
                        <li
                            className={activeTab === 'Confirm Booking' ? 'active' : ''}
                            onClick={() => setActiveTab('Confirm Booking')}
                        >
                            Confirm Booking
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <div className="active-tab-heading">
                    <h4>{activeTab}</h4>
                </div>

                {renderContent()}
            </main>
            <ToastContainer />
        </div>
    );
};

export default AdminPanel;



