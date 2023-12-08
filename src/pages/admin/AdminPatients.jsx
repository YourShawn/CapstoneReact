import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import {Pagination} from "antd"
import dayjs from 'dayjs'
function Patients() {
    const [current, setCurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [patientsData, setPatientsData] = useState([
      { id: 1, patientName: "John Doe", age: 30, gender: "Male" },
      { id: 2, patientName: "Jane Smith", age: 25, gender: "Female" },
    ]);

    async function findPatientPage(pageNum) {
      const responseDoctor = await fetch(
        "/api/patients/findPage?pageSize=10&pageNum=" +
          pageNum
      );
      const responseDoctorData = await responseDoctor.json();
      setPatientsData(responseDoctorData.data.list);
      setTotalPage(responseDoctorData.data.total);
    }

    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
      findPatientPage(page - 1);
    };


  useEffect(()=>{
    findPatientPage(0);
  },[])

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
          {patientsData &&
            patientsData.map((patient, index) => (
              <tr key={index}>
                <td>{patient.patientId}</td>
                <td>{patient.firstName + " " + patient.lastName}</td>
                <td>
                  {patient.dateOfBirth &&
                    dayjs().diff(dayjs(patient.dateOfBirth), "year")}
                </td>
                <td>{patient.gender}</td>
                <td>
                  <Link
                    to={`/admin/patient/info?patientId=${patient.patientId}`}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination current={current} onChange={onChange} total={totalPage} />
    </Container>
  );
}

export default Patients;
