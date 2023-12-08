import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import DoctorService from "../../services/doctorservices";


const AddPatient = ({ show, handleClose }) => {
    const initialFormData = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        healthCardId: "",
        address: "",
        dateOfBirth: "",
        bloodGroup: "",
        maritalStatus: "",
        gender: "",
        allergies: "",
        patientHistory: "",
    };

    const initialValidation = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        dateOfBirth: "",
        bloodGroup: "",
        maritalStatus: "",
        gender: "",
        allergies: "",
        healthCardId: "",
        patientHistory: "",
    };
    const labelNames = {
        firstName: "First Name",
        lastName: "Last Name",
        phoneNumber: "Phone Number",
        email: "Email",
        healthCardId: "Health Card Number",
        address: "Address",
        dateOfBirth: "Date Of Birth",
        bloodGroup: "Blood Group",
        maritalStatus: "Marital Status",
        gender: "Sex",
        allergies: "Allergies",
        patientHistory: "Patient History"
    };
    const [formData, setFormData] = useState({ ...initialFormData });
    const [validation, setValidation] = useState({ ...initialValidation });
    const [successMessage, setSuccessMessage] = useState("");
    const [patientsData, setPatientsData] = useState([]);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const resetForm = () => {
        setFormData({ ...initialFormData });
        setValidation({ ...initialValidation });
        setSubmitAttempted(false); // Reset submitAttempted state
    };
    

    useEffect(() => {
        // Reset the form when the modal is opened
        if (show) {
            resetForm();
        }
    }, [show]);

    const validateField = (fieldName) => {
        const value = formData[fieldName].trim();
    
        switch (fieldName) {
            case "firstName":
            case "lastName":
                return value ? "" : `${labelNames[fieldName]} is required.`;
            case "phoneNumber":
                const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
                return phoneRegex.test(value) ? "" : "Invalid Phone Number. Must be 10 digits.";
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? "" : "Invalid Email Address.";
            case "healthCardId":
            case "address":
            case "dateOfBirth":
            case "bloodGroup":
            case "maritalStatus":
            case "gender":
            case "allergies":
            case "patientHistory":
                return value ? "" : `${labelNames[fieldName]} is required.`;
            default:
                return "";
        }
    };
    

    const handleValidation = () => {
        const newValidation = {};

        Object.keys(formData).forEach((fieldName) => {
            const validationMessage = validateField(fieldName);
            if (validationMessage !== "") {
                newValidation[fieldName] = validationMessage;
            } else {
                newValidation[fieldName] = "";
            }
        });
        setValidation(newValidation);

        // Check if all fields are valid
        return Object.values(newValidation).every((msg) => !msg);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Set submitAttempted to true before validation
        setSubmitAttempted(true);
    
        if (handleValidation()) {
            const updatedFormData = { ...formData };
            updatedFormData.assignedDoctor = 1;
    
            // Check if allergies is not null
            if (updatedFormData.allergies) {
                // If allergies is not null, remove allergies and add haveAllergies:"Y"
                delete updatedFormData.allergies;
                updatedFormData.haveAllergies = "Y";
            } else {
                // If allergies is null, add haveAllergies:"N"
                updatedFormData.haveAllergies = "N";
            }
    
            // Log the updated formData to the console
            console.log("Updated Form Data:", updatedFormData);
    
            // Add a delay of 2 seconds (2000 milliseconds) before executing the code
            setTimeout(() => {
                console.log("Executing code after delay...");
    
                DoctorService.addPatient(updatedFormData)
                    .then(() => {
                        console.log("Patient added successfully!");
    
                        // Fetch updated patient list
                        DoctorService.getPatientList()
                            .then((response) => {
                                console.log("Fetched updated patient list:", response.data.data);
                                setPatientsData(response.data.data);
                                setSuccessMessage("Patient Added successfully!");
    
                                // Close the modal after updating patient list
                                handleClose();
                            })
                            .catch((error) => {
                                console.error("Error from fetching data:", error);
                            });
    
                        resetForm();
                    })
                    .catch((error) => {
                        console.error("Error adding patient:", error);
                    });
            }, 2000); // Adjust the delay time as needed
    
            // Reset submitAttempted after form submission
            setSubmitAttempted(false);
        }
    };
    
    
    


    const handleChange = (e) => {
        const { id, value } = e.target;    
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    
        // Only validate the field if the form has been submitted
        if (submitAttempted) {
            const validationMessage = validateField(id);
            console.log(`Validation message for ${id}:`, validationMessage);
    
            setValidation((prevValidation) => ({
                ...prevValidation,
                [id]: validationMessage,
            }));
        }
    };
    


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label>
                                    <strong>First Name</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {validation.firstName && (
                                    <div className="error-message">{validation.firstName}</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="lastName">
                                <Form.Label>
                                    <strong>Last Name</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {validation.lastName && (
                                    <div className="error-message">{validation.lastName}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="my-4">
                        <Col md={6}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>
                                    <strong>Phone Number</strong>
                                </Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="XXX-XXX-XXXX"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                {validation.phoneNumber && (
                                    <div className="error-message">{validation.phoneNumber}</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>
                                    <strong>Email</strong>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {validation.email && (
                                    <div className="error-message">{validation.email}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="healthCardId" className="my-4">
                        <Form.Label>
                            <strong>Health Card Number</strong>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Health Card Number"
                            value={formData.healthCardId}
                            onChange={handleChange}
                        />
                        {validation.healthCardId && (
                            <div className="error-message">{validation.healthCardId}</div>
                        )}
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>
                            <strong>Address</strong>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {validation.address && (
                            <div className="error-message">{validation.address}</div>
                        )}
                    </Form.Group>

                    <Row className="my-4">
                        <Col md={6}>
                            <Form.Group controlId="dateOfBirth">
                                <Form.Label>
                                    <strong>Date of Birth</strong>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                                {validation.dateOfBirth && (
                                    <div className="error-message">{validation.dateOfBirth}</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="bloodGroup">
                                <Form.Label>
                                    <strong>Blood Group</strong>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                >
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                </Form.Control>
                                {validation.bloodGroup && (
                                    <div className="error-message">{validation.bloodGroup}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="maritalStatus">
                                <Form.Label>
                                    <strong>Marital Status</strong>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                >
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </Form.Control>
                                {validation.maritalStatus && (
                                    <div className="error-message">{validation.maritalStatus}</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="gender">
                                <Form.Label>
                                    <strong>Sex&nbsp;&nbsp;</strong>
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option>Female</option>
                                    <option>Male</option>
                                    <option>Other</option>
                                </Form.Control>
                                {validation.gender && (
                                    <div className="error-message">{validation.gender}</div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="allergies" className="my-4">
                        <Form.Label>
                            <strong>Allergies</strong>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                        {validation.allergies && (
                            <div className="error-message">{validation.allergies}</div>
                        )}
                    </Form.Group>

                    <Form.Group controlId="patientHistory">
                        <Form.Label>
                            <strong>Patient History</strong>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter patient history"
                            value={formData.patientHistory}
                            onChange={handleChange}
                        />
                        {validation.patientHistory && (
                            <div className="error-message">{validation.patientHistory}</div>
                        )}
                    </Form.Group>


                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPatient;
