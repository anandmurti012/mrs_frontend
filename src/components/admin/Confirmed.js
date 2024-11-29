// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleCheck,faCancel } from '@fortawesome/free-solid-svg-icons';
// import './ViewBookings.css'; // Add your CSS styles here
// import { useSelector } from 'react-redux';

// const ConfirmedBooking = () => {
//   const [bookings, setBookings] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const auth = useSelector((state) => state.doctor);
//   const token = auth.token

//   const formatTimeTo12Hour = (time) => {
//     if (!time || typeof time !== 'string') return 'N/A';
//     const [hours, minutes] = time.split(':').map(Number);
//     if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time';
//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: true,
//     });
//   };



//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${process.env.REACT_APP_APIURL}/api/bookings/?searchTerm=${searchTerm}&status=${status}&searchDoctorTerm=${searchDoctorTerm}&selectedDate=${selectedDate}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       }
//       );
//       setBookings(res.data);

//     } catch (error) {
//       toast.error("Failed to load bookings");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(searchTerm, searchDoctorTerm, selectedDate, status);
//   }, [searchTerm, searchDoctorTerm, selectedDate, status]);

//   const openPopup = (booking) => {
//     setSelectedBooking(booking);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedBooking(null);
//   };

//   return (
//     <div>
//       <ToastContainer />
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '90vw', tableLayout: 'fixed' }}>
//             <thead>
//               <tr>
//                 <th style={{ width: '7%' }} data-title="Patient's Name">Name</th>
//                 {/* <th style={{ width: '5%' }} data-title="Age">Age</th> */}
//                 <th style={{ width: '7%' }} data-title="Phone No.">Phone</th>
//                 <th style={{ width: '7%' }} data-title="Email Address">Email</th>
//                 {/* <th style={{ width: '5%' }} data-title="Gender">Gender</th> */}
//                 <th style={{ width: '8%' }} data-title="Assigned Doctor">Doctor</th>
//                 <th style={{ width: '7%' }} data-title="Selected Day">Day</th>
//                 <th style={{ width: '7%' }} data-title="Time Slot">Appointment</th>
//                 <th style={{ width: '7%' }} data-title="status">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.length > 0 ? (
//                 bookings.map((booking) => (
//                   <tr key={booking.id} onClick={() => openPopup(booking)}>
//                     <td style={{ cursor: 'pointer', color: '#007BFF' }}><strong>{booking.name}</strong></td>
//                     {/* <td>{booking.age}</td> */}
//                     <td>{booking.phone}</td>
//                     <td>{booking.email}</td>
//                     {/* <td>{booking.gender}</td> */}
//                     <td>{booking.doctor}</td>
//                     <td>{booking.day || 'N/A'}</td>
//                     <td>
//                       {booking.timeSlot ? (
//                         booking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ')
//                       ) : 'N/A'}
//                     </td>
//                     <td>{booking.status}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8">No bookings available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Popup for booking details */}
//       {isPopupOpen && selectedBooking && (
//         <div className="modal fade bd-example-modal-lg show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 {/* Conditional rendering based on booking status */}
//                 {selectedBooking.status === 'Confirmed' ? (
//                   <button className="btn btn-success">Booking {selectedBooking.status} <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" /></button>
//                 ) : (
//                   <button className="btn btn-danger">Booking {selectedBooking.status} <FontAwesomeIcon icon={faCancel} className="cancel-icon" /></button>
//                 )}

//                 <button
//                   type="button"
//                   className="close"
//                   onClick={closePopup}
//                   aria-label="Close"
//                   style={{
//                     marginLeft: 'auto',
//                     width: '40px',
//                     height: '40px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     background: '#0ccaf0',
//                     border: 'none',
//                     cursor: 'pointer'
//                   }}>
//                   <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>&times;</span>
//                 </button>
//               </div>

