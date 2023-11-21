import React, { useState, useEffect } from "react";
import { Table, Container, FormControl, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DoctorService from "../../services/doctorservices";
import ReactPaginate from "react-paginate";
import AddPatient from "./AddPatient";


function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}

function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Display 10 items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  const handleShowAddPatientModal = () => setShowAddPatientModal(true);
  const handleCloseAddPatientModal = () => setShowAddPatientModal(false);

  useEffect(() => {
    DoctorService.getPatientList()
      .then((response) => {
        setPatientsData(response.data.data);
      })
      .catch((error) => {
        console.error("Error from fetching data:", error);
      });
  }, []);


  

  // Filter the data based on the search term
  const filteredData = patientsData.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAddPatientClick = () => {
    handleShowAddPatientModal();
  };

  const handleAddPatientSubmit = (formData) => {
    // Add logic to submit patient data to the server
    // and update the state accordingly
    // For example, DoctorService.addPatient(formData)
    //   .then((response) => {
    //     // Update state or fetch updated patient list
    //   })
    //   .catch((error) => {
    //     console.error("Error adding patient:", error);
    //   });

    // For now, just close the modal
    handleCloseAddPatientModal();
  };

  return (
    <Container>
      <h2 className="my-4">Welcome to Doctor Dashboard</h2>

      <Row className="mb-4">
        <Col md={12} className="d-flex justify-content-end">
          {/* Add Patient Button */}
          <Button variant="success" onClick={handleAddPatientClick}>
            Add Patient
          </Button>
        </Col>
      </Row>

      <AddPatient
        show={showAddPatientModal}
        handleClose={handleCloseAddPatientModal}
        handleAddPatientSubmit={handleAddPatientSubmit}
      />

      <Row className="mb-4">
        <Col md={6} className="d-flex justify-content-end">
          <FormControl
            type="text"
            placeholder="Search by name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

      </Row>

      <Table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{`${patient.firstName} ${patient.lastName}`}</td>
              <td>{calculateAge(patient.dateOfBirth)}</td>
              <td>{patient.gender}</td>
              <td>
                <Link to={`/patient/${patient.patientId}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination with react-paginate */}
      <Row className="mb-4">
        <Col md={6}>
          {/* Showing X to Y of Z entries */}
          <p>

            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage,
              filteredData.length)} of {filteredData.length} entries
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Patients;
