import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import the Link component for routing
import { Pagination } from "antd";
import dayjs from "dayjs";

function Appointments() {
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [appointmentData,setAppointmentData] = useState([]);

  async function findAppointmentPage(pageNum) {
    const responseDoctor = await fetch(
      "/api/appointments/findPage?pageSize=10&pageNum=" +
        pageNum
    );
    const responseDoctorData = await responseDoctor.json();
    setAppointmentData(responseDoctorData.data.list);
    setTotalPage(responseDoctorData.data.total);
  }

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    findAppointmentPage(page - 1);
  };


  useEffect(()=>{
    findAppointmentPage(0,10);
  },[])


  return (
    <Container>
      <h3>Appointments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>View</th> {/* New column for View link */}
          </tr>
        </thead>
        <tbody>
          {appointmentData &&
            appointmentData.map((appointment) => (
              <tr key={appointment?.appointmentId}>
                <td>{appointment?.appointmentId}</td>
                <td>{appointment?.patientName}</td>
                <td>
                  {appointment?.appointmentDateTime &&
                    dayjs(appointment?.appointmentDateTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                </td>
                <td>{appointment?.reasonForAppointment}</td>
                <td>{appointment?.status}</td>
                <td>
                  <Link
                    to={`/admin/appointment/info?appointmentId=${appointment.appointmentId}`}
                  >
                    Detail
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

export default Appointments;
