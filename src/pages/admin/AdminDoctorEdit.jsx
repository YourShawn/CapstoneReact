import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Input, Alert } from "antd";
import {useNavigate} from "react-router-dom"
import FormItemInput from "antd/es/form/FormItemInput";

function AdminDoctorEdit
({doctorId}) {
  // const [doctorUpdateId, setDoctorUpdateId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [doctorSpecialization, setDoctorSpecialization] = useState("");
    const [doctorAddress, setDoctorAddress] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

  const nav = useNavigate();

  function goBack() {
    nav("/doctors");
  }
   async function update() {
   const url = "/api/doctors/update";
    const data = {
      doctorId: doctorId,
      doctorName: doctorName,
      specialization: doctorSpecialization,
      address: doctorAddress,
      phoneNumber: doctorPhone,
    };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if(result.success){
        setShowSuccess(true)
      }else{
        setShowFail(true)
      }
     
   }



  async function findAppointmentInfo(doctorId) {
    const responseDoctor = await fetch(
      `/api/doctors/getInfo?doctorId=${doctorId}`
    );
    const responseDoctorData = await responseDoctor.json();
    // setDoctorData(responseDoctorData.data);
    // console.log(responseDoctorData.data,1111);
    // setDoctorUpdateId(responseDoctorData.data?.doctorId);
    setDoctorSpecialization(responseDoctorData.data?.specialization);

    setDoctorName(responseDoctorData.data?.doctorName);

    setDoctorAddress(responseDoctorData.data?.address);

    setDoctorPhone(responseDoctorData.data?.phoneNumber);
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
        {showSuccess && <Alert message="Update successfully" type="success" />}

        {showFail && <Alert message="Update Failly" type="error" />}

        <Form.Item label="Doctor Name">
          <Input
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Specialization">
          <Input
            value={doctorSpecialization}
            onChange={(e) => setDoctorSpecialization(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            value={doctorPhone}
            onChange={(e) => setDoctorPhone(e.target.value)}
          />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" onClick={goBack}>
            Back
          </Button>{" "}
          <Button
            type="primary"
            onClick={() => {
              update();
            }}
            danger
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AdminDoctorEdit
;
