import React, {useState} from 'react';
import {Table, Container, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Payments(){
    const [paymentsData_page, setPaymentsData_page]= useState([
        {id: 1, payName: "Kabir", amount: 100, date: "2023-09-16"},
        {id: 2, payName: "John", amount: 90, date: "2022-08-11"},
    ]);

    const [formData, setFormData]= useState({
        payName: "",
        amount: "",
        date: ""
    });

    const handelChange_1= (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
    };

    const handelSubmit= (e) => {
        e.preventDefault();

        const payment_new= {
            id: paymentsData_page.length + 1,
            ...formData,
        };

        setPaymentsData_page([...paymentsData_page, payment_new]);
        setFormData({
            payName: "",
            amount: "",
            date: "",

        });
    };

    return(
        <Container>
            <h3>Payments Page</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pay Name</th>
                        <th>Amount Paid</th>
                        <th>Date the Amount was paid</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentsData_page.map((payments)=>(
                        <tr key={payments.id}>
                            <td>{payments.id}</td>
                            <td>{payments.payName}</td>
                            <td>{payments.amount}</td>
                            <td>{payments.date}</td>
                            <td><Link to={`/payments/${payments.id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>Add New Payments</h3>
            <Form onSubmit={handelSubmit}>
                <Form.Group>
                    <Form.Label>Pay Name</Form.Label>
                    <Form.Control type='text' name='Pay Name' value={formData.payName} onChange={handelChange_1} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type='number' name='amount' value={formData.amount} onChange={handelChange_1} required />
                </Form.Group>
                <Form.Group className="py-6">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date' name='date' value={formData.date} onChange={handelChange_1} required />
                </Form.Group>
                <Form.Group>
                    <Button type='submit' variant='primary'>
                        Add Payment
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Button type='reset' variant='danger'>
                        Abort Payment
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Payments;