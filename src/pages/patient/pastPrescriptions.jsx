import React, { useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PastPrescriptions = ({ pastPrescriptions }) => {
  return (
    <Container className="mt-4">
      <h3>Prescriptions based on Current Visit</h3>
      {pastPrescriptions.length === 0 ? (
        <Alert variant="info">No prescriptions available.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {pastPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.doctor}</td>
                <td>{prescription.date}</td>
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>
                  <Link to={`/prescriptions/${prescription.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

const App = () => {
  const [pastPrescriptions] = useState([
    { id: 1, doctor: 'Dr. Smith', date: '2023-10-15', medication: 'Aspirin', dosage: '10mg' },
    { id: 2, doctor: 'Dr. Johnson', date: '2023-09-22', medication: 'Antibiotic', dosage: '500mg' },
  ]);

  return (
    <div>
      <PastPrescriptions pastPrescriptions={pastPrescriptions} />
    </div>
  );
};

export default App;
