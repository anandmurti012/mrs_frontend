// import React, { useRef, useState } from "react";
// import './adminLogin.css';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   useDisclosure,
//   Spinner, // Import Spinner for loading indication
// } from "@chakra-ui/react";
// import { motion } from "framer-motion"; // Import motion for transition effects
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { useDispatch } from 'react-redux';
// import { setLoginData } from "../../redux/doctorSlice";

// const MotionModalContent = motion(ModalContent); // Create a motion-enhanced ModalContent

// function AdminLogin() {
//   const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management
//   const initialRef = useRef(null);
//   const finalRef = useRef(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const navigate = useNavigate(); // For redirecting after login


//   const dispatch = useDispatch()

//   const handleSubmit = async () => {
//     setIsLoading(true); // Set loading state to true
//     const data = { email, password }; // Prepare the data to be sent

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_APIURL}/api/adminlogin`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       ).then(async response => {

//         await dispatch(setLoginData({
//           token: response.data.token
//         }))

//         onClose(); // Close the modal after successful login
//         setIsLoading(false); // Reset loading state

//         // Redirect to the admin page after successful login
//         navigate("/"); // Trigger the navigation to the /admin route

//       }).catch(error => {
//         window.alert(error.response.data.msg || error.message);
//       })

//     } catch (error) {
//       setIsLoading(false); // Reset loading state
//       console.log("Login error:", error?.response?.data?.msg || error?.message); // Handle error
//     }
//   };

//   return (
//     <>
//       <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px' }} onClick={onOpen} colorScheme="blue">
//         Admin Login
//       </button>

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//         size="md" // Set the size of the modal to medium
//         isCentered // Centers the modal on the screen
//       >
//         <ModalOverlay backdropFilter="blur(10px)" />{" "}
//         {/* Apply blur to the background */}
//         <MotionModalContent
//           maxWidth="400px"
//           marginLeft="500px"
//           marginTop="40px"
//           bg="white"
//           boxShadow="lg"
//           borderRadius="10px"
//           p={5}
//           initial={{ opacity: 0, y: -100 }} // Start state for the animation
//           animate={{ opacity: 1, y: 0 }} // End state for the animation
//           exit={{ opacity: 0, y: 50 }} // Exit state for the animation
//           transition={{ duration: 0.5 }} // Transition duration of 0.5 seconds
//         >
//           <ModalHeader style={{ fontSize: '20px' }} className="mt-3" textAlign="center"><strong>Admin Login</strong></ModalHeader>
//           {/* <ModalCloseButton /> */}

//           <ModalBody className="modalBody" pb={6}>
//             <FormControl>
//               <FormLabel>Email address</FormLabel>
//               <Input
//                 ref={initialRef}
//                 placeholder="Enter your email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 isRequired
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 placeholder="Enter your password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 isRequired
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <button className="btn btn-primary"
//               style={{ fontSize: '15px', padding: '7px', marginRight: '15px', marginBottom: '10px' }}
//               colorScheme="blue"
//               mr={3}
//               onClick={handleSubmit}
//               isLoading={isLoading} // Show loading spinner
//               loadingText="Logging in..." // Change button text during loading
//             >
//               Login
//             </button>
//             <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px', marginRight: '20px', marginBottom: '10px' }} onClick={onClose}>Cancel</button>
//           </ModalFooter>
//         </MotionModalContent>
//       </Modal>
//     </>
//   );
// }

// export default AdminLogin;


//==================================//=============================//======================
// import React, { useState } from "react";
// import './adminLogin.css';
// import { Button, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setLoginData } from "../../redux/doctorSlice";

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     const data = { email, password };

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_APIURL}/api/adminlogin`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       ).then(async response => {
//         // res accept 200 & 201

//         await dispatch(setLoginData({ token: response.data.token }));
//         setIsLoading(false);
//         navigate("/");

//       }).catch(error => {
//         // error
//         // res accept 404 , 401, 500, 409
//         setIsLoading(false);
//         window.alert(error.response?.data?.msg || error.message);
//       })

//     } catch (error) {
//       setIsLoading(false);
//       window.alert(error.response?.data?.msg || error.message);
//     }
//   };

//   return (
//     <>
//       <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px' }}>
//         {/* Logo */}
//         <img
//           style={{
//             height: '70px',
//             width: '70px',
//             marginLeft: '20px',
//           }}
//           src="https://mrshospital.org/wp-content/uploads/2023/06/mrslogo-1.png"
//           alt="MRS Logo"
//         />

//         {/* Heading */}
//         <h1 style={{
//           margin: '0 auto',
//           textAlign: 'center',
//           flex: 1,
//         }}
//           className="text"
//         >
//           MRS Hospital - Online Booking
//         </h1>



//       </div>
//       <div className="adminLogin-container" style={{ marginTop: '-110px' }}>
//         <div className="d-flex align-items-center justify-content-between" style={{ margin: '20px', }}>
//           {/* Logo */}
//           <img
//             style={{
//               height: '450px',
//               width: '750px',
//               marginLeft: '10px',
//             }}
//             src=" https://cdni.iconscout.com/illustration/premium/thumb/admin-services-illustration-download-in-svg-png-gif-file-formats--dashboard-control-room-panel-administration-isometric-pack-business-illustrations-3804451.png"
//           />

//           {/* Heading */}




//         </div>
//         <div className="adminLogin-card" style={{ marginLeft: '30px' }}>
//           <h2 className="adminLogin-title">Admin Login</h2>

//           <FormControl className="login-form-control" isRequired>
//             <FormLabel>Email address</FormLabel>
//             <Input
//               placeholder="Enter your email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>

//           <FormControl className="login-form-control" mt={4} isRequired>
//             <FormLabel>Password</FormLabel>
//             <Input
//               placeholder="Enter your password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>

//           <Button
//             className="login-button"
//             colorScheme="blue"
//             mt={6}
//             onClick={handleSubmit}
//             isLoading={isLoading}
//             loadingText="Logging in..."
//           >
//             Login
//           </Button>

//           {isLoading && <Spinner color="blue.500" />}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminLogin;


//===========================//============================
// import React, { useRef, useState } from "react";
// import './adminLogin.css';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   useDisclosure,
//   Spinner, // Import Spinner for loading indication
// } from "@chakra-ui/react";
// import { motion } from "framer-motion"; // Import motion for transition effects
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { useDispatch } from 'react-redux';
// import { setLoginData } from "../../redux/doctorSlice";

// const MotionModalContent = motion(ModalContent); // Create a motion-enhanced ModalContent

// function AdminLogin() {
//   const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management
//   const initialRef = useRef(null);
//   const finalRef = useRef(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const navigate = useNavigate(); // For redirecting after login


//   const dispatch = useDispatch()

//   const handleSubmit = async () => {
//     setIsLoading(true); // Set loading state to true
//     const data = { email, password }; // Prepare the data to be sent

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_APIURL}/api/adminlogin`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       ).then(async response => {

//         await dispatch(setLoginData({
//           token: response.data.token
//         }))

//         onClose(); // Close the modal after successful login
//         setIsLoading(false); // Reset loading state

//         // Redirect to the admin page after successful login
//         navigate("/"); // Trigger the navigation to the /admin route

//       }).catch(error => {
//         window.alert(error.response.data.msg || error.message);
//       })

//     } catch (error) {
//       setIsLoading(false); // Reset loading state
//       console.log("Login error:", error?.response?.data?.msg || error?.message); // Handle error
//     }
//   };

//   return (
//     <>
//       <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px' }} onClick={onOpen} colorScheme="blue">
//         Admin Login
//       </button>

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//         size="md" // Set the size of the modal to medium
//         isCentered // Centers the modal on the screen
//       >
//         <ModalOverlay backdropFilter="blur(10px)" />{" "}
//         {/* Apply blur to the background */}
//         <MotionModalContent
//           maxWidth="400px"
//           marginLeft="500px"
//           marginTop="40px"
//           bg="white"
//           boxShadow="lg"
//           borderRadius="10px"
//           p={5}
//           initial={{ opacity: 0, y: -100 }} // Start state for the animation
//           animate={{ opacity: 1, y: 0 }} // End state for the animation
//           exit={{ opacity: 0, y: 50 }} // Exit state for the animation
//           transition={{ duration: 0.5 }} // Transition duration of 0.5 seconds
//         >
//           <ModalHeader style={{ fontSize: '20px' }} className="mt-3" textAlign="center"><strong>Admin Login</strong></ModalHeader>
//           {/* <ModalCloseButton /> */}

//           <ModalBody className="modalBody" pb={6}>
//             <FormControl>
//               <FormLabel>Email address</FormLabel>
//               <Input
//                 ref={initialRef}
//                 placeholder="Enter your email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 isRequired
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 placeholder="Enter your password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 isRequired
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <button className="btn btn-primary"
//               style={{ fontSize: '15px', padding: '7px', marginRight: '15px', marginBottom: '10px' }}
//               colorScheme="blue"
//               mr={3}
//               onClick={handleSubmit}
//               isLoading={isLoading} // Show loading spinner
//               loadingText="Logging in..." // Change button text during loading
//             >
//               Login
//             </button>
//             <button className="btn btn-primary" style={{ fontSize: '15px', padding: '7px', marginRight: '20px', marginBottom: '10px' }} onClick={onClose}>Cancel</button>
//           </ModalFooter>
//         </MotionModalContent>
//       </Modal>
//     </>
//   );
// }

// export default AdminLogin;


//==================================//=============================//======================
import React, { useState } from "react";
import './adminLogin.css';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useSubmit } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLoginData } from "../../redux/doctorSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        await dispatch(setLoginData({ token: response.data.token }));
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
                <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginTop:'8px', marginRight:'7px' }}>
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

