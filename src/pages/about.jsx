import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";

const About = () => {
  return (
    <div className="page aboutPage">
      <Header />
      <div className="container">
        <div className="about_section  aboutPage_description">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5">
              <div className="content">
                <h3>Description</h3>
                <p>
                  The "Healthcare Management System" project aims to computerise
                  the front office management to provide software that is
                  user-friendly, quick, and economical. Information on patients
                  and doctors are registered, stored, and retrievable as needed
                  from the system with the ability to alter the information in a
                  meaningful way. System input consists of data particular to
                  each patient and their diagnosis, whereas system output is the
                  visual presentation of these facts on the screen. Access to
                  the Healthcare Management System requires a username and
                  password. It may be accessed by a front desk agent or an
                  administrator. In addition to automatically saving each
                  patient's and the staff's data, the system may also assign
                  each patient a special identification number. You may find out
                  the condition of each room using the search tool. A doctor's
                  availability and patient data may be searched for using the
                  ID. It is accessible to admins and front desk staff. Only they
                  can expand the database. The data retrieval process is easy.
                  It has an attractive user interface. Information is securely
                  secured for personal use.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image">
                <img src="/banner.jpg" alt="about" />
              </div>
            </div>
          </div>
        </div>
        <div className="about_section directors">
          <div className="section_heading">
            <h2>Our Doctors</h2>
          </div>
          <div className="directors_wrap">
            <div className="single_img">
              <img src="/director1.jpg" alt="" />
              <h4>Dr. Javier Morales</h4>
              <h6>Orthopedics</h6>
            </div>
            <div className="single_img">
              <img src="/director2.jpeg" alt="" />
              <h4>Dr. Victor Nguyen</h4>
              <h6>Dermatologist</h6>
            </div>
            <div className="single_img">
              <img src="/director3.jpeg" alt="" />
              <h4>Dr. Carlos Ramirez</h4>
              <h6>Psychiatrist</h6>
            </div>
            <div className="single_img">
              <img src="/director4.jpeg" alt="" />
              <h4>Dr. Sarah Rodriguez</h4>
              <h6>Cardiologist</h6>
            </div>
            <div className="single_img">
              <img src="/dctor_1.jpg" alt="" />
              <h4>Dr. Olivia Paros</h4>
              <h6>Ophthalmologist</h6>
            </div>
          </div>
        </div>
        <div className="about_section">
          <div className="section_heading">
            <h2>Gallery</h2>
          </div>
          <div className="row g-4 align-items-center justify-content-between">
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital1.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital2.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital3.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital4.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital5.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_image">
                <img src="/hospital6.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
