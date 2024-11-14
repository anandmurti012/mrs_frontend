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
import TopNav from '../TopNav';

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
        <div style={{ display: 'flex' }}>
            {/* Wrap the top-right content in a div and style it */}
            <aside style={{ width: '20%', height: '100vh', padding: '10px 20px' }}>
                <h3 style={{ color: 'white', fontFamily: "'Aboreto', cursive" }}>
                    Dashboard
                </h3>

                <nav style={{marginTop:'20px'}}>
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

            <main style={{ width: '80%', height: '100vh', background: '#fff', overflow: 'auto' }}>
                <TopNav activeTab={activeTab} />
                
                <div style={{ padding: '10px 20px 50px 20px' }} >
                    {renderContent()}
                </div>

            </main>
            <ToastContainer />
        </div>
    );
};

export default AdminPanel;

