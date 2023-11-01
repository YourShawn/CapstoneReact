import React, { useState, useEffect } from "react";
import { Table, Container, FormControl, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DoctorService from "../../services/doctorservices";
import ReactPaginate from "react-paginate";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Display 10 items per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    DoctorService.getPatientList()
      .then((response) => {
        setPatientsData(response.data.data);
      })
      .catch((error) => {
        console.error("Error from fetching data:", error);
      });
  }, []);

  // Calculate the index of the last item to be displayed
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  // Calculate the index of the first item to be displayed
  const indexOfFirstItem = currentPage * itemsPerPage;

  // Filter the data based on the search term
  const filteredData = patientsData.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get the current page of data
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Container>
      <h2 className="my-4">Welcome to Doctor Dashboard</h2>

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
          {currentData.map((patient) => (
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
        <Col md={12} className="d-flex justify-content-end">
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
