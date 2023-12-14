import React, { useState, useEffect, useCallback } from "react";
import { Table, Container } from "react-bootstrap";
import PatientService from "../../services/PatientService";
import BookAppointment from "./BookAppointment";
import styles from "../../styles/pages/patient.module.scss";

function formatDate(string) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(string).toLocaleDateString('en-US', options);
}

function Appointments() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    // Fetch appointment data when the component mounts or when the fetchTrigger changes
    fetchAppointmentData();
  }, [fetchTrigger]);

  const fetchAppointmentData = async () => {
    try {
      const appointmentsResponse = await PatientService.getPatientAppointmentsList();
      setAppointmentData(appointmentsResponse.data.data || []);

      const patientDetailResponse = await PatientService.getPatientDetail();
      if (patientDetailResponse.data && patientDetailResponse.data.data[0]) {
        const name =
          patientDetailResponse.data.data[0].firstName +
          ' ' +
          patientDetailResponse.data.data[0].lastName;
        setPatientName(name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Callback function to trigger data fetch when needed
  const triggerFetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return (
    <Container>
      <BookAppointment patientName={patientName} onAppointmentAdded={triggerFetch} />
      <div className="pt-3">
        <h3 className="heading3">Appointments</h3>
        <div className={styles.custom_table_wrapper}>
          <Table className={styles.custom_table} bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Reason For Appointment</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData.map((appointment) => {
                const dateTimeParts = formatDate(appointment.appointmentDateTime).split(",");
                const date = dateTimeParts[0];
                const time = dateTimeParts[1];

                return (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.reasonForAppointment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default Appointments;