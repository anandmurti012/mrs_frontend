import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // FontAwesome eye icons
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = () => {
  const [showPassCode, setShowPassCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const adminFormik = useFormik({
    initialValues: {
        adminName: '',
        emailId: '',
        address: '',
        phoneNo: '',
        passCode: '',
        password: '',
        confirmPassword: '',
    },
    validationSchema: Yup.object({
        adminName: Yup.string().required("Admin's name is required"),
        emailId: Yup.string().email('Invalid email format').required("Email is required"),
        address: Yup.string().required('Address is required'),
        phoneNo: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be numeric'),
        passCode: Yup.string().required('Pass Code is compulsory*').matches(/^[0-9]+$/, 'Pass-code must be numeric'),
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
  return (
    <div> 
    <ToastContainer />
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
                            <label>Pass Code</label>
                            <div className="password-input">
                                <input
                                    type={showPassCode ? "text" : "password"}
                                    name="passCode"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.passCode}
                                    placeholder="Pass Code must be four digit (0-9)*"
                                />
                                <span onClick={() => setShowPassCode(!showPassCode)}>
                                    {showPassCode ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {adminFormik.touched.passCode && adminFormik.errors.passCode && (
                                <span className="error">{adminFormik.errors.passCode}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.password}
                                    placeholder="Enter password"
                                />
                                <span>
                                </span>
                            </div>
                            {adminFormik.touched.password && adminFormik.errors.password && (
                                <span className="error">{adminFormik.errors.password}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    onChange={adminFormik.handleChange}
                                    onBlur={adminFormik.handleBlur}
                                    value={adminFormik.values.confirmPassword}
                                    placeholder="Confirm password"
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {adminFormik.touched.confirmPassword && adminFormik.errors.confirmPassword && (
                                <span className="error">{adminFormik.errors.confirmPassword}</span>
                            )}
                        </div>
                        <button type="submit">Add Admin</button>
                    </form>
    </div>
  )
}

export default AddAdmin;