import axios from "axios";
const baseURL = "/api";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const endpoints = {
    getPatientAppointmentsList: "/appointments/getPatientAppointmentsList",
    getPatientId: "/patients/getPatientId",
    getPatientDetail: "/patients/getPatientDetail",
    getDoctorsList: "/doctors/getDoctorsList",
    addAppointment: "/appointments/add",
    getPatientsPastMedicalRecords: "/MedicalRecords/getPatientsMedicalRecords",
    getPrescriptionDetail: "/prescriptions/getPrescriptionDetail",
    getUpcomingAppointments:"/appointments/getUpcomingAppointments",
    updatePatient:"/patients/update"
};

class PatientService {
    getPatientAppointmentsList = async () => {
        const patientId = await this.getPatientIdFromLocalStorage();
        return axios.post(`${baseURL}${endpoints.getPatientAppointmentsList}`, { patientId: patientId });
    };

    getPatientId = (userId) => {
        return axios.post(`${baseURL}${endpoints.getPatientId}`, { userId: userId });
    };

    getPatientDetail = async () => {
        const patientId = await this.getPatientIdFromLocalStorage();
        return axios.post(`${baseURL}${endpoints.getPatientDetail}`, { patientId: patientId });
    }

    getDoctorsList = async () => {
        return axios.get(`${baseURL}${endpoints.getDoctorsList}`);
    }

    addAppointment = async (formData) => {
        return axios.post(`${baseURL}${endpoints.addAppointment}`, formData, config);
    }

    getPatientsPastMedicalRecords = async () => {
        const patientId = await this.getPatientIdFromLocalStorage();
        return axios.post(`${baseURL}${endpoints.getPatientsPastMedicalRecords}`, { patientId: patientId });
    };

    getPrescriptionDetail = (prescriptionId) => {
        return axios.post(`${baseURL}${endpoints.getPrescriptionDetail}`, { prescriptionId: prescriptionId });
    };

    getUpcomingAppointments = async () => {
        const patientId = await this.getPatientIdFromLocalStorage();
        return axios.post(`${baseURL}${endpoints.getUpcomingAppointments}`, { patientId: patientId });
    };

    updatePatient =  (formData) => {
        return axios.post(`${baseURL}${endpoints.updatePatient}`, formData, config);
    };

    getPatientIdFromLocalStorage = async () => {
        const userId = localStorage.getItem("userId");
        const response = await this.getPatientId(userId);
        const patientId = response.data && response.data.data;

        if (!patientId) {
            console.error("Patient ID not found in local storage.");
            throw new Error("Patient ID not found.");
        }

        return patientId;
    };

}

const patientService = new PatientService(); // Create an instance

export default patientService; // Export the named instance
