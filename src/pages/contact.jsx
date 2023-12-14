import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import Header from "../component/header";
import Footer from "../component/footer";
import styles from "../styles/pages/contact_us.module.scss";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate Name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      errors.name = "Name should only contain alphabetic characters";
      valid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = "Invalid email format";
      valid = false;
    }

    // Validate Message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform your form submission logic here
      // For demonstration purposes, I'm just showing a success message
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.contact_page}>
        <Container>
          <main className={styles.box_wrapper}>
            <div className={styles.left_content}>
              <div className="heading">
                <h2>Contact Us</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="formLabel" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="formLabel" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="formLabel" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!formErrors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                {showSuccess && (
                  <Alert variant="success" className="mt-3">
                    Form submitted successfully!
                  </Alert>
                )}
              </div>
            </div>
            <div className={styles.right_content}>
              <iframe
                title="address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.395874807055!2d-80.40671402482187!3d43.38965446943785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b9018e9e89adf%3A0x2043c24369ede07e!2sConestoga%20College%20Kitchener%20-%20Doon%20Campus!5e0!3m2!1sen!2sca!4v1696880125264!5m2!1sen!2sca"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </main>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
