import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { Pagination } from "antd";


function Doctors() {
  // Sample patient data (replace with actual data)
  // const doctorsData = [
  //   { id: 1, DoctorsName: "Doctor A", gender: "Male" },
  //   { id: 2, DoctorsName: "Doctor B", gender: "Female" },
  //   // Add more patient entries here
  // ];


    const [current, setCurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [doctorsData, setDoctorsData] = useState([
      { id: 1, DoctorsName: "Doctor A", gender: "Male" },
      { id: 2, DoctorsName: "Doctor B", gender: "Female" },
    ]);

    async function findDoctorsPage(pageNum) {
      const responseDoctor = await fetch(
        "http://localhost:8080/doctors/findPage?pageSize=10&pageNum=" + pageNum
      );
      const responseDoctorData = await responseDoctor.json();
      setDoctorsData(responseDoctorData.data.list);
      setTotalPage(responseDoctorData.data.total);
    }

    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
      findDoctorsPage(page - 1);
    };

    useEffect(() => {
      findDoctorsPage(0);
    }, []);

  return (
    <Container>
      <h3>Doctors</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Action</th> {/* New column for View Patient Details */}
          </tr>
        </thead>
        <tbody>
          {doctorsData &&
            doctorsData.map((doctor) => (
              <tr key={doctor.doctorId}>
                <td>{doctor.doctorId}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.specialization}</td>
                <td>
                  <Link to={`admin/doctor/${doctor.doctorId}`}>
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

export default Doctors;
