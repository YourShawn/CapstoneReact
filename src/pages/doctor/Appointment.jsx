import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import DoctorService from "../../services/doctorservices";
import ReactPaginate from "react-paginate";
import { Alert } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import styles from "../../styles/pages/doctor.module.scss";

function formatDate(string) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(string).toLocaleDateString('en-US', options);
}

function Appointments() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Display 10 items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteReasonError, setDeleteReasonError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  //const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    DoctorService.getAppointmentList()
      .then((response) => {
        setAppointmentData(response.data.data);
      })
      .catch((error) => {
        console.error("Error from fetching data:", error);
      });
  }, []);




  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteReason('');
    setDeleteReasonError(false);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {

    DoctorService.deleteAppointment(selectedAppointment.appointmentId, deleteReason)
      .then(() => {
        // Fetch updated appointment list
        DoctorService.getAppointmentList()
          .then((response) => {
            setAppointmentData(response.data.data);
            setSuccessMessage("Appointment deleted successfully!");
          })
          .catch((error) => {
            console.error("Error from fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleCancelSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleUpdateClick = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdateStatus("");
    setShowUpdateModal(true);
  };

  const handleUpdateConfirm = () => {
    DoctorService.updateAppointment(selectedAppointment.appointmentId, updateStatus)
      .then(() => {
        // Fetch updated appointment list
        DoctorService.getAppointmentList()
          .then((response) => {
            setAppointmentData(response.data.data);
            setSuccessMessage("Appointment status updated successfully!");
          })
          .catch((error) => {
            console.error("Error from fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
    setShowUpdateModal(false);
  };

  const handleUpdateCancel = () => {
    setShowUpdateModal(false);
  };

  return (
    <Container>
      <h3 className="heading3">Appointments</h3>
      {successMessage && (
        <Alert variant="success" onClose={handleCancelSuccessMessage} dismissible>
          <div className="d-flex justify-content-between align-items-center">
            <div>{successMessage}</div>
          </div>
        </Alert>
      )}
      <Table bordered className={styles.custom_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Reason</th>
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
                <td>{appointment.patientName}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{appointment.status}</td>
                <td>{appointment.reasonForAppointment}</td>
                <td>
                  {appointment.status !== "Completed" && (
                    <>
                      <Button variant="link" onClick={() => handleUpdateClick(appointment)}>
                        <PencilSquare />
                      </Button>
                      <Button variant="link" onClick={() => handleDeleteClick(appointment)}>
                        <Trash />
                      </Button>
                    </>
                  )}

                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Pagination with react-paginate */}
      <Row className="mb-4">
        <Col md={6}>
          {/* Showing X to Y of Z entries */}
          <p>

            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, appointmentData.length)} of {appointmentData.length} entries
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
            <ReactPaginate
              previousLabel={<span className="pagination-symbol">{"<"}</span>}
              nextLabel={<span className="pagination-symbol">{">"}</span>}
              breakLabel={"..."}
              pageCount={Math.ceil(appointmentData.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination justify-content-end"}
              subContainerClassName={"pages pagination"}
              pageClassName={"page-item"}
              activeClassName={"active"}
              activeLinkClassName={"active-link"}
              pageLinkClassName={"page-link"}
              breakClassName={"page-item"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
            />
          </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Patient Information */}
          <p><strong>Patient Name:</strong> {selectedAppointment?.patientId}</p>
          {/* Appointment Details */}

          <p><strong>Date:</strong> {formatDate(selectedAppointment?.appointmentDateTime).split(",")[0]}</p>
          <p><strong>Time:</strong> {formatDate(selectedAppointment?.appointmentDateTime).split(",")[1]}</p>
          {/* Confirmation */}
          <p><strong>Are you sure you want to delete this appointment?</strong></p>
          {/* Reason for Deletion */}
          <textarea
            placeholder="Enter delete reason..."
            rows="4"
            cols="50"
            value={deleteReason}
            onChange={(e) => {
              setDeleteReason(e.target.value);
              setDeleteReasonError(false); // Clear the error when the user starts typing
            }}
          />
          {deleteReasonError && (
            <p style={{ color: 'red' }}>Please enter a reason for deletion.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} disabled={!deleteReason}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleUpdateCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="updateStatusForm">
            <Form.Label>Select Status</Form.Label>
            <Form.Control as="select" value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              {/* Add more status options as needed */}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateConfirm} disabled={!updateStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Appointments;
