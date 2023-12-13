import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import dayjs from 'dayjs'
import { Pagination, Input, Space } from "antd";

function Patients() {
  const { Search } = Input;
    const [current, setCurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [patientsData, setPatientsData] = useState();
    const [healthCardId, setHealthCardId] = useState("");

    async function findPatientPage(pageNum, healthCardId) {
      const responseDoctor = await fetch(
        "/api/patients/findPage?pageSize=10&pageNum=" +
          pageNum +
          "&healthCardId=" +
          healthCardId
      );
      const responseDoctorData = await responseDoctor.json();
      setPatientsData(responseDoctorData.data.list);
      setTotalPage(responseDoctorData.data.total);
    }

    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
      findPatientPage(page - 1, healthCardId);
    };


  useEffect(()=>{
    findPatientPage(0, healthCardId);
  },[])

  return (
    <Container>
      <h3>Patients</h3>
      <Space.Compact>
        <Search
          addonBefore="Health Card"
          placeholder="Input Health ID"
          allowClear
          onChange={(e) => {
            setHealthCardId(e.target.value);
          }}
          value={healthCardId}
          onSearch={() => {
            findPatientPage(0, healthCardId);
          }}
        />
      </Space.Compact>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Health Card</th>
            <th>Action</th> {/* New column for View Patient Details */}
          </tr>
        </thead>
        <tbody>
          {patientsData &&
            patientsData.map((patient, index) => (
              <tr key={index}>
                <td>{patient.patientId}</td>
                <td>{patient.firstName + " " + patient.lastName}</td>
                <td>{patient.patientId}</td>
                <td>
                  {patient.dateOfBirth &&
                    dayjs().diff(dayjs(patient.dateOfBirth), "year")}
                </td>
                <td>{patient.gender}</td>
                <td>{patient.healthCardId}</td>
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
