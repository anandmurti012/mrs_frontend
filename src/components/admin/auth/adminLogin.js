import React, { useState } from "react";
import './adminLogin.css';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useSubmit } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setLoginData } from "../../../redux/doctorSlice";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = { email, password };

    try {
      await axios.post(
        `${process.env.REACT_APP_APIURL}/api/adminlogin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async response => {
        // Successful response
        await dispatch(setLoginData({ token: response.data.token, user: response.data.user }));

        setIsLoading(false);
        navigate("/");
      }).catch(error => {
        // Error handling
        setIsLoading(false);
        window.alert(error.response?.data?.msg || error.message);
      });

    } catch (error) {
      setIsLoading(false);
      window.alert(error.response?.data?.msg || error.message);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
        {/* Logo */}
        <img
          style={{
            height: '70px',
            width: '70px',
            marginLeft: '20px',
          }}
          src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png"
          alt="MRS Logo"
        />

        {/* Heading */}
        <h1 style={{
          margin: '0 auto',
          textAlign: 'center',
          flex: 1,
        }}
          className="text"
        >
          MRS Hospital - Online Booking
        </h1>
      </div>

      <div className="adminLogin-container" style={{ marginTop: '-110px' }}>
        <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
          <img
            style={{
              height: '450px',
              width: '850px',
              marginLeft: '10px',
            }}
            src="https://cdni.iconscout.com/illustration/premium/thumb/admin-services-illustration-download-in-svg-png-gif-file-formats--dashboard-control-room-panel-administration-isometric-pack-business-illustrations-3804451.png"
            alt="Admin Services"
          />
        </div>

        <div className="adminLogin-card" style={{ marginLeft: '30px' }}>
          <h2 className="adminLogin-title">Admin Login</h2>

          <FormControl className="login-form-control" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl className="login-form-control" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginTop: '8px', marginRight: '7px' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            className="login-button"
            colorScheme="blue"
            mt={6}
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Login
          </Button>

          {isLoading && <Spinner color="blue.500" />}
        </div>
      </div>
    </>
  );
}

export default AdminLogin;

