import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Row,
    Col,
  } from "react-bootstrap";
import PatientService from "../../services/PatientService";
import styles from "../../styles/pages/patient.module.scss";

function BookAppointment({ patientName, onAppointmentAdded }) {
    const [formData, setFormData] = useState({
        patientName: "",
        date: "",
        time: "",
        reasonForAppointment: "",
        doctor: "",
    });
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        fetchDoctorList();
    }, []);

    const fetchDoctorList = async () => {
        try {
            const response = await PatientService.getDoctorsList();
            setDoctorList(response.data.data || []);
        } catch (error) {
            console.error("Error fetching doctor list:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedDateTime = `${formData.date} ${formData.time}:00`;
            const dateObject = new Date(formattedDateTime);
            const doctorId = parseInt(formData.doctor, 10);

            const appointmentData = {
                patientId: await PatientService.getPatientIdFromLocalStorage(),
                appointmentDateTime: dateObject,
                reasonForAppointment: formData.reasonForAppointment,
                doctorId: doctorId,
                status: 'Scheduled',
                isActive: 1,
            };

            const response = await PatientService.addAppointment(appointmentData);

            if (response.status === 200) {
                window.alert('Appointment added successfully!');
                setFormData({
                    patientName: "",
                    date: "",
                    time: "",
                    reasonForAppointment: "",
                    doctor: "",
                });
                onAppointmentAdded();
            } else {
                console.error("Error adding appointment. Response:", response);
            }
        } catch (error) {
            console.error("Error adding appointment:", error);
        }
    };

    const handleCancel = () => {
        // Reset the form data
        setFormData({
            patientName: "",
            date: "",
            time: "",
            reasonForAppointment: "",
            doctor: "",
        });
    };

    return (
        <div className={styles.whiteBox_wrap}>
            <h3 className="heading3">Book an Appointment</h3>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label className="bold-label ">Patient Name : </Form.Label>
                    <span className="bold-label"> {patientName}</span>
                </Form.Group>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group className="py-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Reason for Appointment</Form.Label>
                            <Form.Control type="text" name="reasonForAppointment" value={formData.reasonForAppointment} onChange={handleChange} required />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Select Doctor</Form.Label>
                            <Form.Control as="select" name="doctor" value={formData.doctor} onChange={handleChange} required>
                                <option value="">Select a doctor</option>
                                {doctorList.map((doctor) => (
                                    <option key={doctor.doctorId} value={doctor.doctorId}>
                                        {doctor.doctorName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="d-flex gap-2 justify-content-center">
                            <Button variant="danger" onClick={handleCancel} className="text-right">
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Add Appointment
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default BookAppointment;
