import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import registrationService from "../services/registrationService";



function Signup() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(false); // State to track if registration is completed


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validateField = (fieldName) => {
    switch (fieldName) {
      case "fullName":
        if (!fullName) {
          setErrors({ ...errors, fullName: "Full Name is required." });
        } else {
          setErrors({ ...errors, fullName: "" });
        }
        break;
      case "emailAddress":
        if (!emailAddress) {
          setErrors({ ...errors, emailAddress: "Email address is required." });
        } else if (!isEmailValid(emailAddress)) {
          setErrors({ ...errors, emailAddress: "Invalid email address." });
        } else {
          setErrors({ ...errors, emailAddress: "" });
        }
        break;
      case "password":
        if (!password) {
          setErrors({ ...errors, password: "Password is required." });
        } else {
          setErrors({ ...errors, password: "" });
        }
        break;
      case "confirmPassword":
        if (!confirmPassword) {
          setErrors({ ...errors, confirmPassword: "Confirm Password is required." });
        } else if (password !== confirmPassword) {
          setErrors({ ...errors, confirmPassword: "Password and Confirm Password do not match." });
        } else {
          setErrors({ ...errors, confirmPassword: "" });
        }
        break;
      case "phoneNumber":
        if (!phoneNumber) {
          setErrors({ ...errors, phoneNumber: "Phone Number is required." });
        } else {
          setErrors({ ...errors, phoneNumber: "" });
        }
        break;
      case "role":
        if (!role) {
          setErrors({ ...errors, role: "Role is required." });
        } else {
          setErrors({ ...errors, role: "" });
        }
        break;
      // Add validation cases for other fields
      default:
        break;
    }
  };
  
  const resetForm = () => {
    setFullName("");
    setEmailAddress("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setRole("");
    setErrors({});
  };

  const handleSignup = () => {
    // Validate all fields
    validateField("fullName");
    validateField("emailAddress");
    validateField("password");
    validateField("confirmPassword");
    validateField("phoneNumber");
    validateField("role");
    // Add validation for other fields

    // Check if there are any errors before proceeding
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return;
    }

    const userData = {
      fullName,
      emailAddress,
      password,
      phoneNumber,
      role
    };

    
    // If validations pass, you can make an API call to the backend to create the user.

    registrationService.registerUser(userData)
    .then((response) => {
      // Handle the response from the backend if needed
      console.log("User added successfully:", response.data);
      // You can also redirect the user to a success page or perform other actions here
      setSuccessMessage("Registration successful.");

      // Reset the form
      resetForm();

      // Mark registration as completed
      setRegistrationCompleted(true);
        
    })
    .catch((error) => {
      // Handle any errors that occur during the API request
      console.error("Error adding user:", error);
      // You can display an error message to the user or handle the error in an appropriate way
    });
  };

  return (
    <div>
      <Header />
      <main className="main">
        <div className="heading auth-container">
          <h2>Signup</h2>
          {successMessage && (
            <div className="success-message">
              {successMessage}
              {registrationCompleted && (
                <p>
                  Registration is complete.{" "}
                  <Link to="/login">Click here to login</Link>.
                </p>
              )}
            </div>
          )}
          <Form>
            <Form.Group className="formLabel" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => validateField("fullName")}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </Form.Group>

            <Form.Group className="formLabel" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                onBlur={() => validateField("emailAddress")}
              />
              {errors.emailAddress && <div className="error-message">{errors.emailAddress}</div>}
            </Form.Group>

            <Form.Group className="formLabel" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateField("password")}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </Form.Group>

            <Form.Group className="formLabel" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateField("confirmPassword")}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </Form.Group>

            <Form.Group className="formLabel" controlId="contactDetails">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact details"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() => validateField("phoneNumber")}
              />
              {/* Add error message for contactDetails, if needed */}
            </Form.Group>

            <Dropdown>
              <Dropdown.Toggle variant="primary" id="role-dropdown">
                {role || "Select Role"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRole("Patient")}>
                  Patient
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("Doctor")}>
                  Doctor
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("Admin")}>
                  Admin
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" onClick={handleSignup}>
              Signup
            </Button>

            <div className="click-link">
              If already a user, <Link to="/login">Login here</Link>
            </div>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;
