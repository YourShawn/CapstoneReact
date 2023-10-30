import React from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

function Patients() {
  // Sample patient data (replace with actual data)
  const patientsData = [
    { id: 1, patientName: "John Doe", age: 30, gender: "Male" },
    { id: 2, patientName: "Jane Smith", age: 25, gender: "Female" },
    // Add more patient entries here
  ];

  return (
    <Container>

      <h3>Patients</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th> {/* New column for View Patient Details */}
          </tr>
        </thead>
        <tbody>
          {patientsData.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.patientName}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>
                <Link to={`/patient/${patient.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Patients;
