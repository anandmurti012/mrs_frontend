import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './adddoctors.css';

const AddDoctorsForm = () => {
    const [availability, setAvailability] = useState([]);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
    const [passcode, setPasscode] = useState('');
    const admin = useSelector((state) => state.doctor.user);
    const openPasscodeModal = () => setIsPasscodeModalOpen(true);
    const closePasscodeModal = () => setIsPasscodeModalOpen(false);

    const handlePasscodeSubmit = () => {
        if (passcode === admin?.passCode) {
            // Close modal and submit the form if passcode matches
            closePasscodeModal();
            formik.handleSubmit();
        } else {
            toast.error('Invalid passcode');
        }
    };


    // Handle changes to time slots
    const handleAvailabilityChange = (day, index, field, value) => {
        const updatedAvailability = availability.map((slot) => {
            if (slot.day === day) {
                return {
                    ...slot,
                    timeSlots: slot.timeSlots.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
                };
            }
            return slot;
        });
        setAvailability(updatedAvailability);
    };
    // const handleAvailabilityChange = (index, field, value) => {
    //     const updatedAvailability = [...availability];
    //     updatedAvailability[index][field] = value;
    //     setAvailability(updatedAvailability);
    // };
    // Formik for form handling

    const formik = useFormik({
        initialValues: {
            name: '',
            docId: '',
            phone: '',
            address: '',
            consultation: '',
            fees:'',
            experience: '',
            specialization: '',
            availability: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Doctor's name is required"),
            docId: Yup.string().required("Doctor's ID is required"),
            phone: Yup.string().required("Doctor's phone number is required"),
            address: Yup.string().required("Doctor's address is required"),
            consultation: Yup.number().required('Consultation quota is required').min(1, 'Minimum 1 required'),
            fees: Yup.number().required('Consultation fees is required').min(1, 'Minimum 1 required'),
            experience: Yup.number().required('Experience is required').min(0, "Experience can't be negative"),
            specialization: Yup.string().required('Specialization is required'),
        }),
        onSubmit: async (values) => {
            try {
                const modifiedValues = {
                    ...values,
                    availability: JSON.stringify(availability),
                };
                await axios.post(`${process.env.REACT_APP_APIURL}/api/doctors/`, modifiedValues);
                toast.success('Doctor added successfully!');
                formik.resetForm();
                setAvailability([]);
            } catch (error) {
                toast.error('Error adding doctor');
            }
        },
    });

    // Toggle availability for a specific day
    const toggleDayAvailability = (day) => {
        const existingDay = availability.find((slot) => slot.day === day);
        if (existingDay) {
            setAvailability(availability.filter((slot) => slot.day !== day));
        } else {
            setAvailability([...availability, { day, timeSlots: [] }]);
        }
    };

    // Add a new time slot for a specific day
    const addTimeSlot = (day) => {
        const updatedAvailability = availability.map((slot) => {
            if (slot.day === day) {
                return {
                    ...slot,
                    timeSlots: [...slot.timeSlots, { startTime: '', endTime: '' }],
                };
            }
            return slot;
        });
        setAvailability(updatedAvailability);
    };

    return (
        <div>

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
                    <label>Phone No.</label>
                    <input
                        type="number"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        placeholder="Enter doctor's Phone no."
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <span className="error">{formik.errors.phone}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        placeholder="Enter doctor's Address"
                    />
                    {formik.touched.address && formik.errors.address && (
                        <span className="error">{formik.errors.address}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Daily Consultation Quota</label>
                    <input
                        type="number"
                        name="consultation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.consultation}
                        placeholder="Daily Patient Consultation Limit"
                    />
                    {formik.touched.consultation && formik.errors.consultation && (
                        <span className="error">{formik.errors.consultation}</span>
                    )}
                </div>
                <div className="form-group">
                    <label>Consultation Fees</label>
                    <input
                        type="number"
                        name="fees"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fees}
                        placeholder="Doctor's Consultation fees"
                    />
                    {formik.touched.fees && formik.errors.fees && (
                        <span className="error">{formik.errors.fees}</span>
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

                {/* Availability Section */}
                <div className="availability-section">
                    <label>Doctor's Availability:</label>
                    {daysOfWeek.map((day) => (
                        <div key={day} className="availability-day">
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={() => toggleDayAvailability(day)}
                                    checked={availability.some((slot) => slot.day === day)}
                                />
                                {day}
                            </div>
                            {availability.some((slot) => slot.day === day) && (
                                <div className="time-slots">
                                    {availability.find((slot) => slot.day === day)?.timeSlots.map((timeSlot, index) => (
                                        <div key={index} className="time-slot">
                                            <input
                                                type="time"
                                                value={timeSlot.startTime}
                                                onChange={(e) => handleAvailabilityChange(day, index, 'startTime', e.target.value)}
                                            />
                                            <span>to</span>
                                            <input
                                                type="time"
                                                value={timeSlot.endTime}
                                                onChange={(e) => handleAvailabilityChange(day, index, 'endTime', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addTimeSlot(day)}>Add Time Slot</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button type="button" onClick={openPasscodeModal}>Add Doctor</button>
            </form>
            {/* Passcode Modal */}
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
                            maxWidth: "15%", // Reduce the modal's width to 50%
                            margin: "1.75rem auto", // Center align
                            marginTop: '200px'
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

            <ToastContainer />
        </div>
    );
};

export default AddDoctorsForm;
