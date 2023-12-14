import React, { useState, useEffect } from 'react';
import PatientService from '../../services/PatientService';
import ReactPaginate from "react-paginate";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import ViewPrescriptions from './ViewPrescriptions';
import styles from "../../styles/pages/patient.module.scss";


const formatDate = (string) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(string).toLocaleDateString('en-US', options);
};


const PastMedicalRecords = ({ pastMedicalData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pastMedicalData.slice(indexOfFirstItem, indexOfLastItem);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  const openViewPrescription = async (prescriptionId) => {
    try {
      const response = await PatientService.getPrescriptionDetail(prescriptionId);

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
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h3 className="heading3">Past Medical Records</h3>
      <div className={styles.custom_table_wrapper}>
        <Table className={styles.custom_table} bordered>
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
                    View Prescriptions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
      <ViewPrescriptions
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedPrescriptions={selectedPrescriptions}
        formatDate={formatDate}
      />
    </Container>

  );
};

const App = () => {
  const [pastMedicalData, setPastMedicalData] = useState([]);

  const fetchPastMedicalRecords = async () => {
    try {
      // Assuming getPatientsPastMedicalRecords returns an array of past medical records
      const response = await PatientService.getPatientsPastMedicalRecords();
      setPastMedicalData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching past medical records:', error);
    }
  };

  useEffect(() => {
    // Fetch past medical records when the component mounts
    fetchPastMedicalRecords();
  }, []);

  return (
    <div>
      <PastMedicalRecords pastMedicalData={pastMedicalData} />
      {/* Modal for viewing prescriptions */}

    </div>
  );
};

export default App;