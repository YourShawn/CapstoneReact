import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Contact from "./pages/contact";
import DoctorPanel from "./pages/doctor";
import ForgotPassword from "./pages/forgotPass";
import AdminSideBar from "./pages/admin/AdminSidebar";
import AppointmentsDetailBar from "./pages/admin/AdminAppointmentDetailBar";
import Home from "./pages/home";
import Login from "./pages/login";
import PatientPanel from "./pages/patient";
import Service from "./pages/service";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import AdminAppointmentsSidebar from "./pages/admin/AdminAppointmentsSidebar";
import AdminDoctorSidebar from "./pages/admin/AdminDoctorSidebar";
import AdminPatientSidebar from "./pages/admin/AdminPatientSidebar";
import "./styles/App.css";
import PatientDetails from "./pages/doctor/PatientDetails";
import AdminUserSidebar from "./pages/admin/AdminUserSidebar";
import AdminDoctorsDetailBar from "./pages/admin/AdminDoctorsDetailBar";

import AdminDoctorsEditBar from "./pages/admin/AdminDoctorsEditBar";

import AdminPatientDetailBar from "./pages/admin/AdminPatientDetailBar";
import AdminAppointmentDetailBar from "./pages/admin/AdminAppointmentDetailBar";
import AdminUserDetailBar from "./pages/admin/AdminUserDetailBar";
import PageNotFound from "./pages/notFound";

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
          <Route
            path="/appointments"
            element={<AdminAppointmentsSidebar />}
          ></Route>
          <Route path="/doctors" element={<AdminDoctorSidebar />}></Route>

          <Route path="/patients" element={<AdminPatientSidebar />}></Route>
          <Route path="/users" element={<AdminUserSidebar />}></Route>

          <Route
            path="/admin/appointment/info"
            element={<AdminAppointmentDetailBar />}
          ></Route>
          <Route
            path="/admin/doctor/info"
            element={<AdminDoctorsDetailBar />}
          ></Route>
          <Route
            path="/admin/doctor/edit"
            element={<AdminDoctorsEditBar/>}
          ></Route>
          <Route
            path="/admin/patient/info"
            element={<AdminPatientDetailBar />}
          ></Route>
          <Route
            path="/admin/user/info"
            element={<AdminUserDetailBar />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
