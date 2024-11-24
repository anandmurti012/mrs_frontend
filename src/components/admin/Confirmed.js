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
import { faCircleCheck, faCancel } from '@fortawesome/free-solid-svg-icons';
import { InputGroup } from 'react-bootstrap';
// import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import './ViewBookings.css'; // Add your CSS styles here
import { useSelector } from 'react-redux';

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
  const [status, setStatus] = useState("");
  const auth = useSelector((state) => state.doctor);
  const token = auth.token

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
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
              overflow: hidden;
            }
            .receipt-container {
              margin: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
            }
          }
          @media screen {
            .receipt-container {
              margin-top: 20px;
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
            margin-top: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          .details {
            font-size: 16px;
            margin-top: 10px;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="logo">
              <img src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png" alt="Hospital Logo">
            </div>
            <div class="contact-info" style="text-align: right;">
              <h2 style="margin: 0;">MRS Hospital</h2>
              <p>123 Health Street, City, State, ZIP</p>
              <p>Phone: (123) 456-7890 | Email: info@abchospital.com</p>
            </div>
          </div>
          <div>
            <h3 class="section-title">Appointment Details</h3>
            <div class="details">
              <p><strong>Booking ID:</strong> ${selectedBooking.bookingId}</p>
              <p><strong>Name:</strong> ${selectedBooking.name}</p>
              <p><strong>Gender:</strong> ${selectedBooking.gender}</p>
              <p><strong>Age:</strong> ${selectedBooking.age}</p>
            </div>
            <h3 class="section-title">Contact Information</h3>
            <div class="details">
              <p><strong>Email:</strong> ${selectedBooking.email}</p>
              <p><strong>Phone:</strong> ${selectedBooking.phone}</p>
              <p><strong>Address:</strong> ${selectedBooking.address}</p>
            </div>
            <h3 class="section-title">Doctor's Details</h3>
            <div class="details">
              <p><strong>Doctor:</strong> ${selectedBooking.doctor}</p>
              <p><strong>Day:</strong> ${selectedBooking.day || "N/A"}</p>
              <p><strong>Appointment Schedule:</strong> ${
                selectedBooking.timeSlot
                  ? selectedBooking.timeSlot
                      .split(" - ")
                      .map((time) => formatTimeTo12Hour(time))
                      .join(" - ")
                  : "N/A"
              }</p>
            </div>
            <h3 class="section-title">Booking Summary</h3>
            <div class="details">
              <p><strong>Booking Time:</strong> ${formatTimestamp(selectedBooking.timeStamp)}</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing MRS Hospital. We wish you good health!</p>
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
  


  const handleDateChange = (date) => {
    setSelectedDate(date);
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



  const fetchBookings = async () => {
    try {
      setLoading(false);
      const res = await axios.get(
        `${process.env.REACT_APP_APIURL}/api/confirmBookings/?searchTerm=${searchTerm}&status=${status}&searchDoctorTerm=${searchDoctorTerm}&selectedDate=${selectedDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      );
      const sortedBookings = res.data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

      // Set the sorted bookings
      setBookings(sortedBookings);

    } catch (error) {
      toast.error("Failed to load bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(searchTerm, searchDoctorTerm, selectedDate, status);
  }, [searchTerm, searchDoctorTerm, selectedDate, status]);


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
  }, [searchTerm, searchDoctorTerm, selectedDate, status]);
  const searchInput = (e) => {
    setSearchTerm(e.target.value);
    // console.log(e.target.value)
  };
  const searchDoctorInput = (e) => {
    setSearchDoctorTerm(e.target.value);
    // console.log(e.target.value)
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
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
    if (passcode === "0000") {
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
              <input
                type="search"
                onChange={searchInput}
                placeholder="Name / Email / Mobile"
                className="form-control"
              />
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
              <input
                type="search"
                onChange={searchDoctorInput}
                placeholder="Search By Doctor's name"
                className="form-control"
              />
            </div>
            <div>
              <InputGroup className="mb-2 ms-3">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="YYYY-MM-dd" // Display date only
                  className="form-control"
                  placeholderText="Select Date"
                />
              </InputGroup>

            </div>
          </div>

          <table style={{ width: '90vw', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '7%' }} data-title="Patient's Name">Name</th>
                {/* <th style={{ width: '5%' }} data-title="Age">Age</th> */}
                <th style={{ width: '7%' }} data-title="Phone No.">Phone</th>
                <th style={{ width: '7%' }} data-title="Email Address">Email</th>
                {/* <th style={{ width: '5%' }} data-title="Gender">Gender</th> */}
                <th style={{ width: '8%' }} data-title="Assigned Doctor">Doctor</th>
                <th style={{ width: '7%' }} data-title="Selected Day">Day</th>
                <th style={{ width: '8%' }} data-title="Time Slot">Appointment</th>
                <th style={{ width: '7%' }} data-title="status">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} onClick={() => openPopup(booking)}>
                    <td style={{ cursor: 'pointer', color: '#007BFF' }}><strong>{booking.name}</strong></td>
                    {/* <td>{booking.age}</td> */}
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
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
                    <div className="col-md-6">
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