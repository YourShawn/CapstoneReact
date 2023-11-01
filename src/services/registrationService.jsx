import axios from "axios";
const registerUserUrl = "http://localhost:8080/register/add";

class RegistrationService {
  registerUser(userData) {
    return axios.post(registerUserUrl, userData);
  }
}

const registrationService = new RegistrationService(); // Create an instance

export default registrationService; // Export the named instance
