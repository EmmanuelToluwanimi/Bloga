import React, { useRef } from 'react';
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';



export default function Signup() {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();



    return (
        <>

            <Container
                className="d-flex align-items-center justify-content-center mt-5">

                <div className="w-100" style={{ maxWidth: '400px' }}>

                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Sign Up
                            </h2>
                            {'' && <Alert variant='danger'>{''}</Alert>}
                            <Form onSubmit={''}>
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" ref={usernameRef} required />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} min="6" max="12" required />
                                </Form.Group>

                                <Button className="w-100 mt-4"
                                    type="submit"
                                    disabled={''}>
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>

                </div>

            </Container>
        </>
    )
}
