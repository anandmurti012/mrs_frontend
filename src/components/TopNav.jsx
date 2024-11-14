// import React from 'react'
// import { FaPowerOff } from 'react-icons/fa';
// import { Navigate, NavLink } from 'react-router-dom';
// import { LogoutAction } from '../redux/doctorSlice';
// import { useDispatch } from 'react-redux';

// const TopNav = ({ activeTab }) => {
//     const dispatch = useDispatch()

//     const handleLogout = async () => {
//         dispatch(LogoutAction())
//         window.location.reload()
//     }


//     return (
//         <div
//             className='sticky-top'
//             style={{
//                 height: '50px',
//                 boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
//                 background: '#fff',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: '0px 20px'
//             }}>
//             <div>
//                 <div className="active-tab-heading">
//                     <h4>{activeTab}</h4>
//                 </div>
//             </div>
//             <div>
//             <Navigate to = '/adminForm'>
//             <button style={{marginRight:'20px', marginBottom:'18px'}} className='btn btn-primary'>Book an Appointment</button>
//             </Navigate>
//            <span style={{marginRight:'20px'}} ><strong>Admin</strong></span>
//                 <NavLink
//                     onClick={handleLogout}
//                 >
//                     <FaPowerOff color='red' />
//                     {/* FontAwesome power icon */}
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

// export default TopNav

//===========================//=======================//==================
import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { LogoutAction } from '../redux/doctorSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ activeTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(LogoutAction());
        window.location.reload();
    };

    const handleBookAppointment = () => {
        navigate('/adminForm');
    };

    return (
        <div
            className='sticky-top'
            style={{
                height: '50px',
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0px 20px'
            }}>
            <div>
                <div className="active-tab-heading">
                    <h4>{activeTab}</h4>
                </div>
            </div>
            <div>
                <button
                    style={{ marginRight: '20px', marginBottom: '18px' }}
                    className='btn btn-primary'
                    onClick={handleBookAppointment} // Navigate on button click
                >
                    Book an Appointment
                </button>
                <span style={{ marginRight: '20px' }}><strong>Admin</strong></span>
                <NavLink onClick={handleLogout}>
                    <FaPowerOff color='red' />
                </NavLink>
            </div>
        </div>
    );
};

export default TopNav;

