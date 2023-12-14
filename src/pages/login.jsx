import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { Modal } from "antd";
import registrationService from "../services/registrationService";


const Login = () => {
  const nav = useNavigate();

  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  async function handleLogin() {
    const url = "/api/login";
    const data = {
      username: userID,
      password: password,
      role: selectedRole,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      console.log("Success:", result);
  
      if (result.code !== 200) {
        Modal.info({
          title: "Login Failed",
          content: <div><p>{result.message}</p></div>,
          onOk() {},
        });
        return;
      }
  
      localStorage.setItem("loginToken", result.data);
      localStorage.setItem("userRole", selectedRole);
  
      // Fetch user data after successful login
      if (result.data != null) {
        const userDataResponse = await registrationService.getUserData({
          emailAddress: userID,
        });
  
        console.log("userDataResponse:", userDataResponse.data.data[0]);
  
        // Check if userDataResponse.data is an array and not empty
        if (userDataResponse.data.data[0].userId !== null ) {
          // Save user ID in localStorage
          localStorage.setItem("userId", userDataResponse.data.data[0].userId);
        } else {
          console.error("User data not found or empty in the response.");
        }
      }
  
      // Navigate to the dashboard based on the role
      if (selectedRole === "Doctor") {
        nav("/doctor-dashboard");
      } else if (selectedRole === "Patient") {
        nav("/patient-dashboard");
      } else if (selectedRole === "Admin") {
        nav("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }  

  return (
    <div className="auth_wrapper">
      <Header />
      <main className="main">
        <div className="heading auth-container">
          <h2>Login</h2>
          <Form>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="role-dropdown">
                {selectedRole || "Select Role"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedRole("Patient")}>
                  Patient
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedRole("Admin")}>
                  Admin
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedRole("Doctor")}>
                  Doctor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Form.Group className="formLabel" controlId="userID">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="formLabel" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="formLabel" controlId="stayLoggedIn">
              <Form.Check type="checkbox" label="Stay logged in" />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>

            <div className="formLabel">
              <div className="click-link">
                If new user, <Link to="/signup">Sign up here</Link>
              </div>

            </div>
          </Form>
        </div>
      </main>
      <Footer />;
    </div>
  );
};

export default Login;
