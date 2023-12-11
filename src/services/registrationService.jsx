import axios from "axios";
const baseURL = "/api";


const endpoints = {
  registerUser: "/register/add",
  getUserData:"/register/getUserData"
};

class RegistrationService {
  registerUser = (userData) => {
    return axios.post(`${baseURL}${endpoints.registerUser}`, userData);
  };
  getUserData = (userData) => {
    return axios.post(`${baseURL}${endpoints.getUserData}`, userData);
  };
}

const registrationService = new RegistrationService(); // Create an instance

export default registrationService; // Export the named instance
