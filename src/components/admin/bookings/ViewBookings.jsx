import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/ViewBookings.css"; // Add your CSS styles here
import { useSelector } from 'react-redux';
import { Button, InputGroup, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../../Pagination";
import Loading from "../../Loading";

const ViewBookings = ({ fetchAppointments }) => {
  const admin = useSelector((state) => state.doctor.user);
  // console.log(admin?.passCode)

  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isLoadingButton, setisLoadingButton] = useState(false)

  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]); // To store available doctors
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "confirm" or "cancel"
  const [passcode, setPasscode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(""); // To store selected doctor

  const auth = useSelector((state) => state.doctor);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }



  const [selectedDate, setSelectedDate] = useState(null);
  const token = auth.token

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatTimeTo12Hour = (time) => {
    if (!time || typeof time !== "string") return "N/A";
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const handleConfirm = async (bookingId) => {
    try {
      setisLoadingButton(true)
      await axios.put(
        `${process.env.REACT_APP_APIURL}/api/bookings/${bookingId}/confirm`
      ).then(response => {
        setisLoadingButton(false)
        toast.success("Booking confirmed successfully!");
        fetchBookings(searchTerm, selectedDate, selectedDoctor, currentPage);
      }).catch(error => {
        setisLoadingButton(false)
        toast.error(error.response?.data?.msg || error.message);
      })
    } catch (error) {
      toast.error("Error confirming booking");
    }
  };


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/api/doctors`); // Adjust API endpoint

        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const fetchBookings = async (searchTerm, selectedDate, selectedDoctor, currentPage) => {
    try {
      setIsPageLoading(true)
      await axios.get(
        `${process.env.REACT_APP_APIURL}/api/bookings/?searchTerm=${searchTerm}&selectedDate=${selectedDate}&selectedDoctor=${selectedDoctor}&page=${currentPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      ).then(res => {
        setIsPageLoading(false)
        // Sort bookings by createdAt or bookingDate in descending order to get latest on top
        const sortedBookings = res?.data?.results.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        // console.log("sorted:::", sortedBookings);
        setBookings(sortedBookings); // Set the sorted bookings
        setTotalPages(res.data.totalPages)
      }).catch(error => {
        setIsPageLoading(false)
        toast.error(error.response?.data?.msg || error.message);
      })
    } catch (error) {
      toast.error("Failed to load bookings");
      setIsPageLoading(false)
    }
  };



  useEffect(() => {
    // Debounce the search function
    const debounceTimeout = setTimeout(() => {
      fetchBookings(searchTerm, selectedDate, selectedDoctor, currentPage);
    }, 666); // 6000 ms = 6 seconds

    // Cleanup the timeout if the component unmounts or dependencies change before the debounce time
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, selectedDate, selectedDoctor, currentPage]); // Re-run when any of these change

  const openPopup = (booking) => {
    setSelectedBooking(booking);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBooking(null);
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
      if (actionType === "confirm") {
        handleConfirm(selectedBooking?.bookingId);
      }
      closePasscodeModal();
      closePopup();
    } else {
      toast.error("Incorrect passcode");
    }
  };

  const searchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <ToastContainer />
      {/* Search panel */}
      <div className="d-flex flex-row align-items-center">
        <div className="col-sm-12 col-lg-3 mb-2">
          <div className="input-group">
            <input
              type="search"
              onChange={searchInput}
              placeholder="Name / Booking Id / Mobile"
              className="form-control"
            />
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} className="cancel-icon" />
            </span>
          </div>
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
                {doctor.name}
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

      {
        isPageLoading ?
          <Loading />
          :
          <div>
            <table >
              <thead>
                <tr>
                  <th data-title="Booking Id">
                    Booking Id
                  </th>
                  <th data-title="Patient's Name">
                    Name
                  </th>
                  <th data-title="Age">
                    Age
                  </th>
                  <th data-title="Phone No.">
                    Phone
                  </th>
                  <th data-title="Email Address">
                    Email
                  </th>
                  <th data-title="Gender">
                    Gender
                  </th>
                  <th data-title="Assigned Doctor">
                    Doctor
                  </th>
                  <th data-title="Assigned Doctor">
                    Specialization
                  </th>
                  <th data-title="Selected Day">
                    Day
                  </th>
                  <th data-title="Time Slot">
                    Appointment
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking?.id} >
                      <td>{booking?.bookingId}</td>
                      <td onClick={() => openPopup(booking)} style={{ cursor: "pointer", color: "#007BFF" }}>
                        <strong>{booking?.name}</strong>
                      </td>
                      <td>{booking?.age}</td>
                      <td>{booking?.phone}</td>
                      <td>{booking?.email}</td>
                      <td>{booking?.gender}</td>
                      <td>{booking?.doctor}</td>
                      <td>{booking?.specialization}</td>
                      <td>{booking?.day || "N/A"}</td>
                      <td>
                        {booking?.timeSlot
                          ? booking?.timeSlot
                            .split(" - ")
                            .map((time) => formatTimeTo12Hour(time))
                            .join(" - ")
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No bookings available</td>
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
      }





      {/* Popup for booking details */}
      {isPopupOpen && selectedBooking && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="bookingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ margin: 0 }}>
                  Booking Id: <strong>{selectedBooking?.bookingId}</strong>
                </h5>
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
                  <div className="row mb-3 even-row">
                    <div className="col-md-5">
                      <strong>Name:</strong> {selectedBooking?.name}
                    </div>
                    <div className="col-md-3">
                      <strong>Gender:</strong> {selectedBooking?.gender}
                    </div>
                    <div className="col-md-4">
                      <strong>Age:</strong> {selectedBooking?.age}
                    </div>
                  </div>
                  <div className="row mb-3 odd-row">
                    <div className="col-md-5">
                      <strong>Email:</strong> {selectedBooking?.email}
                    </div>
                    <div className="col-md-3">
                      <strong>Phone:</strong> {selectedBooking?.phone}
                    </div>
                    <div className="col-md-4">
                      <strong>Doctor:</strong> {selectedBooking?.doctor}
                    </div>
                  </div>
                  <div className="row odd-row">
                    <div className="col-md-12">
                      <strong>Address:</strong> {selectedBooking?.address}
                    </div>
                  </div>
                  <div className="row mb-3 even-row mt-3">
                    <div className="col-md-3">
                      <strong>Day:</strong> {selectedBooking?.day || "N/A"}
                    </div>
                    <div className="col-md-6">
                      <strong>Appointment Schedule:</strong>{" "}
                      {selectedBooking?.timeSlot
                        ? selectedBooking?.timeSlot
                          .split(" - ")
                          .map((time) => formatTimeTo12Hour(time))
                          .join(" - ")
                        : "N/A"}
                    </div>
                  </div>
                  <div className="row odd-row">
                    <div className="col-md-8">
                      <strong>Booking Time:</strong>{" "}
                      {formatTimestamp(selectedBooking?.timeStamp)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => openPasscodeModal("confirm")}
                >
                  Confirm
                </button>
                {/* <button className="btn btn-danger"onClick={() => openPasscodeModal("cancel")}>
                  Cancel
                </button> */}
                <button className="btn btn-info" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passcode modal */}
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
              width: "30%", // Set the width to 50% of its container
              margin: "auto", // Center the modal horizontally
              marginTop: '100px'
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
                {
                  isLoadingButton ?
                    <button className="btn btn-primary">
                      <div class="spinner-border" role="status" style={{ height: 15, width: 15 }}>
                        <span class="sr-only">Loading...</span>
                      </div>  Submit
                    </button>
                    :
                    <button className="btn btn-primary" onClick={handlePasscodeSubmit}>
                      Submit
                    </button>
                }
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

export default ViewBookings;