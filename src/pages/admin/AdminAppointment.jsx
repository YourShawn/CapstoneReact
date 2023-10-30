import React from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import the Link component for routing

function Appointments() {
  // Sample appointment data (replace with actual data)
  const appointmentsData = [
    { id: 1, patientName: "John Doe", date: "2023-10-15", time: "10:00 AM" },
    { id: 2, patientName: "Jane Smith", date: "2023-10-16", time: "2:30 PM" },
    // Add more appointment entries here
  ];

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
            <th>View</th> {/* New column for View link */}
          </tr>
        </thead>
        <tbody>
          {appointmentsData.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>
                <Link to={`/appointments/${appointment.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Appointments;
