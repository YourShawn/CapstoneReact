import axios from "axios";


const baseURL = "http://localhost:8080";

const endpoints = {
  getPatientList: "/patients/getAllocatedPatientsList",
  getAppointmentList: "/appointments/getAppointmentsList",
  deleteAppointment: "/appointments/update",
  addPatient: "/patients/add",
  getPatientDetail: "/patients/getPatientDetail",
  getPatientsPastMedicalRecords: "/MedicalRecords/getPatientsMedicalRecords",
  getPrescriptionDetail:"/prescriptions/getPrescriptionDetail",
  savePrescription:"/prescriptions/add",
  saveMedicalRecords:"/MedicalRecords/add",
  saveMedications:"/medications/addMedications"
};
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
class DoctorService {
  getPatientList = () => {
    return axios.post(`${baseURL}${endpoints.getPatientList}`, { assignedDoctor: 1 });
  };

  getAppointmentList = () => {
    return axios.post(`${baseURL}${endpoints.getAppointmentList}`, { doctorId: 1 });
  };

  deleteAppointment = (appointmentId, deleteReason) => {
    return axios.post(`${baseURL}${endpoints.deleteAppointment}`, {
      appointmentId: appointmentId,
      isActive: 0,
      reasonForAppointment: deleteReason,
    });
  };

  updateAppointment = (appointmentId, status) => {
    return axios.post(`${baseURL}${endpoints.deleteAppointment}`, { appointmentId, status });
  };

  addPatient = (formData) => {
    return axios.post(`${baseURL}${endpoints.addPatient}`, formData, config);
  };

  getPatientDetail = (patientId) => {
    return axios.post(`${baseURL}${endpoints.getPatientDetail}`, { assignedDoctor: 1, patientId });
  };

  getPatientsPastMedicalRecords = (patientId) => {
    return axios.post(`${baseURL}${endpoints.getPatientsPastMedicalRecords}`, { patientId:patientId });
  };

  getPrescriptionDetail = (prescriptionId) => {
    return axios.post(`${baseURL}${endpoints.getPrescriptionDetail}`, { prescriptionId:prescriptionId });
  };

  savePrescription = (prescriptionData) => { 
    return axios.post(`${baseURL}${endpoints.savePrescription}`,prescriptionData,config);
  };

  saveMedicalRecords = (medicalRecordsData) => {
    return axios.post(`${baseURL}${endpoints.saveMedicalRecords}`,medicalRecordsData,config);
  };

  saveMedications = (medicationRecords) => {
    return axios.post(`${baseURL}${endpoints.saveMedications}`, medicationRecords, config);
  };
}

const doctorService = new DoctorService();

export default doctorService;
