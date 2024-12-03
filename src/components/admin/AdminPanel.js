import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.css';
import TopNav from '../TopNav';
import ViewBookings from './bookings/ViewBookings';
import ConfirmBookings from './bookings/ConfirmBookings';
import { useSelector } from 'react-redux';
import ViewDoctors from './doctors/ViewDoctors';
import AddDoctorsForm from './doctors/AddDoctorsForm';
import AddAdmin from './admins/AddAdmin';
import ViewAdmins from './admins/ViewAdmins';

const AdminPanel = () => {
    const admin = useSelector((state) => state.doctor.user);

    const [activeTab, setActiveTab] = useState('Provisional Booking');



    // Logout function

    // This function decides which component to render based on activeTab
    const renderContent = () => {
        switch (activeTab) {
            case 'Provisional Booking':
                return <ViewBookings />;
            case 'Confirmed Booking':
                return <ConfirmBookings />;
            case 'View Doctors':
                return <ViewDoctors />;
            case 'Add Doctors':
                return <AddDoctorsForm />;
            case 'Make an Admin':
                return <AddAdmin />;
            case 'View an Admins':
                return <ViewAdmins />;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Wrap the top-right content in a div and style it */}
            <aside style={{ width: '20%', height: '100vh', padding: '10px 20px' }}>
                <h3 style={{ color: 'white', fontFamily: "'Aboreto', cursive" }}>
                    Dashboard
                </h3>

                <nav style={{ marginTop: '20px' }}>
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
                        {admin?.type === 'superAdmin' && (
                            <>
                                <li className={activeTab === 'Make an Admin' ? 'active' : ''} onClick={() => setActiveTab('Make an Admin')}>
                                    Create Admin
                                </li>
                                <li className={activeTab === 'View an Admins' ? 'active' : ''} onClick={() => setActiveTab('View an Admins')}>
                                    View Admins
                                </li>
                            </>
                        )}

                    </ul>
                </nav>
            </aside>

            <main style={{ width: '80%', height: '100vh', background: '#fff', overflow: 'auto' }}>
                <TopNav activeTab={activeTab} />

                <div style={{ padding: '10px' }} >
                    {renderContent()}
                </div>

            </main>
            <ToastContainer />
        </div>
    );
};

export default AdminPanel;

