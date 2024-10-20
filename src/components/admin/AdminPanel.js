// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// // import { FaEye, FaEyeSlash, FaEdit, FaSave } from 'react-icons/fa'; // FontAwesome eye icons
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminPanel.css';
// import AddDoctorsForm from './AddDoctorsForm';
// import AddAdmin from './addAdmin';
// import ViewBookings from './ViewBookings';
// import ViewDoctors from './ViewDoctors';

// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState('Add Doctors');
//     const [editRow, setEditRow] = useState(null);
//     const [editedDoctor, setEditedDoctor] = useState({});
//     const [state, setState] = useState({ toggle: false });


//     const setToggle = (value) => setState((prev) => ({ ...prev, toggle: value }));

//     if (state) {
//         state.toggle = true; // Or use setToggle
//     } else {
//         console.error("State is undefined");
//     }

//     //handle edit
//     const handleEditClick = (doctor) => {
//         setEditRow(doctor.id);
//         setEditedDoctor(doctor); // Set initial values for editing
//     };

//     const handleInputChange = (e, field) => {
//         setEditedDoctor({ ...editedDoctor, [field]: e.target.value });
//     };

//     const handleSaveClick = (id) => {
//         // Save the edited data, e.g., send it to the backend or update state
//         console.log('Saving data for doctor id:', id, editedDoctor);
//         setEditRow(null); // Exit edit mode
//     };
//     // const toggleDay = (day) => {
//     //     setAvailability((prev) => {
//     //         if (prev.some(slot => slot.day === day)) {
//     //             return prev.filter(slot => slot.day !== day); // Remove if already selected
//     //         } else {
//     //             return [...prev, { day, startTime: '', endTime: '' }]; // Add new slot with empty times
//     //         }
//     //     });
//     // };


//     // const handleTimeChange = (day, value, type) => {
//     //     setAvailability((prev) =>
//     //         prev.map(slot =>
//     //             slot.day === day ? { ...slot, [type]: value } : slot
//     //         )
//     //     );
//     // };



//     // Days of the week
//     // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


//     // Render content based on active tab
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'Add Doctors':
//                 return(
//                     <AddDoctorsForm/>
//                 )

//             case 'View Bookings':
//                 return (
//                    <ViewBookings />
//                 );

//             case 'Make an Admin':
//                 return (
//                     <AddAdmin/>
//                 )

//                 case 'View Doctors':
//                     return (                       
//                         <ViewDoctors />
//                     );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <aside className="sidebar">
//                 <h3 style={{ color: 'grey', fontFamily: "'Aboreto', cursive" }}>
//                     Dashboard
//                 </h3>
//                 <nav>
//                     <ul>
//                         <li
//                             className={activeTab === 'Add Doctors' ? 'active' : ''}
//                             onClick={() => setActiveTab('Add Doctors')}
//                         >
//                             Add Doctors
//                         </li>
//                         <li
//                             className={activeTab === 'View Bookings' ? 'active' : ''}
//                             onClick={() => setActiveTab('View Bookings')}
//                         >
//                             View Bookings
//                         </li>
//                         <li
//                             className={activeTab === 'View Doctors' ? 'active' : ''}
//                             onClick={() => setActiveTab('View Doctors')}
//                         >
//                             View Doctors
//                         </li>
//                         <li
//                             className={activeTab === 'Make an Admin' ? 'active' : ''}
//                             onClick={() => setActiveTab('Make an Admin')}
//                         >
//                             Create Admin
//                         </li>
//                         <li
//                             className={activeTab === 'Confirm Booking' ? 'active' : ''}
//                             onClick={() => setActiveTab('Confirm Booking')}
//                         >
//                             Confirm Booking
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             <main className="content">
//                 <div className="active-tab-heading">
//                     <h4>{activeTab}</h4>
//                 </div>

//                 {renderContent()}
//             </main>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AdminPanel;


//=====================================//========================
// import React, { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminPanel.css';
// import AddDoctorsForm from './AddDoctorsForm';
// import AddAdmin from './addAdmin';
// import ViewBookings from './ViewBookings';
// import ViewDoctors from './ViewDoctors';

// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState('Add Doctors');
//     const [editRow, setEditRow] = useState(null);
//     const [editedDoctor, setEditedDoctor] = useState({});
//     const [toggle, setToggle] = useState(false); // Boolean toggle example


//     // const setToggle = (value) => {
//     //     console.log('State before toggle:', state);
//     //     setState((prev) => ({ ...prev, toggle: value }));
//     //     console.log('State after toggle:', state);
//     // };
// const handleToggle = () => {
//     setToggle((prev) => !prev); // Correct usage if toggle is boolean
// };
// if (toggle === undefined) {
//     setToggle(false); // or another appropriate default value
// }

//     // const toggleFeature = () => {
//     //     setToggle(!state.toggle);
//     // };

//     const handleEditClick = (doctor) => {
//         setEditRow(doctor.id);
//         setEditedDoctor(doctor);
//     };

//     const handleInputChange = (e, field) => {
//         setEditedDoctor({ ...editedDoctor, [field]: e.target.value });
//     };

