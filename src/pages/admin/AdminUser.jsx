import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import {Pagination} from "antd"
import dayjs from 'dayjs'
function Users() {
    const [current, setCurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [usersData, setUsersData] = useState([
      { id: 1, patientName: "John Doe", age: 30, gender: "Male" },
      { id: 2, patientName: "Jane Smith", age: 25, gender: "Female" },
    ]);

    async function findUserPage(pageNum) {
      const responseDoctor = await fetch(
        "/api/user/findPage?pageSize=10&pageNum=" + pageNum
      );
      const responseDoctorData = await responseDoctor.json();
      setUsersData(responseDoctorData.data.list);
      setTotalPage(responseDoctorData.data.total);
    }

    const onChange = (page) => {
      console.log(page);
      setCurrent(page);
      findUserPage(page - 1);
    };


  useEffect(()=>{
    findUserPage(0);
  },[])

  return (
    <Container>
      <h3>Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>role</th>
            <th>Action</th> {/* New column for View Patient Details */}
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((user, index) => (
              <tr key={index}>
                <td>{user.userId}</td>
                <td>{user.fullName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/admin/user/info?userId=${user.userId}`}>
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

export default Users;
