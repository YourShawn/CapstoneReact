import axios from "axios";

const baseURL = "/api";

const endpoints = {
  getPatientList: "/patients/getAllocatedPatientsList",
  getAppointmentList: "/appointments/getAppointmentsList",
  deleteAppointment: "/appointments/update",
  addPatient: "/patients/add",
  getPatientDetail: "/patients/getPatientDetail",
  getPatientsPastMedicalRecords: "/MedicalRecords/getPatientsMedicalRecords",
  getPrescriptionDetail: "/prescriptions/getPrescriptionDetail",
  savePrescription: "/prescriptions/add",
  saveMedicalRecords: "/MedicalRecords/add",
  saveMedications: "/medications/addMedications",
  addDoctor: "/doctors/add",
  getDoctorId: "/doctors/getDoctorId",
  addAllergy: "/allergies/add",
  getPatientId: "/patients/getPatientId",
  getDoctorName: "/doctors/getDoctorName"
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

class DoctorService {
  getDoctorId = (userId) => {
    return axios.post(`${baseURL}${endpoints.getDoctorId}`, { userId: userId });
  };

  getPatientList = async () => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    return axios.post(`${baseURL}${endpoints.getPatientList}`, { assignedDoctor: doctorId });
  };

  getAppointmentList = async () => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    return axios.post(`${baseURL}${endpoints.getAppointmentList}`, { doctorId: doctorId });
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

  addPatient = async (formData) => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    formData.assignedDoctor = doctorId;
    return axios.post(`${baseURL}${endpoints.addPatient}`, formData, config);
  };

  getPatientDetail = async (patientId) => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    return axios.post(`${baseURL}${endpoints.getPatientDetail}`, { assignedDoctor: doctorId, patientId });
  };

  getPatientsPastMedicalRecords = (patientId) => {
    return axios.post(`${baseURL}${endpoints.getPatientsPastMedicalRecords}`, { patientId: patientId });
  };

  getPrescriptionDetail = (prescriptionId) => {
    return axios.post(`${baseURL}${endpoints.getPrescriptionDetail}`, { prescriptionId: prescriptionId });
  };

  savePrescription = async (prescriptionData) => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    prescriptionData.assignedDoctor = doctorId;
    return axios.post(`${baseURL}${endpoints.savePrescription}`, prescriptionData, config);
  };

  saveMedicalRecords = async (medicalRecordsData) => {
    const doctorId = await this.getDoctorIdFromLocalStorage();
    medicalRecordsData.doctorId = doctorId;
    return axios.post(`${baseURL}${endpoints.saveMedicalRecords}`, medicalRecordsData, config);
  };

  saveMedications = async (medicationRecords) => {
    return axios.post(`${baseURL}${endpoints.saveMedications}`, medicationRecords, config);
  };

  addDoctor = (doctorData) => {
    return axios.post(`${baseURL}${endpoints.addDoctor}`, doctorData, config);
  };

  addAllergy = (allergyData) => {
    return axios.post(`${baseURL}${endpoints.addAllergy}`, allergyData, config);
  };

  getPatientId = (userData) => {
    return axios.post(`${baseURL}${endpoints.getPatientId}`, userData, config);
  };

  getDoctorName = () => {
    const userId = localStorage.getItem("userId");
    return axios.post(`${baseURL}${endpoints.getDoctorName}`, { userId: userId }, config);
  };

  getDoctorIdFromLocalStorage = async () => {
    const userId = localStorage.getItem("userId");
    const response = await this.getDoctorId(userId);
    const doctorId = response.data && response.data.data;

    if (!doctorId) {
      console.error("Doctor ID not found in local storage.");
      throw new Error("Doctor ID not found.");
    }

    return doctorId;
  };
}

const doctorService = new DoctorService();

export default doctorService;
