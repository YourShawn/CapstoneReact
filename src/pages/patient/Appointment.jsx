import React, { useState } from "react";
import { Table, Container, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Appointments() {
  const [appointmentsData, setAppointmentsData] = useState([
    { id: 1, patientName: "Kabir", date: "2023-10-27", time: "10:00 AM", membership: "Standard", paymentMode: "Credit Card" },
    { id: 2, patientName: "John", date: "2023-01-02", time: "1:00 PM", membership: "Premium", paymentMode: "Cash" },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    membership: "Standard", // Default membership value
    paymentMode: "Credit Card", // Default payment mode value
  });

  const [isDateAndTimeAvailable, setIsDateAndTimeAvailable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the selected date and time are available
    const isAvailable = checkAvailability(formData.date, formData.time);

    if (isAvailable) {
      const newAppointment = {
        id: appointmentsData.length + 1,
        ...formData,
      };

      setAppointmentsData([...appointmentsData, newAppointment]);
      setFormData({
        patientName: "",
        date: "",
        time: "",
        status: "Scheduled",
      });
      setIsDateAndTimeAvailable(true);
    } else {
      setIsDateAndTimeAvailable(false);
    }
  };

  const checkAvailability = (selectedDate, selectedTime) => {
    
    const isAvailable = !appointmentsData.some((appointment) => appointment.date === selectedDate && appointment.time === selectedTime);
    
    return isAvailable;
  };

  return (
    <Container>
      <h3>Appointments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Book an Appointment</h3>
      <Form onSubmit={handleSubmit}>
        {isDateAndTimeAvailable === false && (
          <Alert variant="danger" className="mb-3">
            The selected date and time are not available. Please choose a different one.
          </Alert>
        )}
        <Form.Group>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
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
          <Form.Label>Membership</Form.Label>
          <Form.Control as="select" name="membership" value={formData.membership} onChange={handleChange} required>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="py-3">
          <Button type="submit" variant="primary">
            Add Appointment
          </Button>
        </Form.Group>
        <Form.Group>
          <Button type="button" className="text-right" variant="danger">
            Cancel Appointment
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Appointments;
