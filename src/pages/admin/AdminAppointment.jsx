import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import the Link component for routing
import { Pagination } from "antd";
import dayjs from "dayjs";

function Appointments() {
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [appointmentData,setAppointmentData] = useState([
    { id: 1, patientName: "John Doe", date: "2023-10-15", time: "10:00 AM" },
    { id: 2, patientName: "Jane Smith", date: "2023-10-16", time: "2:30 PM" },
    // Add more appointment entries here
  ]);

  async function findAppointmentPage(pageNum) {
    const responseDoctor = await fetch(
      "http://localhost:8080/appointments/findPage?pageSize=10&pageNum=" +
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
            <th>View</th> {/* New column for View link */}
          </tr>
        </thead>
        <tbody>
          {appointmentData &&
            appointmentData.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.patientName}</td>
                <td>
                  {appointment.appointmentDateTime &&
                    dayjs(appointment.appointmentDateTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                </td>
                <td>{appointment.reasonForAppointment}</td>
                <td>
                  <Link to={`appointments/${appointment.appointmentId}`}>
                    View
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
