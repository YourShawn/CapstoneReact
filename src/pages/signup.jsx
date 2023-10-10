import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // To store the selected role

  const handleSignup = () => {};

  return (
    <div>
      <Header />;
      <main className="main">
        <div className="heading auth-container">
          <h2>Signup</h2>
          <Form>
            <Form.Group className="formLabel" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="formLabel" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Form.Group className="formLabel" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="formLabel" controlId="contactDetails">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact details"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)}
              />
            </Form.Group>

            <Dropdown>
              <Dropdown.Toggle variant="primary" id="role-dropdown">
                {selectedRole || "Select Role"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedRole("Patient")}>
                  Patient
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedRole("Doctor")}>
                  Doctor
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedRole("Admin")}>
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
      <Footer />;
    </div>
  );
}

export default Signup;
