import axios from "axios";

const get_patient_List_url = "http://localhost:8080/patients/getAllocatedPatientsList";
const getAppointmentListUrl = "http://localhost:8080/appointments/getAppointmentsList";
const deleteAppointmentUrl = "http://localhost:8080/appointments/update"
const addPatientUrl = "http://localhost:8080/patients/add"

class DoctorService {

    getPatientList() {
        return axios.post(get_patient_List_url, { assignedDoctor: 1 });
    }

    getAppointmentList() {
        return axios.post(getAppointmentListUrl, { doctorId: 1 });
    }

    deleteAppointment(appointmentId, deleteReason) {
        return axios.post(deleteAppointmentUrl, { appointmentId: appointmentId, isActive: 0, 
            reasonForAppointment: deleteReason })
    }

    updateAppointment(appointmentId,status) {
        return axios.post(deleteAppointmentUrl,{appointmentId,status});
    }

    addPatient(formData) {
        console.log("Form Data Again:", formData);
        return axios.post(addPatientUrl,{formData});
    }
}

const doctorService = new DoctorService(); // Give a name to the instance



export default doctorService; // Export the named instance
