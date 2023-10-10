import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button } from "react-bootstrap";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleNewPass = () => {};

  return (
    <div>
      <Header />
      <main className="main">
        <div className="auth-container">
          <h2>Forgot Password</h2>
          {!isRequestSent ? (
            <Form>
              <Form.Group className="formLabel" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleNewPass}>
                Reset Password
              </Button>
            </Form>
          ) : (
            <p className="reset-success">
              Password reset link sent to your email!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
