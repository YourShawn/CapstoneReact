import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import SideNav from "../component/sidenav"; // Import the SideNav component

const Service = () => {
  const [activeOption, setActiveOption] = useState("Patient Management");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    diagnosis: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="service-page">
      <Header />
      <div className="content-container">
        <div className="sidebar">
          <SideNav setActiveOption={setActiveOption} />
        </div>
        <main className="content">
          <div className="heading">
          </div>

          {activeOption === "Patient Management" && (
            <div className="patient-management-form">
              <h3>Patient Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="rounded-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    class="rounded-input"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    class="rounded-input"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    class="rounded-input"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    class="rounded-input"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    class="rounded-input"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="diagnosis">Diagnosis:</label>
                  <textarea
                    id="diagnosis"
                    name="diagnosis"
                    class="rounded-input"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button class="rounded-button" type="submit">Submit</button>
              </form>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
