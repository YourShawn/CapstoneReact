import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PatientService from "../../services/PatientService";

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
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label className="bold-label ">Patient Name : </Form.Label>
                <span className="bold-label"> {patientName}</span>
            </Form.Group>
            <Form.Group className="py-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Reason for Appointment</Form.Label>
                <Form.Control type="text" name="reasonForAppointment" value={formData.reasonForAppointment} onChange={handleChange} required />
            </Form.Group>
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
            <Form.Group className="py-3">
                <Button type="submit" variant="primary">
                    Add Appointment
                </Button>
                <Button variant="danger" onClick={handleCancel} className="ml-2" style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>

            </Form.Group>
        </Form>
    );
}

export default BookAppointment;
