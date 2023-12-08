import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Contact from "./pages/contact";
import DoctorPanel from "./pages/doctor";
import ForgotPassword from "./pages/forgotPass";
import AdminSideBar from "./pages/admin/AdminSidebar";
import Home from "./pages/home";
import Login from "./pages/login";
import PatientPanel from "./pages/patient";
import Service from "./pages/service";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import "./styles/App.css";
import PatientDetails from "./pages/doctor/PatientDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/doctor-dashboard/*" element={<DoctorPanel />} />
          <Route path="/patient-dashboard" element={<PatientPanel />}></Route>
          <Route path="/patient/:patientId" element={<PatientDetails />} />
          <Route path="/admin" element={<AdminSideBar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
