import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

function PrescriptionModal({ showModal, handleCloseModal, selectedPrescriptions, formatDate }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Prescriptions</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* Check if selectedPrescriptions is not undefined and has data */}
          {selectedPrescriptions && selectedPrescriptions.length > 0 ? (
            <>
              {/* Display Prescription Id, Prescription Date, and Notes for the first prescription */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">Prescription Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Prescription ID</strong></td>
                    <td>{selectedPrescriptions[0].prescriptionId}</td>
                  </tr>
                  <tr>
                    <td><strong>Prescription Date</strong></td>
                    <td>{formatDate(selectedPrescriptions[0].prescriptionDate)}</td>
                  </tr>
                  <tr>
                    <td><strong>Notes</strong></td>
                    <td>{selectedPrescriptions[0].notes}</td>
                  </tr>
                </tbody>
              </Table>


              {/* Table for prescription details */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Medication Name</th>
                    <th>Description</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPrescriptions.map((detail) => (
                    <tr key={detail.medicationId}>
                      <td>{detail.medicationName}</td>
                      <td>{detail.description}</td>
                      <td>{detail.dosage}</td>
                      <td>{detail.frequency}</td>
                      <td>{formatDate(detail.startDate)}</td>
                      <td>{formatDate(detail.endDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
            ) : (
              <div className="my-4 text-center bold-label">
                <p>No medications were prescribed.</p>
              </div>
            )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default PrescriptionModal;
