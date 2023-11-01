import React, { useState, useEffect } from "react";
import { Table, Container, FormControl, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DoctorService from "../../services/doctorservices";
import ReactPaginate from "react-paginate"; 

function formatDate(string) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(string).toLocaleDateString('en-US', options);
}

function Appointments() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Display 10 items per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    DoctorService.getAppointmentList()
      .then((response) => {
        setAppointmentData(response.data.data);
      })
      .catch((error) => {
        console.error("Error from fetching data:", error);
      });
  }, []);
  // Calculate the index of the last item to be displayed
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  // Calculate the index of the first item to be displayed
  const indexOfFirstItem = currentPage * itemsPerPage;



  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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
            <th>View</th> {/* New column for View link */}
          </tr>
        </thead>
        <tbody>
          {appointmentData.map((appointment) => {
            // Split the appointmentDateTime into date and time
            const dateTimeParts = formatDate(appointment.appointmentDateTime).split(",");
            const date = dateTimeParts[0];
            const time = dateTimeParts[1];

            return (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.patientId}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  <Link to={`/appointments/${appointment.appointmentId}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Pagination with react-paginate */}
      <Row className="mb-4">
        <Col md={12} className="d-flex justify-content-end">
          <ReactPaginate
            previousLabel={"<"} 
            nextLabel={">"} 
            breakLabel={"..."}
            pageCount={Math.ceil(appointmentData.length / itemsPerPage)}
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

export default Appointments;