//               <div className="modal-body">
//                 <div className="container-fluid">
//                   <div className="row mb-3 even-row">
//                     <div className="col-md-5">
//                       <strong>Name:</strong> {selectedBooking.name}
//                     </div>
//                     <div className="col-md-3">
//                       <strong>Gender:</strong> {selectedBooking.gender}
//                     </div>
//                     <div className="col-md-4">
//                       <strong>Age:</strong> {selectedBooking.age}
//                     </div>
//                   </div>
//                   <div className="row mb-3 odd-row">
//                     <div className="col-md-5">
//                       <strong>Email:</strong> {selectedBooking.email}
//                     </div>
//                     <div className="col-md-3">
//                       <strong>Phone:</strong> {selectedBooking.phone}
//                     </div>
//                     <div className="col-md-4">
//                       <strong>Doctor:</strong> {selectedBooking.doctor}
//                     </div>
//                     <div className="row odd-row">
//                       <div className="col-md-12 mt-3">
//                         <strong>Address:</strong> {selectedBooking.address}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row mb-3 even-row">
//                     <div className="col-md-3">
//                       <strong>Day:</strong> {selectedBooking.day || 'N/A'}
//                     </div>
//                     <div className="col-md-6">
//                       <strong>Appointment Schedule:</strong> {selectedBooking.timeSlot ? selectedBooking.timeSlot.split(' - ').map(time => formatTimeTo12Hour(time)).join(' - ') : 'N/A'}
//                     </div>
//                   </div>
//                   <div className="row odd-row">
//                     <div className="col-md-6">
//                       <strong>Booking Time:</strong> {formatTimestamp(selectedBooking.timeStamp)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-info" onClick={closePopup}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ConfirmedBooking;

//=================================================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCancel, faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputGroup } from 'react-bootstrap';
// import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import './ViewBookings.css'; // Add your CSS styles here
import { useSelector } from 'react-redux';
import Pagination from "../Pagination";

const ConfirmedBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [passcode, setPasscode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "confirm" or "cancel"
  const [searchDoctorTerm, setSearchDoctorTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(""); // To store selected doctor
  const [status, setStatus] = useState("");
  const auth = useSelector((state) => state.doctor);
  const admin = useSelector((state) => state.doctor.user);
  const token = auth.token
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBookings(page)
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/alldoctors`);
        console.log("response doctors::fff:", response);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to load doctor names');
      }
    };
    fetchDoctors();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    const content = `
    <html>
      <head>
        <title>Print Receipt</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body {
              
              padding: 0;
              width: 150mm;
              height: 310mm;
              overflow: hidden;
            }
            .receipt-container {
              margin: 0;
              width: 100%;
              height: 50%;
              box-sizing: border-box;
            }
          }
          @media screen {
            .receipt-container {
             
            }
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .receipt-container {
            max-width: 700px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-sizing: border-box;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 100px;
            height: auto;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            color: #333;
          }
          .header p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .section-title {
            font-size: 18px;
            color: #333;
            border-bottom: 1px solid #ddd;
             
          }
          .details {
            font-size: 16px;
               
          }
          .footer {
            text-align: center;
            
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
  <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
    <div class="logo">
      <img src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png" alt="Hospital Logo">
    </div>
    <div class="contact-info" style="text-align: right;">
      <h2 style="margin: 0;">MRS Hospital</h2>
      <p>225 & 227, Rabindra Sarani; Kolkata-700007</p>
      <p>Phone:- 033 2274 4726/ 2274 3725 | Email: info@abchospital.com</p>
    </div>
  </div> 
<p style="font-weight: bold; color: ${selectedBooking.status === 'Confirmed' ? 'green' : selectedBooking.status === 'Cancelled' ? 'red' : 'black'};">
  Booking ${selectedBooking.status}
</p>

  <div class="content" style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px;">
    <!-- Left Column -->
    <div class="left-column" style="flex: 1; max-width: 50%;">
      <h3 class="section-title"><strong>Appointment Details</strong></h3>
      <div class="details">
        <p> Booking ID:  ${selectedBooking.bookingId}</p>
        <p> Name:  ${selectedBooking.name}</p>
        <p> Gender:  ${selectedBooking.gender}</p>
        <p> Age: ${selectedBooking.age}</p>
      </div>
      <h3 class="section-title"><strong>Contact Information</strong></h3>
      <div class="details">
        <p> Email:  ${selectedBooking.email}</p>
        <p> Phone:  ${selectedBooking.phone}</p>
        <p> Address:  ${selectedBooking.address}</p>
      </div>
    </div>

    <!-- Right Column -->
    <div class="right-column" style="flex: 1; max-width: 50%;">
      <h3 class="section-title"><strong>Doctor's Details</strong></h3>
      <div class="details">
        <p> Doctor:  ${selectedBooking.doctor}</p>
        <p> Consultation fees:  ${selectedBooking.fees}</p>
         
        <p> Day: ${selectedBooking.day || "N/A"}</p>
        <p> Appointment Schedule:  ${selectedBooking.timeSlot
        ? selectedBooking.timeSlot
          .split(" - ")
          .map((time) => formatTimeTo12Hour(time))
          .join(" - ")
        : "N/A"
      }</p>
      </div>
      <h3 class="section-title"><strong>Booking Summary</strong></h3>
      <div class="details">
        <p> Booking Time:  ${formatTimestamp(selectedBooking.timeStamp)}</p>
      </div>
    </div>
  </div>
</div>

        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `;
    printWindow.document.write(content);
    printWindow.document.close();
  };



  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleCancel = async (bookingId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/toBeDeleted`
      );
      toast.success("Booking canceled successfully!");
      fetchBookings(searchTerm, status, selectedDate, status);
    } catch (error) {
      toast.error("Error canceling booking");
    }
  };
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



  const fetchBookings = async (page) => {
    try {
      setLoading(false);
      const res = await axios.get(
        `${process.env.REACT_APP_APIURL}/api/confirmBookings/?searchTerm=${searchTerm}&status=${status}&selectedDate=${selectedDate}&selectedDoctor=${selectedDoctor}&page=${page ? page : 1}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      );
      const sortedBookings = res.data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

      // Set the sorted bookings
      setBookings(sortedBookings);
      setTotalPages(res.data.totalPages)
    } catch (error) {
      toast.error("Failed to load bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(searchTerm, selectedDoctor, selectedDate, status);
  }, [searchTerm, selectedDoctor, selectedDate, status]);


  const openPopup = (booking) => {
    setSelectedBooking(booking);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBooking(null);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      filterData(0);
    }, 500); // Delay in milliseconds (e.g., 300ms)

    // Cleanup function to clear the timeout if searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedDate, status]);
  const searchInput = (e) => {
    setSearchTerm(e.target.value);

  };


  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const filterData = async (page) => {
    try {
      setIsLoading()
        // await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-users?page=${page}&searchTerm=${searchTerm}&subscriptionType=${subscriptionType}&status=${status}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': token
        //   }
        // })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data:", error);
        });
    } catch (error) {
      console.log("APi call error", error);
    }
  };

  const openPasscodeModal = (action) => {
    setActionType(action);
    setIsPasscodeModalOpen(true);
  };

  const closePasscodeModal = () => {
    setIsPasscodeModalOpen(false);
    setPasscode("");
  };

  const handlePasscodeSubmit = () => {
    if (passcode === admin?.passCode) {
      // Replace '1234' with the actual passcode

      if (actionType === "cancel") {
        handleCancel(selectedBooking.bookingId);
      }
      closePasscodeModal();
      closePopup();
    } else {
      toast.error("Incorrect passcode");
    }
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <div className="d-flex flex-row align-items-center">
            <div className="col-sm-12 col-lg-3 mb-2">
              <div className="input-group">
                <input
                  type="search"
                  onChange={searchInput}
                  placeholder="Name / Mobile / Booking Id"
                  className="form-control"
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} className="cancel-icon" />
                </span>
              </div>
            </div>


            <div className="col-sm-12 col-lg-3 mb-2 ms-3">
              <select className="form-select" onChange={handleStatusChange}>
                <option value="" style={{ background: "#eee" }}>
                  Status
                </option>
                <option value={'Confirmed'}>Confirmed</option>
                <option value={'Cancelled'}>Cancelled</option>
              </select>
            </div>
            <div className="col-sm-12 col-lg-3 mb-2 ms-3">
              <select
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="form-control"
                value={selectedDoctor}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}-({doctor.specialization})

                  </option>
                ))}
              </select>
            </div>
            <div>
            <InputGroup className="mb-2 ms-3">
              <input
                type="date"
                value={selectedDate} // Use 'value' for controlled components
                onChange={handleDateChange} // Handle the change event
                className="form-control"
                placeholder="Select Date" // Use 'placeholder' for type="date"
              />
            </InputGroup>

            </div>
          </div>

          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th data-title="Booking Id">Booking Id</th>
                <th data-title="Patient's Name">Name</th>
                {/* <th style={{ width: '5%' }} data-title="Age">Age</th> */}
                <th data-title="Phone No.">Phone</th>
                {/* <th style={{ width: '7%' }} data-title="Email Address">Email</th> */}
                {/* <th style={{ width: '5%' }} data-title="Gender">Gender</th> */}
                <th data-title="Assigned Doctor">Doctor</th>
                <th data-title="Selected Day">Day</th>
                <th data-title="Time Slot">Appointment</th>
                <th data-title="status">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} onClick={() => openPopup(booking)}>
                    <td style={{ color: '#0751be' }}><strong>{booking.bookingId}</strong></td>
                    <td style={{ cursor: 'pointer', color: '#007BFF' }}><strong>{booking.name}</strong></td>
                    {/* <td>{booking.age}</td> */}
                    <td>{booking.phone}</td>
                    {/* <td>{booking.email}</td> */}
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
              {/* pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
        </div>
      )}

      {/* Popup for booking details */}
      {isPopupOpen && selectedBooking && (
        <div
          className="modal fade bd-example-modal-lg show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                {/* Conditional rendering based on booking status */}
                {selectedBooking.status === "Confirmed" ? (
                  <button className="btn btn-success">
                    Booking {selectedBooking.status}{" "}
                    <FontAwesomeIcon icon={faCircleCheck} className="confirmation-icon" />
                  </button>
                ) : (
                  <button className="btn btn-danger">
                    Booking {selectedBooking.status}{" "}
                    <FontAwesomeIcon icon={faCancel} className="cancel-icon" />
                  </button>
                )}

                <button
                  type="button"
                  className="close"
                  onClick={closePopup}
                  aria-label="Close"
                  style={{
                    marginLeft: "auto",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0ccaf0",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: "1.5rem" }}>
                    &times;
                  </span>
                </button>
              </div>

              <div className="modal-body">
                <div className="container-fluid">
                  <div className="col-md-5">
                    <h5 style={{ color: "grey" }}>
                      <strong>Booking Id: {selectedBooking.bookingId}</strong>
                    </h5>
                  </div>
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
                    <div className="col-md-4 mt-3">
                      <strong>Consultation Fees:</strong> {selectedBooking.fees}
                    </div>
                    <div className="row odd-row">
                      <div className="col-md-12 mt-3">
                        <strong>Address:</strong> {selectedBooking.address}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 even-row">
                    <div className="col-md-3">
                      <strong>Day:</strong> {selectedBooking.day || "N/A"}
                    </div>
                    <div className="col-md-6">
                      <strong>Appointment Schedule:</strong>{" "}
                      {selectedBooking.timeSlot
                        ? selectedBooking.timeSlot
                          .split(" - ")
                          .map((time) => formatTimeTo12Hour(time))
                          .join(" - ")
                        : "N/A"}
                    </div>
                  </div>
                  <div className="row odd-row">
                    <div className="col-md-8">
                      <strong>Booking Time:</strong> {formatTimestamp(selectedBooking.timeStamp)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedBooking.status === "Confirmed" && (
                  <button className="btn btn-danger" onClick={() => openPasscodeModal("cancel")}>
                    Cancel
                  </button>
                )}
                <button className="btn btn-info" onClick={closePopup}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handlePrint}>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPasscodeModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="passcodeModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog"
            style={{
              width: "30%", // Reduce the width to 50% of the current size
              maxWidth: "250px", // Optional: limit the maximum width for responsiveness
              margin: "auto", // Center the modal horizontally
              marginTop: '130px'
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Passcode</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closePasscodeModal}
                  aria-label="Close"
                  style={{
                    marginLeft: "auto",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0ccaf0",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: "1.5rem" }}>
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handlePasscodeSubmit}>
                  Submit
                </button>
                <button className="btn btn-secondary" onClick={closePasscodeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ConfirmedBooking;



