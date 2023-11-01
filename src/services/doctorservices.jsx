import axios from "axios";

const get_patient_List_url = "http://localhost:8080/patients/getAllocatedPatientsList";
const getAppointmentListUrl = "http://localhost:8080/appointments/getAppointmentsList";

class DoctorService {

    getPatientList() {
        return axios.post(get_patient_List_url,{ assignedDoctor : 1 });
    }

    getAppointmentList() {
        return axios.post(getAppointmentListUrl,{doctorId:1});
    }

}

const doctorService = new DoctorService(); // Give a name to the instance

export default doctorService; // Export the named instance
