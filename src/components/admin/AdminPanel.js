import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Add Doctors');
    const [availability, setAvailability] = useState([]);
    const [bookings, setBookings] = useState([]);

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

    // Days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Formik for form handling
    const formik = useFormik({
        initialValues: {
            name: '',
            docId: '',
            experience: '',
            specialization: '',
            availability: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Doctor's name is required"),
            docId: Yup.string().required("Doctor's ID is required"),
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
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            adminName: Yup.string().required("Admin's name is required"),
            emailId: Yup.string().email('Invalid email format').required("Email is required"),
            address: Yup.string().required('Address is required'),
            phoneNo: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be numeric'),
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
                return (
                    <form className="doctor-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label>Doctor's Name:</label>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Enter doctor's name"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className="error">{formik.errors.name}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Doctor's ID:</label>
                            <input
                                type="text"
                                name="docId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.docId}
                                placeholder="Enter doctor's ID"
                            />
                            {formik.touched.docId && formik.errors.docId && (
                                <span className="error">{formik.errors.docId}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Doctor's Experience (Years):</label>
                            <input
                                type="number"
                                name="experience"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.experience}
                                placeholder="Enter experience in years"
                            />
                            {formik.touched.experience && formik.errors.experience && (
                                <span className="error">{formik.errors.experience}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Doctor's Specialization:</label>
                            <input
                                type="text"
                                name="specialization"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.specialization}
                                placeholder="Enter specialization"
                            />
                            {formik.touched.specialization && formik.errors.specialization && (
                                <span className="error">{formik.errors.specialization}</span>
                            )}
                        </div>

                        <div className="availability-section">
                            <label>Doctor's Availability</label><br />
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="availability-slot">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const newAvailability = isChecked
                                                ? [...formik.values.availability, day]
                                                : formik.values.availability.filter((d) => d !== day);

                                            // Update availability for selected days
                                            if (isChecked) {
                                                setAvailability([...availability, { day, startTime: '', endTime: '' }]);
                                            } else {
                                                // Remove the time slots for the unchecked day
                                                setAvailability(availability.filter(slot => slot.day !== day));
                                            }

                                            formik.setFieldValue('availability', newAvailability);
                                        }}
                                    />
                                    {day}
                                </div>
                            ))}
                        </div>

                        {availability.length > 0 && (
                            <div className="time-slots">
                                <h5>Time Slots</h5>
                                {availability.map((slot, index) => (
                                    <div key={index} className="time-slot">
                                        <input
                                            type="time"
                                            onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                                            value={slot.startTime}
                                        />
                                        <input
                                            type="time"
                                            onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                                            value={slot.endTime}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <button type="submit">Add Doctor</button>
                    </form>
                );
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
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.password}
                                placeholder="Enter password"
                            />
                            {adminFormik.touched.password && adminFormik.errors.password && (
                                <span className="error">{adminFormik.errors.password}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={adminFormik.handleChange}
                                onBlur={adminFormik.handleBlur}
                                value={adminFormik.values.confirmPassword}
                                placeholder="Confirm password"
                            />
                            {adminFormik.touched.confirmPassword && adminFormik.errors.confirmPassword && (
                                <span className="error">{adminFormik.errors.confirmPassword}</span>
                            )}
                        </div>
                        <button type="submit">Add Admin</button>
                    </form>
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


//==========================================//=============================//=====================
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminPanel.css';

// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState('Add Doctors');
//     const [availability, setAvailability] = useState([]);
//     const [bookings, setBookings] = useState([]);

//     // Handle confirming a booking
//     const handleConfirm = async (bookingId) => {
//         try {
//             await axios.put(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`);
//             toast.success('Booking confirmed successfully!');
//             setActiveTab('View Bookings');
//         } catch (error) {
//             toast.error('Error confirming booking');
//         }
//     };

//     // Handle canceling a booking
//     const handleCancel = async (bookingId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}`);
//             toast.success('Booking canceled successfully!');
//             setActiveTab('View Bookings');
//         } catch (error) {
//             toast.error('Error canceling booking');
//         }
//     };

//     // Fetch bookings
//     useEffect(() => {
//         if (activeTab === 'View Bookings') {
//             const fetchBookings = async () => {
//                 try {
//                     const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/users/`);
//                     setBookings(res.data);
//                 } catch (error) {
//                     toast.error('Failed to load bookings');
//                 }
//             };
//             fetchBookings();
//         }
//     }, [activeTab]);

//     // Days of the week
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     // Formik for "Add Doctors" form handling
//     const doctorFormik = useFormik({
//         initialValues: {
//             name: '',
//             docId: '',
//             experience: '',
//             specialization: '',
//             availability: [],
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required("Doctor's name is required"),
//             docId: Yup.string().required("Doctor's ID is required"),
//             experience: Yup.number().required("Experience is required").min(0, "Experience can't be negative"),
//             specialization: Yup.string().required("Specialization is required"),
//             availability: Yup.array().min(1, 'At least one time slot must be selected'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const modifiedValues = {
//                     ...values,
//                     availability: JSON.stringify(availability),
//                 };
//                 await axios.post(`${process.env.REACT_APP_APIURL}/api/doctors/`, modifiedValues);
//                 toast.success('Doctor added successfully!');
//                 doctorFormik.resetForm();
//                 setAvailability([]);
//             } catch (error) {
//                 toast.error('Error adding doctor');
//             }
//         },
//     });

//     // Formik for "Make an Admin" form handling
//     const adminFormik = useFormik({
//         initialValues: {
//             adminName: '',
//             emailId: '',
//             address: '',
//             phoneNo: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: Yup.object({
//             adminName: Yup.string().required("Admin's name is required"),
//             emailId: Yup.string().email('Invalid email format').required("Email is required"),
//             address: Yup.string().required('Address is required'),
//             phoneNo: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be numeric'),
//             password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref('password'), null], 'Passwords must match')
//                 .required('Confirm password is required'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/`, values);
//                 toast.success('Admin added successfully!');
//                 adminFormik.resetForm();
//             } catch (error) {
//                 toast.error('Error adding admin');
//             }
//         },
//     });

//     // Handle availability slot change
//     const handleAvailabilityChange = (index, field, value) => {
//         const updatedAvailability = [...availability];
//         updatedAvailability[index][field] = value;
//         setAvailability(updatedAvailability);
//     };

//     // Render content based on active tab
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'Add Doctors':
//                 return (
//                     <form className="doctor-form" onSubmit={doctorFormik.handleSubmit}>
//                         {/* Doctor's form fields */}
//                         <div className="form-group">
//                             <label>Doctor's Name:</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 onChange={doctorFormik.handleChange}
//                                 onBlur={doctorFormik.handleBlur}
//                                 value={doctorFormik.values.name}
//                                 placeholder="Enter doctor's name"
//                             />
//                             {doctorFormik.touched.name && doctorFormik.errors.name && (
//                                 <span className="error">{doctorFormik.errors.name}</span>
//                             )}
//                         </div>
//                         {/* Other form fields */}
//                         {/* Availability fields */}
//                         {availability.length > 0 && (
//                             <div className="time-slots">
//                                 <h5>Time Slots</h5>
//                                 {availability.map((slot, index) => (
//                                     <div key={index} className="time-slot">
//                                         <input
//                                             type="time"
//                                             onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
//                                             value={slot.startTime}
//                                         />
//                                         <input
//                                             type="time"
//                                             onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
//                                             value={slot.endTime}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <button type="submit">Add Doctor</button>
//                     </form>
//                 );
//             case 'Make an Admin':
//                 return (
//                     <form className="admin-form" onSubmit={adminFormik.handleSubmit}>
//                         {/* Admin's form fields */}
//                         <div className="form-group">
//                             <label>Admin's Name:</label>
//                             <input
//                                 type="text"
//                                 name="adminName"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.adminName}
//                                 placeholder="Enter admin's name"
//                             />
//                             {adminFormik.touched.adminName && adminFormik.errors.adminName && (
//                                 <span className="error">{adminFormik.errors.adminName}</span>
//                             )}
//                         </div>
//                         <div className="form-group">
//                             <label>Email ID:</label>
//                             <input
//                                 type="email"
//                                 name="emailId"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.emailId}
//                                 placeholder="Enter email ID"
//                             />
//                             {adminFormik.touched.emailId && adminFormik.errors.emailId && (
//                                 <span className="error">{adminFormik.errors.emailId}</span>
//                             )}
//                         </div>
//                         <div className="form-group">
//                             <label>Address:</label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.address}
//                                 placeholder="Enter address"
//                             />
//                             {adminFormik.touched.address && adminFormik.errors.address && (
//                                 <span className="error">{adminFormik.errors.address}</span>
//                             )}
//                         </div>
//                         <div className="form-group">
//                             <label>Phone No.:</label>
//                             <input
//                                 type="text"
//                                 name="phoneNo"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.phoneNo}
//                                 placeholder="Enter phone number"
//                             />
//                             {adminFormik.touched.phoneNo && adminFormik.errors.phoneNo && (
//                                 <span className="error">{adminFormik.errors.phoneNo}</span>
//                             )}
//                         </div>
//                         <div className="form-group">
//                             <label>Password:</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.password}
//                                 placeholder="Enter password"
//                             />
//                             {adminFormik.touched.password && adminFormik.errors.password && (
//                                 <span className="error">{adminFormik.errors.password}</span>
//                             )}
//                         </div>
//                         <div className="form-group">
//                             <label>Confirm Password:</label>
//                             <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 onChange={adminFormik.handleChange}
//                                 onBlur={adminFormik.handleBlur}
//                                 value={adminFormik.values.confirmPassword}
//                                 placeholder="Confirm password"
//                             />
//                             {adminFormik.touched.confirmPassword && adminFormik.errors.confirmPassword && (
//                                 <span className="error">{adminFormik.errors.confirmPassword}</span>
//                             )}
//                         </div>
//                         <button type="submit">Add Admin</button>
//                     </form>
//                 );
//             case 'View Bookings':
//                 return (
//                     <div>
//                         {bookings.map((booking) => (
//                             <div key={booking.id}>
//                                 <p>{booking.details}</p>
//                                 <button onClick={() => handleConfirm(booking.id)}>Confirm</button>
//                                 <button onClick={() => handleCancel(booking.id)}>Cancel</button>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="admin-panel">
//             <div className="tabs">
//                 <button onClick={() => setActiveTab('Add Doctors')}>Add Doctors</button>
//                 <button onClick={() => setActiveTab('Make an Admin')}>Make an Admin</button>
//                 <button onClick={() => setActiveTab('View Bookings')}>View Bookings</button>
//             </div>
//             <div className="tab-content">{renderContent()}</div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AdminPanel;
