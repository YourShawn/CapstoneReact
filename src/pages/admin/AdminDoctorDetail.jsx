import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form } from "antd";
import {useNavigate} from "react-router-dom"

function AdminDoctorDetail({doctorId}) {

  const nav = useNavigate();

  function goBack() {
    nav("/doctors");
  }
  const [doctorData,setDoctorData] = useState(null);

  async function findAppointmentInfo(doctorId) {
    const responseDoctor = await fetch(
      `http://localhost:8080/doctors/getInfo?doctorId=${doctorId}`
    );
    const responseDoctorData = await responseDoctor.json();
    setDoctorData(responseDoctorData.data);
    console.log(responseDoctorData.data,1111);
  }
  useEffect(() => {
    findAppointmentInfo(doctorId);
  }, [doctorId]);


  return (
    <Container>
      <h3>Doctor</h3>
      <Form
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Doctor Name">{doctorData?.doctorName}</Form.Item>

        <Form.Item label="Specialization">
          {doctorData?.specialization}
        </Form.Item>

        <Form.Item label="Address">{doctorData?.address}</Form.Item>

        <Form.Item label="Phone Number">{doctorData?.phoneNumber}</Form.Item>

        <Form.Item label=" ">
          <Button type="primary" onClick={goBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AdminDoctorDetail;
