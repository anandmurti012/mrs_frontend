import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';

const TopNav = ({ activeTab }) => {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.doctor.user);

    const handleLogout = async () => {
        persistor.purge().then(() => {
            navigate('/');
            window.location.reload();
        });
    };

    const handleBookAppointment = () => {
        navigate('/adminForm');
    };

    return (
        <div
            className='sticky-top'
            style={{
                height: '55px',
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0px 20px'
            }}>
            <div className="active-tab-heading" style={{ marginTop: 8 }}>
                <h4>{activeTab}</h4>
            </div>
            <div>
                <button
                    style={{ marginRight: '20px', marginBottom: '18px' }}
                    className='btn btn-primary'
                    onClick={handleBookAppointment} // Navigate on button click
                >
                    Book an Appointment
                </button>
                <span style={{ marginRight: '20px' }}><strong>{admin?.adminName}</strong></span>
                <NavLink onClick={handleLogout}>
                    <FaPowerOff color='red' />
                </NavLink>
            </div>
        </div>
    );
};

export default TopNav;

