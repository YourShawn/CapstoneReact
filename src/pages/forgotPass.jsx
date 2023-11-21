import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { Form, Button } from "react-bootstrap";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeEntered, setIsVerificationCodeEntered] =
    useState(false);

  const handleNewPass = () => {
    // Assuming you have a function to send a reset password email here
    // sendResetPasswordEmail(email);

    // For the sake of the example, let's simulate the email sending
    setTimeout(() => {
      setIsRequestSent(true);
    }, 1000);
  };

  const handleUpdatePassword = () => {
    // Handle updating the password with the verification code
    // updatePassword(email, verificationCode);

    // For the sake of the example, let's simulate the password update
    setTimeout(() => {
      // Clear the form after updating the password
      setEmail("");
      setVerificationCode("");
      setIsRequestSent(false);
      setIsVerificationCodeEntered(false);
    }, 1000);
  };

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
                Submit
              </Button>
            </Form>
          ) : !isVerificationCodeEntered ? (
            <Form>
              <Form.Group className="formLabel" controlId="verificationCode">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={() => setIsVerificationCodeEntered(true)}
              >
                Update Password
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
