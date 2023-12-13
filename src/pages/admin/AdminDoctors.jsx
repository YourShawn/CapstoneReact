import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { Pagination, Input, Space } from "antd";


function AdminDoctors() {
const { Search } = Input;

    const [current, setCurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [doctorsData, setDoctorsData] = useState();
    const [searchDoctorName, setSearchDoctorName] = useState("");

    async function findDoctorsPage(pageNum, searchDoctorName) {
      const responseDoctor = await fetch(
        "/api/doctors/findPage?pageSize=10&pageNum=" +
          pageNum +
          "&doctorName=" +
          searchDoctorName
      );
      const responseDoctorData = await responseDoctor.json();
      setDoctorsData(responseDoctorData.data.list);
      setTotalPage(responseDoctorData.data.total);
    }
// const onSearch: = (value, _e, info) => console.log(info?.source, value);
function onSearchDoctor(){
  findDoctorsPage(0, searchDoctorName);
}


    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
      findDoctorsPage(page - 1, searchDoctorName);
    };

    useEffect(() => {
      findDoctorsPage(0, searchDoctorName);
    }, []);

  return (
    <Container>
      <h3>Doctors</h3>
      <Space.Compact>
        <Search
          addonBefore="Name"
          placeholder="Input doctor name"
          allowClear
          onChange={(e) => {
            setSearchDoctorName(e.target.value);
          }}
          value={searchDoctorName}
          onSearch={()=>{onSearchDoctor()}}
        />
      </Space.Compact>
      <hr/>
      {/* <Input
        placeholder="Doctor Name"
        onChange={(e) => setSearchDoctorName(e.target.value)}
      /> */}
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
                  <Link to={`/admin/doctor/info?doctorId=${doctor.doctorId}`}>
                    Details
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

export default AdminDoctors;
