import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DoctorService from "../../services/doctorservices";
import ReactPaginate from "react-paginate";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PrescriptionModal from "./PrescriptionModal";



function PatientDetails({ patientId }) {
  const [pastMedicalData, setPastMedicalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Display 10 items per page  
  


  const [patientDetails, setPatientDetails] = useState({
    id: patientId,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    healthCardId: "",
    bloodGroup: "",
    maritalStatus: "",
    phoneNumber: "",
    address: "",
    patientHistory: ""
  });
  const formatDate = (date) => {
    const date1 = new Date(date);
    const formattedDob = `${date1.getMonth() + 1}/${date1.getDate()}/${date1.getFullYear()}`;
    return formattedDob;
  };
  const handlePageChange = ({ selected }) => {
    // Add 1 to selected because currentPage is one-based
    setCurrentPage(selected + 1);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  const openViewPrescription = async (prescriptionId) => {
    try {
      const response = await DoctorService.getPrescriptionDetail(prescriptionId);

      // Check if the response has a data property
      if (response && response.data) {
        const prescriptionDetails = response.data.data;

        // Update state with the fetched prescription details
        setSelectedPrescriptions(prescriptionDetails);

        // Set showModal to true to display the modal
        setShowModal(true);
      } else {
        console.error("Error fetching prescription details: Unexpected response format", response);
      }
    } catch (error) {
      // Handle error if the prescription details cannot be fetched
      console.error("Error fetching prescription details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {


    const fetchPatientDetails = async () => {
      try {
        const response = await DoctorService.getPatientDetail(patientId);
        const [patientData] = response.data.data;

        setPatientDetails({
          id: patientData.patientId,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          dateOfBirth: formatDate(patientData.dateOfBirth),
          gender: patientData.gender,
          healthCardId: patientData.healthCardId,
          bloodGroup: patientData.bloodGroup,
          maritalStatus: patientData.maritalStatus,
          phoneNumber: patientData.phoneNumber,
          address: patientData.address,
          patientHistory: patientData.patientHistory,
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchPastMedicalRecords = async () => {
      try {
        const response = await DoctorService.getPatientsPastMedicalRecords(patientId);
        setPastMedicalData(response.data.data);
      } catch (error) {
        console.error("Error fetching past medical records:", error);
      }
    };

    fetchPatientDetails();
    fetchPastMedicalRecords();
  }, [patientId]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pastMedicalData.slice(indexOfFirstItem, indexOfLastItem);


  const [showRecordForm, setShowRecordForm] = useState(false);
  const [treatment, setTreatment] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicationRecords, setMedicationRecords] = useState([]);
  const [presErrorMessage, setPresErrorMessage] = useState("");
  const [status, setStatus] = useState("");
  const [prescriptionSubmitted, setPrescriptionSubmitted] = useState(false);

  const handleAddRecord = () => {
    setMedicationRecords([...medicationRecords, {
      medicationName: '',
      description: '',
      dosage: '',
      frequency: '',
      startDate: null,
      endDate: null,
    }]);
  };


  const handleRemoveRecord = (index) => {
    // Remove the record at the specified index
    const updatedRecords = [...medicationRecords];
    updatedRecords.splice(index, 1);
    setMedicationRecords(updatedRecords);
  };

  const handleInputChange = (e, index, field) => {
    setMedicationRecords(prevRecords => {
      // Create a copy of the array
      const updatedRecords = [...prevRecords];

      // Ensure the current row exists, or add a new one
      const currentRow = updatedRecords[index] || {
        medicationName: '',
        description: '',
        dosage: '',
        frequency: '',
        startDate: null,
        endDate: null,
      };

      // Update the property
      currentRow[field] = e.target.value;

      // Update the array at the specified index
      updatedRecords[index] = currentRow;

      // Log the state before the update
      console.log('Before setMedicationRecords:', updatedRecords);

      // Return the updated array
      return updatedRecords;
    });
  };

  const handleDateChange = (date, index, field) => {
    const updatedMedicationRecords = [...medicationRecords];
    const updatedRecord = { ...updatedMedicationRecords[index] };
    updatedRecord[field] = date instanceof Date ? date : null;
    updatedMedicationRecords[index] = updatedRecord;
    setMedicationRecords(updatedMedicationRecords);

  };


  const handleSubmitPrescription = async () => {
    // Validate Diagnosis, Treatment, and Status
    if (!diagnosis.trim() || !treatment.trim() || !status) {
      // Set the error message
      setPresErrorMessage("Diagnosis, Treatment, and Status are required");
      return;
    }
    setPresErrorMessage("");
    try {
      // Step 1: Save Prescription
      const prescriptionData = {
        notes: notes,
        prescriptionDate: new Date()
      };

      const prescriptionResponse = await DoctorService.savePrescription(prescriptionData);
      const prescriptionId = prescriptionResponse.data.data;

      // Step 2: Save Medical Records
      const medicalRecordsData = {
        patientId: patientId,
        doctorId: 1,
        dateOfVisit: new Date(),
        diagnosis: diagnosis,
        treatment: treatment,
        prescriptionId: prescriptionId,
        visitStatus: status
      };

      await DoctorService.saveMedicalRecords(medicalRecordsData);

      // Step 3: Save Medications (if medication data exists)
      if (medicationRecords.length > 0) {
        const medicationsData = {
          medications: medicationRecords.map(record => ({
            ...record,
            prescriptionId: prescriptionId
          }))
        };
        await DoctorService.saveMedications(medicationsData.medications);     
      }

      setPrescriptionSubmitted(true);
      // Reset prescription-related states
      setTreatment("");
      setDiagnosis("");
      setNotes("");
      setMedicationRecords([]);
      // Refetch and update Past Medical Records data
      const updatedResponse = await DoctorService.getPatientsPastMedicalRecords(patientId);
      setPastMedicalData(updatedResponse.data.data);
      console.log("Prescription submitted successfully!");
    } catch (error) {
      // Handle error if the prescription or medical records cannot be submitted
      console.error("Error submitting prescription:", error);
    }
  };


  const shouldShowAddMore =
    medicationRecords.length === 0 ||
    Object.values(medicationRecords[medicationRecords.length - 1]).some(value => value !== '');
  return (
    <Container>
      <h2 className="my-4">Patient Details</h2>

      {/* Basic Information */}
      <div>
        <h3>Basic Information</h3>

        {/* Display the first two fields in a single row */}
        <Row>
          <Col md={6}>
            <p><label className="bold-label">Patient ID :</label> {patientDetails.id}</p>
          </Col>
          <Col md={6}>
            <p><label className="bold-label">Name :</label> {`${patientDetails.firstName} ${patientDetails.lastName}`}</p>
          </Col>
        </Row>


        <Row>
          <Col md={6}>
            <p><label className="bold-label">Date of Birth :</label> {patientDetails.dateOfBirth}</p>
          </Col>
          <Col md={6}>
            <p><label className="bold-label">Gender :</label> {patientDetails.gender}</p>
          </Col>

        </Row>

        <Row>
          <Col md={6}>
            <p><label className="bold-label">Health Card Number :</label> {patientDetails.healthCardId}</p>
          </Col>
          <Col md={6}>
            <p><label className="bold-label">Blood Group :</label> {patientDetails.bloodGroup}</p>
          </Col>

        </Row>

        <Row>
          <Col md={12}>
            <p><label className="bold-label">Marital Status :</label> {patientDetails.maritalStatus}</p>
          </Col>


        </Row>

        <Row>
          <Col md={6}>
            <p><label className="bold-label">Phone Number :</label> {patientDetails.phoneNumber}</p>
          </Col>
          <Col md={6}>
            <p><label className="bold-label">Address :</label> {patientDetails.address}</p>
          </Col>

        </Row>
      </div>

      {/* Medical Information */}
      <div className="my-4">
        <h3>Medical Information</h3>
        <Row>
          <Col md={12}>
            <p><label className="bold-label">Patient History :</label> {patientDetails.patientHistory}</p>
          </Col>
        </Row>
      </div>


      {/* Options for Prescription and Lab Test */}
      <div className="my-4 d-flex justify-content-end">
        <Button variant="success" onClick={() => setShowRecordForm(true)} style={{ marginRight: '10px' }}>Add Prescription</Button>
      </div>



      {/* Medication Records Form and Table */}
      {showRecordForm && !prescriptionSubmitted && (
        <div className="medication-records-container">
          {/* Medication Records Form */}
          <Form>
            <Form.Group controlId="formDiagnosis" >
              <Form.Label className="bold-label">Diagnosis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTreatment" style={{ marginTop: '20px' }}>
              <Form.Label className="bold-label">Treatment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNotes" style={{ marginTop: '20px' }}>
              <Form.Label className="bold-label">Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStatus" style={{ marginTop: '20px' }}>
              <Form.Label className="bold-label">Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
            {presErrorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {presErrorMessage}
              </div>
            )}

          </Form>
          {/* Move the "Add More" button outside the table */}
          {shouldShowAddMore && (
            <div className="my-4 d-flex justify-content-end">
              <Button variant="primary" onClick={handleAddRecord} style={{ marginTop: '20px' }}>
                Add Medication
              </Button>
            </div>
          )}
          <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Medication Name</th>
                <th>Description</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicationRecords.map((record, index) => (
                <tr key={index}>
                  <td><input type="text" value={record.medicationName} onChange={(e) => handleInputChange(e, index, 'medicationName')} /></td>
                  <td><input type="text" value={record.description} onChange={(e) => handleInputChange(e, index, 'description')} /></td>
                  <td><input type="text" value={record.dosage} onChange={(e) => handleInputChange(e, index, 'dosage')} /></td>
                  <td><input type="text" value={record.frequency} onChange={(e) => handleInputChange(e, index, 'frequency')} /></td>
                  <td>
                    <ReactDatePicker
                      selected={record.startDate ? new Date(record.startDate) : null}
                      onChange={(date) => handleDateChange(date, index, 'startDate')}
                    />
                  </td>
                  <td>
                    <ReactDatePicker
                      selected={record.endDate ? new Date(record.endDate) : null}
                      onChange={(date) => handleDateChange(date, index, 'endDate')}
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveRecord(index)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="my-4 d-flex justify-content-center text-center">
            <Button
              variant="primary"
              onClick={handleSubmitPrescription}
              style={{ marginTop: '20px' }}
            >
              Submit Prescription
            </Button>
          </div>



        </div>
      )}

      {/* Success Message */}
      {prescriptionSubmitted && (
        <div className="my-4">
          <Alert variant="success" onClose={() => { setPrescriptionSubmitted(false); setShowRecordForm(false); }} dismissible>
            Prescription saved successfully!
          </Alert>
        </div>
      )}


      <div>
        <h3>Past Medical Records</h3>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date of Visit</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Visit Status</th>
              <th>View Prescriptions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((record) => (
              <tr key={record.recordId}>
                <td>{record.recordId}</td>
                <td>{formatDate(record.dateOfVisit)}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
                <td>{record.visitStatus}</td>
                <td>
                  {/* Add a button or link to view prescriptions */}
                  <Button
                    variant="primary"
                    onClick={() => openViewPrescription(record.prescriptionId)}>
                    View Prescriptions</Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="mb-4">
          <Col md={6}>
            <p>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pastMedicalData.length)} of {pastMedicalData.length} entries
            </p>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <ReactPaginate
              previousLabel={<span className="pagination-symbol">{"<"}</span>}
              nextLabel={<span className="pagination-symbol">{">"}</span>}
              breakLabel={"..."}
              pageCount={Math.ceil(pastMedicalData.length / itemsPerPage)}
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
      </div>

      {/* Modal for viewing prescriptions */}
      <PrescriptionModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedPrescriptions={selectedPrescriptions}
        formatDate={formatDate}
      />

    </Container>
  );
}

export default PatientDetails;
