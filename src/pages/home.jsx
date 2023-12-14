import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";
import { Button, Carousel, Form, InputGroup, Modal } from "react-bootstrap";
import styles from "../styles/pages/home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sliderData = [
    {
      img: "/banner.jpg",
      title: "Beyond Healthcare",
    },
    {
      img: "/banner2.jpg",
      title: "Healing Hands",
    },
    {
      img: "/banner3.jpg",
      title: "Innovative Care",
    },
  ];

  const handleBookAppointment = () => {
    // Check if there is a login token in local storage
    const token = localStorage.getItem("loginToken");

    if (token) {
      // Redirect to the patient dashboard if token is found
      navigate("/patient-dashboard");
    } else {
      // Redirect to the login page if no token is found
      navigate("/login");
    }
  };

  return (
    <div className={styles.home_page}>
      <Header />
      {/* <div className="banner" style={{ backgroundImage: "url(/banner.jpg)" }}>
        <h1>Health care</h1>
      </div> */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {sliderData.map((item) => (
          <Carousel.Item className={styles.singleSlide}>
            <img src={item.img} alt="" />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>"Caring for Life: Excellence in Healthcare Services"</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={styles.book_appointment}>
        <h6>Click here to book appointment now</h6>
        <button className="btn btn-primary"  onClick={handleBookAppointment}>Book appointment</button>
      </div>
      <Footer />
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton className={styles.modal_header}>
          <Modal.Title>Doctor's detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doctor name"
              defaultValue="John smith"
            />
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department name"
              defaultValue="Dental"
            />
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Doctor details"
              defaultValue="Meet the compassionate healers who form the backbone of our healthcare family – a team of skilled doctors dedicated to providing personalized, evidence-based medicine to enhance your well-being."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
