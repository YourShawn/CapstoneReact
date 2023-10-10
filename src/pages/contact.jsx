import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <div>
      <Header />
      <main className="main">
        <div className="heading contact-us">
          <h2>Contact Us</h2>

          <Form>
            <Form.Group className="formLabel" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="formLabel" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="formLabel" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </main>
      <div className="footerMap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.395874807055!2d-80.40671402482187!3d43.38965446943785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b9018e9e89adf%3A0x2043c24369ede07e!2sConestoga%20College%20Kitchener%20-%20Doon%20Campus!5e0!3m2!1sen!2sca!4v1696880125264!5m2!1sen!2sca"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