//     const handleSaveClick = (id) => {
//         console.log('Saving data for doctor id:', id, editedDoctor);
//         setEditRow(null);
//     };

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'Add Doctors':
//                 return <AddDoctorsForm />;
//             case 'View Bookings':
//                 return <ViewBookings />;
//             case 'Make an Admin':
//                 return <AddAdmin />;
//             case 'View Doctors':
//                 return <ViewDoctors />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <aside className="sidebar">
//                 <h3 style={{ color: 'grey', fontFamily: "'Aboreto', cursive" }}>
//                     Dashboard
//                 </h3>
//                 <nav>
//                     <ul>
//                         <li className={activeTab === 'Add Doctors' ? 'active' : ''} onClick={() => setActiveTab('Add Doctors')}>
//                             Add Doctors
//                         </li>
//                         <li className={activeTab === 'View Bookings' ? 'active' : ''} onClick={() => setActiveTab('View Bookings')}>
//                             View Bookings
//                         </li>
//                         <li className={activeTab === 'View Doctors' ? 'active' : ''} onClick={() => setActiveTab('View Doctors')}>
//                             View Doctors
//                         </li>
//                         <li className={activeTab === 'Make an Admin' ? 'active' : ''} onClick={() => setActiveTab('Make an Admin')}>
//                             Create Admin
//                         </li>
//                         <li className={activeTab === 'Confirm Booking' ? 'active' : ''} onClick={() => setActiveTab('Confirm Booking')}>
//                             Confirm Booking
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             <main className="content">
//                 <div className="active-tab-heading">
//                     <h4>{activeTab}</h4>
//                 </div>
//                 {renderContent()}
//             </main>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AdminPanel;

//==============================================
// import React, { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AdminPanel.css';
// import AddDoctorsForm from './AddDoctorsForm';
// import AddAdmin from './addAdmin';
// import ViewBookings from './ViewBookings';
// import ViewDoctors from './ViewDoctors';
// import Confirmed from './Confirmed';

// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState('Provisional Booking');

//     // This function decides which component to render based on activeTab
//     const renderContent = () => {
//         switch (activeTab) {
            
//             case 'Provisional Booking':
//                 return <ViewBookings />;
//             case 'Confirmed Booking':
//                 return <Confirmed />;
//             case 'View Doctors':
//                 return <ViewDoctors />;
//             case 'Add Doctors':
//                 return <AddDoctorsForm />;
//             case 'Make an Admin':
//                 return <AddAdmin />;

//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <aside className="sidebar">
//                 <h3 style={{ color: 'grey', fontFamily: "'Aboreto', cursive" }}>
//                     Dashboard
//                 </h3>
//                 <nav>
//                     <ul>
                        
//                         <li className={activeTab === 'Provisional Booking' ? 'active' : ''} onClick={() => setActiveTab('Provisional Booking')}>
//                             Provisional Booking
//                         </li>
//                         <li className={activeTab === 'Confirmed Booking' ? 'active' : ''} onClick={() => setActiveTab('Confirmed Booking')}>
//                             Confirmed Booking
//                         </li>
//                         <li className={activeTab === 'View Doctors' ? 'active' : ''} onClick={() => setActiveTab('View Doctors')}>
//                             View Doctors
//                         </li>
//                         <li className={activeTab === 'Add Doctors' ? 'active' : ''} onClick={() => setActiveTab('Add Doctors')}>
//                             Add Doctors
//                         </li>
//                         <li className={activeTab === 'Make an Admin' ? 'active' : ''} onClick={() => setActiveTab('Make an Admin')}>
//                             Create Admin
//                         </li>

//                     </ul>
//                 </nav>
//             </aside>

//             <main className="content">
//                 <div className="active-tab-heading">
//                     <h4>{activeTab}</h4>
//                 </div>
//                 {renderContent()}
//             </main>
//             <ToastContainer />
//         </div>
//     );
// };

// export default AdminPanel;

//================================================
// File: src/components/admin/AdminPanel.js

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.css';
import AddDoctorsForm from './AddDoctorsForm';
import AddAdmin from './addAdmin';
import ViewBookings from './ViewBookings';
import ViewDoctors from './ViewDoctors';
import Confirmed from './Confirmed';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Provisional Booking');
 
   
    // Logout function
   
    // This function decides which component to render based on activeTab
    const renderContent = () => {
        switch (activeTab) {
            case 'Provisional Booking':
                return <ViewBookings />;
            case 'Confirmed Booking':
                return <Confirmed />;
            case 'View Doctors':
                return <ViewDoctors />;
            case 'Add Doctors':
                return <AddDoctorsForm />;
            case 'Make an Admin':
                return <AddAdmin />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Wrap the top-right content in a div and style it */}
           

            <aside className="sidebar">
                <h3 style={{ color: 'grey', fontFamily: "'Aboreto', cursive" }}>
                    Dashboard
                </h3>
                <nav>
                    <ul>
                        <li className={activeTab === 'Provisional Booking' ? 'active' : ''} onClick={() => setActiveTab('Provisional Booking')}>
                            Provisional Booking
                        </li>
                        <li className={activeTab === 'Confirmed Booking' ? 'active' : ''} onClick={() => setActiveTab('Confirmed Booking')}>
                            Confirmed Booking
                        </li>
                        <li className={activeTab === 'View Doctors' ? 'active' : ''} onClick={() => setActiveTab('View Doctors')}>
                            View Doctors
                        </li>
                        <li className={activeTab === 'Add Doctors' ? 'active' : ''} onClick={() => setActiveTab('Add Doctors')}>
                            Add Doctors
                        </li>
                        <li className={activeTab === 'Make an Admin' ? 'active' : ''} onClick={() => setActiveTab('Make an Admin')}>
                            Create Admin
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

