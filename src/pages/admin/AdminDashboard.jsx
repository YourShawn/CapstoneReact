import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  PersonFill,
  Calendar,
  PersonLinesFill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import { BarChart } from '@mui/x-charts/BarChart';


function DashboardContent() {
  
  const [username, setUsername] = useState("administrator");
  const[onlineDoctorTotal,setOnlineDoctorTotal] = useState(0)
  const [appointmentTotal, setAppointmentTotal] = useState(0);
  const [patientTotal, setPatientTotal] = useState(0);
  const [todayPrescription, setTodayPrescription] = useState(0);
  const [appointmentYear, setAppointmentYear] = useState([
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ]);
  const [appointmentCount, setAppointmentCount] = useState([
    150, 200, 500, 300, 900
  ]);

   const [prescriptionYear, setPrescriptionYear] = useState([
     "2020",
     "2021",
     "2022",
     "2023",
     "2024",
   ]);
   const [prescriptionCount, setPrescriptionCount] = useState([
     150, 200, 500, 300, 900,
   ]);

  const bigNumberStyle = {
    fontSize: "36px", // Adjust the font size as needed
    fontWeight: "bold",
  };

  const smallLabelStyle = {
    fontSize: "18px", // Adjust the font size as needed
  };

  const doctorNameStyle = {
    color: "#035e55",        // Text color
    backgroundColor: "white", // Background color
    padding: "10px",          // Padding for better contrast
  };

  async function getTotalData() {
    const responseDoctor = await fetch("/api/doctors/findPage?pageSize=1");
    const responseDoctorData = await responseDoctor.json();
    setOnlineDoctorTotal(responseDoctorData.data.total);

    const responseAppointment = await fetch(
      "/api/appointments/findPage?pageSize=1"
    );
    const responseAppointmentData = await responseAppointment.json();
    setAppointmentTotal(responseAppointmentData.data.total);
    
    const responsePatients = await fetch(
      "/api/patients/findPage?pageSize=1"
    );
    const responsePatientsData = await responsePatients.json();
    setPatientTotal(responsePatientsData.data.total);

  }

   async function getGroupData() {

    const findGroupDays = await fetch(
      "/api/appointments/findGroupDays"
    );
    const findGroupDaysData = await findGroupDays.json();
    if (findGroupDaysData.data) {
      let appoints= [];
      let count = [];
      findGroupDaysData.data.map((item)=>{
          appoints.push(item.day.substring(5, 10));
          count.push(item.count);
      })
      setAppointmentYear(appoints);
      setAppointmentCount(count);
    }


    const findGroupAppointmentYear = await fetch(
      "/api/prescriptions/findGroupYear"
    );
    const findGroupAppointmentYearData = await findGroupAppointmentYear.json();
    if (findGroupAppointmentYearData.data) {
      let years = [];
      let count = [];
      findGroupAppointmentYearData.data.map((item) => {
        years.push(item.year);
        count.push(item.count);
      });
      setPrescriptionYear(years);
      setPrescriptionCount(count);
    }
    console.log(findGroupAppointmentYearData.data);


    const findPrescriptionToday = await fetch("/api/prescriptions/findToday");
    const findPrescriptionTodayDate = await findPrescriptionToday.json();
    if (findPrescriptionTodayDate.data) {
      setTodayPrescription(findPrescriptionTodayDate.data);
    }
   }

   
  async function getInfo() {
    const info = await fetch("/api/getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        loginToken: localStorage.getItem("loginToken"),
      },
    });
    const infoData = await info.json();
    // if (!infoData.data) {
    //   window.location.href = "/login"; 
    // }
    setUsername(infoData.data);
  }


  useEffect(()=>{
    const token = localStorage.getItem("loginToken");
    if (!token) {
      window.location.href = "/login"; 
    }
    getInfo();
    getTotalData();
    getGroupData();

  },[])

  return (
    <Container>
      {/* Welcome Message */}
      <Row className="mb-4">
        <Col>
          <Card style={doctorNameStyle}>
            <Card.Body>
              <Card.Title>Hello, {username}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Patient and Appointment Rows */}
      <Row>
        {/* Total Doctors */}
        <Col md={6} className="mb-4">
          <Card bg="" text="black">
            <Card.Body>
              <div style={smallLabelStyle}>
                <PersonLinesFill size={20} /> Online Doctors
              </div>
              <div style={bigNumberStyle}>{onlineDoctorTotal}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Patients */}
        <Col md={6} className="mb-4">
          <Card bg="danger" text="white">
            <Card.Body>
              <div style={smallLabelStyle}>
                <PersonFill size={20} /> Patients
              </div>
              <div style={bigNumberStyle}>{patientTotal}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Appointments */}
        <Col md={6} className="mb-4">
          <Card bg="success" text="white">
            <Card.Body>
              <div style={smallLabelStyle}>
                <Calendar size={20} /> Today Appointments
              </div>
              <div style={bigNumberStyle}>{appointmentTotal}</div>
            </Card.Body>
          </Card>
        </Col>
        {/* Total Appointments */}
        <Col md={6} className="mb-4">
          <Card bg="" text="black">
            <Card.Body>
              <div style={smallLabelStyle}>
                <InfoCircleFill size={20} /> Today Prescriptions
              </div>
              <div style={bigNumberStyle}>{todayPrescription}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Appointments Per Year</Card.Title>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: appointmentYear,
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: appointmentCount,
                    color: "#fdb462",
                  },
                ]}
                width={500}
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Prescriptions Per Year</Card.Title>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: prescriptionYear,
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: prescriptionCount,
                  },
                ]}
                width={500}
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardContent;
