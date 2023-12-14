import React, { useState } from "react";
import { Table, Container, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/pages/patient.module.scss";

function Payments() {
  const [paymentsData_page, setPaymentsData_page] = useState([
    {
      id: 1,
      payName: "Kabir",
      amount: 100,
      date: "2023-09-16",
      paymentMode: "Credit Card",
      hasMembership: true,
    },
    {
      id: 2,
      payName: "John",
      amount: 90,
      date: "2022-08-11",
      paymentMode: "Cash",
      hasMembership: false,
    },
  ]);

  const [formData, setFormData] = useState({
    payName: "",
    amount: "",
    date: "",
    paymentMode: "Credit Card",
    hasMembership: false,
  });

  const handleChange_1 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Applying some simple validation
    if (
      formData.payName.trim() === "" ||
      formData.amount.trim() === "" ||
      formData.date.trim() === ""
    ) {
      alert("All fields are required");
      return;
    }

    const payment_new = {
      id: paymentsData_page.length + 1,
      ...formData,
    };

    setPaymentsData_page([...paymentsData_page, payment_new]);
    setFormData({
      payName: "",
      amount: "",
      date: "",
      paymentMode: "Credit Card",
      hasMembership: false,
    });
  };

  const handleAbortPayment = () => {
    setFormData({
      payName: "",
      amount: "",
      date: "",
      paymentMode: "Credit Card",
      hasMembership: false,
    });
  };

  return (
    <Container>
      <div className={styles.whiteBox_wrap}>
        <h3 className="heading3">Add a New Payment Mode</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Pay Name</Form.Label>
                <Form.Control
                  type="text"
                  name="payName"
                  value={formData.payName}
                  onChange={handleChange_1}
                  placeholder="Enter Pay Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange_1}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange_1}
                  placeholder="Enter Amount"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Payment Mode</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange_1}
                  required
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Google Pay">Google Pay</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name="hasMembership"
                  checked={formData.hasMembership}
                  onChange={handleChange_1}
                  label="Has Membership"
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mt-3">
              <div className="d-flex gap-2 justify-content-center">
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleAbortPayment}
                >
                  Abort Payment
                </Button>
                <Button type="submit" variant="primary">
                  Add Payment
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="pt-3">
        <h3 className="heading3">Payments</h3>
        <div className={styles.custom_table_wrapper}>
          <Table className={styles.custom_table} bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pay Name</th>
                <th>Amount Paid</th>
                <th>Date the Amount was Paid</th>
                <th>Payment Mode</th>
                <th>Has Membership</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData_page.map((payments) => (
                <tr key={payments.id}>
                  <td>{payments.id}</td>
                  <td>{payments.payName}</td>
                  <td>{payments.amount}</td>
                  <td>{payments.date}</td>
                  <td>{payments.paymentMode}</td>
                  <td>{payments.hasMembership ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/payments/${payments.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default Payments;