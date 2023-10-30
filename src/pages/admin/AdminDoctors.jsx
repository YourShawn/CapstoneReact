import React from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

function Doctors() {
  // Sample patient data (replace with actual data)
  const doctorsData = [
    { id: 1, DoctorsName: "Doctor A", gender: "Male" },
    { id: 2, DoctorsName: "Doctor B", gender: "Female" },
    // Add more patient entries here
  ];

  return (
    <Container>
      <h3>Doctors</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor Name</th>
            <th>Age</th>
            <th>Action</th> {/* New column for View Patient Details */}
          </tr>
        </thead>
        <tbody>
          {doctorsData.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.age}</td>
              <td>
                <Link to={`/admin/doctor/${doctor.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Doctors;
