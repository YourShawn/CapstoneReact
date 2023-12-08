import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form } from "antd";
import dayjs from "dayjs";
import {useNavigate}  from "react-router-dom"

function AdminPatientDetail({patientId}) {
 const nav = useNavigate();

 function goBack() {
   nav("/patients");
 }

  const [patientData,setPatientData] = useState(null);

  async function findPatientInfo(patientId) {
    const responsePatient = await fetch(
      `/api/patients/getInfo?patientId=${patientId}`
    );
    const responsePatientData = await responsePatient.json();
    setPatientData(responsePatientData.data);
  }
  useEffect(() => {
    findPatientInfo(patientId);
  }, [patientId]);


  return (
    <Container>
      <h3>Patient</h3>
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
        <Form.Item label="Patient ID">{patientData?.patientId}</Form.Item>
        <Form.Item label="Patient Name">
          {patientData?.firstName + " " + patientData?.lastName}
        </Form.Item>

        <Form.Item label="Phone">{patientData?.phoneNumber}</Form.Item>

        <Form.Item label="Address">{patientData?.address}</Form.Item>

        <Form.Item label="Birth Date">
          {/* {patientData?.dateOfBirth} */}
          {patientData?.dateOfBirth &&
            dayjs(patientData.dateOfBirth).format("YYYY-MM-DD")}
        </Form.Item>

        <Form.Item label="gender">{patientData?.gender}</Form.Item>

        <Form.Item label="healthCardId">{patientData?.healthCardId}</Form.Item>

        <Form.Item label="haveAllergies">
          {patientData?.haveAllergies}
        </Form.Item>

        <Form.Item label="assignedDoctor">
          {patientData?.assignedDoctor}
        </Form.Item>
        <Form.Item label="bloodGroup">{patientData?.bloodGroup}</Form.Item>
        <Form.Item label="patientHistory">
          {patientData?.patientHistory}
        </Form.Item>
        <Form.Item label="maritalStatus">
          {patientData?.maritalStatus}
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" onClick={goBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AdminPatientDetail;
