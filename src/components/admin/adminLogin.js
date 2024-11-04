import React, { useRef, useState } from "react";
import './adminLogin.css';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Spinner, // Import Spinner for loading indication
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import motion for transition effects
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch } from 'react-redux';
import { setLoginData } from "../../redux/doctorSlice";

const MotionModalContent = motion(ModalContent); // Create a motion-enhanced ModalContent

function AdminLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For redirecting after login


  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true
    const data = { email, password }; // Prepare the data to be sent

    try {
      await axios.post(
        `${process.env.REACT_APP_APIURL}/api/adminlogin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then(async response => {

        await dispatch(setLoginData({
          token: response.data.token
        }))

        onClose(); // Close the modal after successful login
        setIsLoading(false); // Reset loading state

        // Redirect to the admin page after successful login
        navigate("/"); // Trigger the navigation to the /admin route

      }).catch(error => {
        window.alert(error.response.data.msg || error.message);
      })

    } catch (error) {
      setIsLoading(false); // Reset loading state
      console.log("Login error:", error?.response?.data?.msg || error?.message); // Handle error
    }
  };

  return (
    <>
      <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px' }} onClick={onOpen} colorScheme="blue">
        Admin Login
      </button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md" // Set the size of the modal to medium
        isCentered // Centers the modal on the screen
      >
        <ModalOverlay backdropFilter="blur(10px)" />{" "}
        {/* Apply blur to the background */}
        <MotionModalContent
          maxWidth="400px"
          marginLeft="500px"
          marginTop="40px"
          bg="white"
          boxShadow="lg"
          borderRadius="10px"
          p={5}
          initial={{ opacity: 0, y: -100 }} // Start state for the animation
          animate={{ opacity: 1, y: 0 }} // End state for the animation
          exit={{ opacity: 0, y: 50 }} // Exit state for the animation
          transition={{ duration: 0.5 }} // Transition duration of 0.5 seconds
        >
          <ModalHeader style={{ fontSize: '20px' }} className="mt-3" textAlign="center"><strong>Admin Login</strong></ModalHeader>
          {/* <ModalCloseButton /> */}

          <ModalBody className="modalBody" pb={6}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary"
              style={{ fontSize: '15px', padding: '7px', marginRight: '15px', marginBottom: '10px' }}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading} // Show loading spinner
              loadingText="Logging in..." // Change button text during loading
            >
              Login
            </button>
            <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px', marginRight: '20px', marginBottom: '10px' }} onClick={onClose}>Cancel</button>
          </ModalFooter>
        </MotionModalContent>
      </Modal>
    </>
  );
}

export default AdminLogin;

