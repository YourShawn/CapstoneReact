import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


function AppointmentsDetail({appointmentId}) {
  const nav = useNavigate();

 function goBack(){
   nav("/appointments");
 }
  const [appointmentData,setAppointmentData] = useState(null);

  async function findAppointmentInfo(appointmentId) {
    const responseDoctor = await fetch(
      `/api/appointments/getInfo?appointmentId=${appointmentId}`
    );
    const responseDoctorData = await responseDoctor.json();
    setAppointmentData(responseDoctorData.data);
    console.log(responseDoctorData.data,1111);
  }
  useEffect(() => {
    findAppointmentInfo(appointmentId);
  }, [appointmentId]);


  return (
    <Container>
      <h3>Appointments</h3>
      <Form
        name="wrap"
        labelCol={{
          flex: "200px",
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
        <Form.Item label="Patient Name">
          {appointmentData?.patientName}
        </Form.Item>

        <Form.Item label="Appointment Time">
          {/* {appointmentData?.appointmentDateTime} */}
          {appointmentData?.appointmentDateTime &&
            dayjs(appointmentData.appointmentDateTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
        </Form.Item>

        <Form.Item label="Reason">
          {appointmentData?.reasonForAppointment}
        </Form.Item>

        <Form.Item label="Status">{appointmentData?.status}</Form.Item>

        <Form.Item label=" ">
          <Button type="primary" onClick={goBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AppointmentsDetail;
